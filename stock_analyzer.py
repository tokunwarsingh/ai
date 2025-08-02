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

def analyze_stock_with_gemini(stock_data, ticker_symbol):
    """Analyzes stock data using the Gemini API."""
    if not stock_data:
        return "Could not analyze stock due to missing data."

    try:
        genai.configure(api_key=API_KEY)
        model = genai.GenerativeModel('gemini-1.5-flash')

        prompt = f"""
        **Analyze the following stock data for {ticker_symbol} and provide a detailed investment analysis.**

        **Stock Data (last 3 months):**
        {stock_data}

        **Please provide the following:**

        1.  **Summary:** A brief overview of the stock's recent performance.
        2.  **Trend Analysis:** Identify and explain the primary trends (e.g., uptrend, downtrend, sideways movement).
        3.  **Key Observations:** Point out any significant price movements, volume changes, or patterns.
        4.  **Investment Recommendation:** Based on the data, provide a recommendation (e.g., Buy, Hold, Sell) with a clear justification.
            - **For a "Buy" recommendation:** Explain the positive indicators.
            - **For a "Sell" recommendation:** Explain the negative indicators.
            - **For a "Hold" recommendation:** Explain the reasons for uncertainty or stability.
        5.  **Risk Assessment:** Briefly mention potential risks associated with this stock.

        **Disclaimer:** This analysis is for informational purposes only and does not constitute financial advice.
        """

        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        if "API key not valid" in str(e):
            return "Error: The provided Google AI API key is invalid. Please check your API key and try again."
        return f"An error occurred during Gemini API call: {e}"

def main():
    """Main function to run the stock analysis."""
    print("--- Stock Analysis with Gemini AI ---")

    if API_KEY == "YOUR_API_KEY":
        print("\nERROR: Please replace 'YOUR_API_KEY' in the script with your actual Google AI Studio API key.")
        return

    ticker_symbol = input("Enter the stock ticker symbol (e.g., GOOGL, MSFT): ").upper()

    print(f"\nFetching data for {ticker_symbol}...")
    stock_data = get_stock_data(ticker_symbol)

    if stock_data:
        print("Analyzing stock data with Gemini...")
        analysis = analyze_stock_with_gemini(stock_data, ticker_symbol)
        print("\n--- Gemini Stock Analysis ---")
        print(analysis)
        print("---------------------------\n")

if __name__ == "__main__":
    main()