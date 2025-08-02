import customtkinter as ctk
import re
from stock_analyzer import get_stock_data, analyze_stock_with_gemini, API_KEY

class StockApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("Stock Analyzer")
        self.geometry("800x600")

        # --- Main Frame ---
        self.main_frame = ctk.CTkFrame(self)
        self.main_frame.pack(pady=20, padx=20, fill="both", expand=True)

        # --- Input Frame ---
        self.input_frame = ctk.CTkFrame(self.main_frame)
        self.input_frame.pack(pady=10, padx=10, fill="x")

        self.ticker_label = ctk.CTkLabel(self.input_frame, text="Stock Ticker:")
        self.ticker_label.pack(side="left", padx=5)

        self.ticker_entry = ctk.CTkEntry(self.input_frame, placeholder_text="e.g., GOOGL")
        self.ticker_entry.pack(side="left", padx=5, expand=True, fill="x")

        self.analyze_button = ctk.CTkButton(self.input_frame, text="Analyze", command=self.analyze_stock)
        self.analyze_button.pack(side="left", padx=5)

        # --- Output Frame ---
        self.output_frame = ctk.CTkFrame(self.main_frame)
        self.output_frame.pack(pady=10, padx=10, fill="both", expand=True)

        self.output_textbox = ctk.CTkTextbox(self.output_frame, wrap="word", state="disabled", font=("Courier New", 12))
        self.output_textbox.pack(fill="both", expand=True)

        # --- Configure tags for formatting ---
        self.output_textbox.tag_config("h1", underline=True, spacing1=5)
        self.output_textbox.tag_config("h2", underline=True, spacing1=2)
        self.output_textbox.tag_config("bold", underline=True) # Using underline as a substitute for bold

        # --- Initial Check ---
        if API_KEY == "YOUR_API_KEY":
            self.show_error("Please set your Google AI API key in stock_analyzer.py")
            self.analyze_button.configure(state="disabled")

    def analyze_stock(self):
        ticker = self.ticker_entry.get().upper()
        if not ticker:
            self.show_error("Please enter a stock ticker.")
            return

        self.show_info(f"Fetching data for {ticker}...")
        stock_data = get_stock_data(ticker)

        if stock_data:
            self.show_info(f"Analyzing {ticker} with Gemini...")
            analysis = analyze_stock_with_gemini(stock_data, ticker)
            self.display_formatted_analysis(analysis)
        else:
            self.show_error(f"Could not retrieve data for {ticker}.")

    def display_formatted_analysis(self, message):
        """Displays the analysis with markdown-like formatting."""
        self.output_textbox.configure(state="normal")
        self.output_textbox.delete("1.0", "end")

        for line in message.split('\n'):
            # Headers
            if line.startswith('## '):
                self.output_textbox.insert("end", line[3:] + '\n', "h1")
            elif line.startswith('**') and line.endswith('**'):
                clean_line = line[2:-2]
                self.output_textbox.insert("end", clean_line + '\n', "h2")
            # Bold text (using the same logic as before)
            else:
                parts = re.split(r'(\*\*.*?\*\*)', line)
                for part in parts:
                    if part.startswith('**') and part.endswith('**'):
                        clean_part = part[2:-2]
                        self.output_textbox.insert("end", clean_part, "bold")
                    else:
                        self.output_textbox.insert("end", part)
                self.output_textbox.insert("end", '\n')


        self.output_textbox.configure(state="disabled")
        self.update_idletasks()

    def show_info(self, message):
        """Displays simple, unformatted information."""
        self.output_textbox.configure(state="normal")
        self.output_textbox.delete("1.0", "end")
        self.output_textbox.insert("1.0", message)
        self.output_textbox.configure(state="disabled")
        self.update_idletasks()

    def show_error(self, message):
        self.output_textbox.configure(state="normal")
        self.output_textbox.delete("1.0", "end")
        self.output_textbox.insert("1.0", f"Error: {message}", "error")
        self.output_textbox.tag_config("error", foreground="red")
        self.output_textbox.configure(state="disabled")
        self.update_idletasks()

if __name__ == "__main__":
    app = StockApp()
    app.mainloop()