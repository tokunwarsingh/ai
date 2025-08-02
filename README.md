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

To run the stock analyzer with the graphical user interface, execute the following command in your terminal:

```bash
python stock_ui.py
```

This will open a window where you can enter a stock ticker and see the analysis results.

## How to Test

To test if the application is working correctly, follow these steps:

1.  **Complete the Configuration:** Ensure you have installed the dependencies and added your API key as described in the sections above.

2.  **Run the application:**
    ```bash
    python stock_ui.py
    ```

3.  **Enter a Ticker Symbol:**
    In the input field, enter a well-known stock ticker, for example: `MSFT`.

4.  **Click "Analyze":**
    Press the "Analyze" button to start the process.

5.  **Check the Output:**
    - The text box will first show that it is fetching data.
    - Next, it will indicate that it is analyzing the data with Gemini.
    - Finally, the analysis results will be displayed in the text box.

    If you see this output without any errors, the application is working as expected.

### Common Errors

-   **API Key Error:** If you get an error message about an invalid API key, double-check that you have copied and pasted your key correctly in `stock_analyzer.py`.
-   **Ticker Not Found:** If you enter an invalid ticker, the script will print an error message saying it could not find data for that ticker. Try a different one.