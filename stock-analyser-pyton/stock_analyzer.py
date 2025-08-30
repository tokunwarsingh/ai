import os
import google.generativeai as genai
import yfinance as yf

# --- CONFIGURATION ---
# IMPORTANT: Replace "YOUR_API_KEY" with your actual Google AI Studio API key.
# You can get your key from https://aistudio.google.com/app/apikey
API_KEY = "AIzaSyAW3s6F4XwQTvHSO9THsMJmw9IVNtITNQ0"

# --- MAIN LOGIC ---
def get_stock_data(ticker_symbol):
    """Fetches historical stock data for a given ticker symbol."""
    try:
        stock = yf.Ticker(ticker_symbol)
        # Get historical market data for the last 3 months
        hist = stock.history(period="3mo")
        if hist.empty:
            print(f"Error: No data found for ticker '{ticker_symbol}'. It might be delisted or an invalid ticker.")
            return None
        return hist.to_string()
    except Exception as e:
        print(f"An error occurred while fetching stock data: {e}")
        return None

def get_ticker_from_name(company_name):
    """Gets the stock ticker from a company name using the Gemini API."""
    try:
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-2.5-flash')
        prompt = f"What is the stock ticker for '{company_name}'? Prioritize stocks listed on India's NSE or BSE. Please return only the ticker symbol."
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Could not find ticker for {company_name}: {e}"

def is_valid_ticker(ticker_symbol):
    """Checks if a ticker symbol is valid."""
    try:
        stock = yf.Ticker(ticker_symbol)
        return not stock.history(period="1d").empty
    except Exception:
        return False

def analyze_stock_with_gemini(stock_data, ticker_symbol):
    """Analyzes stock data using the Gemini API."""
    if not stock_data:
        return "Could not analyze stock due to missing data."

    try:
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-2.5-flash')

        prompt = f"""
        Act as an expert financial analyst. Conduct a comprehensive, multi-faceted analysis of the stock for {ticker_symbol}.

        The analysis must include:

        Executive Summary: A concise summary of the key findings, potential risks, and a clear recommendation (Buy/Hold/Sell) with a defined entry point.

        Fundamental Analysis:

        Company Profile: A brief overview of the company, its business model, and its position within its industry.

        Quarterly Results: A detailed breakdown and analysis of the last four quarterly results. Focus on key metrics such as revenue, net income, EPS (Earnings Per Share), and profit margins.

        Financial Health: An evaluation of the company's balance sheet, including debt-to-equity ratio, current ratio, and cash flow from operations.

        Competitive Landscape: An analysis of the company's key competitors and its competitive advantages or disadvantages.

        Valuation: An assessment of the stock's current valuation using metrics like P/E ratio, P/B ratio, and a comparison to industry averages.

        Technical Analysis:

        Price Action: A description of recent price trends, including support and resistance levels.

        Indicators: An analysis using key technical indicators such as:

        Moving Averages (50-day, 200-day)

        Relative Strength Index (RSI)

        MACD (Moving Average Convergence Divergence)

        Volume Analysis: An interpretation of recent trading volume, noting any significant spikes and what they might indicate.

        Order Book and Market Depth: A discussion of the current order book, including bid/ask spreads and market depth, to assess liquidity and potential price pressure.

        Forward-Looking Projections & Expected Returns:

        Entry Point: Based on the combined analysis, specify a recommended entry point or price range for the stock.

        Expected Returns: Provide a projected expected return for the following time horizons:

        3-year expected return

        6-year expected return

        9-year expected return

        12-year expected return

        Risks and Catalysts: Identify the primary risks that could negatively impact the stock's performance and the potential catalysts that could drive future growth.

        Data Visualization & Presentation:

        Graph: Create a graph showing the stock's price history over the past 5 years, along with the 50-day and 200-day moving averages.

        Tabular Data: Present the following information in a clean and presentable table:

        Quarterly Financials: A table with the last four quarters' revenue, net income, and EPS.

        Key Ratios: A table showing the current P/E, P/B, Debt/Equity ratios, and their respective industry averages.

        Return Projections: A table outlining the projected returns for the 3, 6, 9, and 12-year periods.

        Ensure the final output is well-structured, easy to read, and provides actionable insights. The analysis should be based on the most up-to-date and publicly available information.
        """

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        if "API key not valid" in str(e):
            return "Error: The provided Google AI API key is invalid. Please check your API key and try again."
        return f"An error occurred during Gemini API call: {e}"
