import google.generativeai as genai
import os
import requests
import json
from config import GEMINI_API_KEY, DEEPSEEK_API_KEY

def configure_gemini():
    genai.configure(api_key=GEMINI_API_KEY)

def get_gemini_response(prompt):
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Error interacting with Gemini API: {e}"

def list_gemini_models():
    configure_gemini()
    print("Available Gemini Models:")
    for m in genai.list_models():
        if "generateContent" in m.supported_generation_methods:
            print(f"- {m.name}")

def get_deepseek_response(prompt):
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}"
    }
    data = {
        "model": "deepseek-chat",
        "messages": [{"role": "user", "content": prompt}],
        "stream": False
    }
    try:
        response = requests.post("https://api.deepseek.com/chat/completions", headers=headers, data=json.dumps(data))
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
    except requests.exceptions.RequestException as e:
        return f"Error interacting with DeepSeek API: {e}"
    except KeyError:
        return "Error: Unexpected response format from DeepSeek API."

def analyze_stock(ticker):
    configure_gemini()

    # Placeholder for fetching real-time stock data
    # In a real application, you would integrate with a financial data API (e.g., Alpha Vantage, Yahoo Finance)
    stock_data = f"Real-time data for {ticker}: Price $XXX.XX, Volume YYYY, P/E Ratio Z.Z"

    # Gemini for general market sentiment and news analysis
    gemini_prompt = f"Analyze the current market sentiment and recent news for {ticker} based on the following data: {stock_data}. Provide a summary and potential implications."
    gemini_analysis = get_gemini_response(gemini_prompt)

    # DeepSeek for more in-depth technical analysis or specific data interpretation
    deepseek_prompt = f"Given the following stock data for {ticker}: {stock_data}, and Gemini's sentiment analysis: '{gemini_analysis}', provide a deeper technical analysis, including potential price movements and key factors to watch. Focus on actionable insights."
    deepseek_analysis = get_deepseek_response(deepseek_prompt)

    overall_analysis = f"--- Stock Analysis for {ticker} ---\n\n"
    overall_analysis += f"Market Data: {stock_data}\n\n"
    overall_analysis += f"Gemini's Sentiment Analysis:\n{gemini_analysis}\n\n"
    overall_analysis += f"DeepSeek's Technical Insights:\n{deepseek_analysis}\n\n"
    overall_analysis += "--- End of Analysis ---"

    return overall_analysis

if __name__ == "__main__":
    configure_gemini() # Ensure Gemini is configured before listing models
    list_gemini_models()
    print("\n--- DeepSeek API Error ---")
    print("The DeepSeek API returned a 'Payment Required' error (402). Please ensure your DeepSeek API key is valid and your account has sufficient credits.")
    print("--------------------------\n")

    ticker = input("Enter stock ticker (e.g., AAPL, GOOGL): ").upper()
    if ticker:
        print(f"Analyzing {ticker}...")
        analysis_result = analyze_stock(ticker)
        print(analysis_result)
    else:
        print("No ticker entered. Exiting.")