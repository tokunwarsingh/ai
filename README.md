# Stock Analysis with Gemini AI

This project uses the Google Gemini Pro API and Yahoo Finance to provide a detailed analysis of a given stock ticker.

## About the Project

This script fetches the last three months of historical data for a specified stock ticker using the `yfinance` library. It then uses the Google Gemini Pro model to analyze this data and generate an investment recommendation, trend analysis, and risk assessment.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   **Python 3.x**: Make sure you have Python 3 installed. You can download it from [python.org](https://www.python.org/downloads/).
*   **pip**: The Python package installer. It usually comes with Python.

### Installation

1.  **Clone the repository (or download the files):**
    If this were a git repository, you would clone it. For now, just make sure you have the files in a local directory.

2.  **Navigate to the project directory:**
    ```bash
    cd path/to/your/project
    ```

3.  **Install the required packages:**
    ```bash
    pip install -r requirements.txt
    ```

## Configuration

Before you can run the script, you need to configure your Google AI Studio API key.

1.  **Get your API Key:**
    - Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Create a new API key if you don't have one already.

2.  **Add the API Key to the script:**
    - Open the `stock_analyzer.py` file.
    - Find the following line:
      ```python
      API_KEY = "YOUR_API_KEY"
      ```
    - Replace `"YOUR_API_KEY"` with your actual Google AI Studio API key.

## Usage

To run the stock analyzer, execute the following command in your terminal:

```bash
python stock_analyzer.py
```

The script will then prompt you to enter a stock ticker symbol (e.g., `GOOGL`, `MSFT`, `AAPL`). After you enter a symbol, it will fetch the data, perform the analysis, and print the results to the console.

## How to Test

To test if the script is working correctly, follow these steps:

1.  **Complete the Configuration:** Ensure you have installed the dependencies and added your API key as described in the sections above.

2.  **Run the script:**
    ```bash
    python stock_analyzer.py
    ```

3.  **Enter a Ticker Symbol:**
    When prompted, enter a well-known stock ticker, for example:
    ```
    Enter the stock ticker symbol (e.g., GOOGL, MSFT): MSFT
    ```

4.  **Check the Output:**
    - The script should first print that it is fetching data for the ticker.
    - Then, it should indicate that it is analyzing the data with Gemini.
    - Finally, it will display the **"Gemini Stock Analysis"**, which should include a summary, trend analysis, key observations, an investment recommendation, and a risk assessment.

    If you see this output without any errors, the script is working as expected.

### Common Errors

-   **API Key Error:** If you get an error message about an invalid API key, double-check that you have copied and pasted your key correctly in `stock_analyzer.py`.
-   **Ticker Not Found:** If you enter an invalid ticker, the script will print an error message saying it could not find data for that ticker. Try a different one.