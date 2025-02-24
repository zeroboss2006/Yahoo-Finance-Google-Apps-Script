# Introduction
Due to the limitation of GOOGLEFINANCE in retrieving certain Taiwan OTC stock information, this project aims to address this issue.

YAHOOFINANCE is a Google Apps Script custom function that allows Google Sheets users to fetch real-time stock prices and price change percentages from Yahoo Finance for both Taiwan and international markets.

This script is designed for Google Sheets and requires no additional package installation. Simply paste the code into the Apps Script editor to start using it.

# Installation
#### Method 1: Manual Installation
1. Open Google Sheets
2. Click `Extensions` → `Apps Script`
3. Delete the default content and paste the complete code from script.gs
4. Press Save (⌘S / Ctrl+S)
5. Return to your spreadsheet and use `=YAHOOFINANCE("stock_symbol", "price")` to fetch data

#### Method 2: Via Google Apps Script API
1. Go to Google Apps Script web version
2. Create a new project and paste the complete code
3. Deploy the project and bind it to your Google Sheets

# Usage
You can use the following custom functions in Google Sheets:

# Supported Parameters
| Parameter | Description | Example |
|-----------|-------------|----------|
| `symbol` | Yahoo Finance stock symbol | `"2330.TW"` `"AAPL"` |
| `attribute` | `price` for current price<br/> `changepct` for daily change percentage | `"changepct"` `"price"` |

# Function
`YAHOOFINANCE(symbol, attribute)`
Purpose: Fetch real-time price or price change percentage from Yahoo Finance

# Examples
| Usage | Description |
|-------|-------------|
| `=YAHOOFINANCE("00864B.TWO", "price")` | Get real-time price for 00864B.TWO |
| `=YAHOOFINANCE("2330.TW", "changepct")` | Get daily change percentage for TSMC (2330.TW) |
| `=YAHOOFINANCE("AAPL", "price")` | Get Apple stock price |
| `=YAHOOFINANCE("GOOGL", "changepct")` | Get Google daily change percentage (%) |

## Implementation
1. Open Apps Script editor
2. Click Run
3. Price and change percentage will be written to cells A1 and B1

## Version History
v1.0 (2025-02-24)
✅ Fixed changepct data accuracy to match Yahoo Finance
✅ Improved regex patterns for price and change percentage parsing
✅ Added error handling to prevent function crashes due to network issues

# Notes
- Yahoo Finance may change their webpage structure; update regex patterns if data fetching fails
- Google Sheets API has rate limits; avoid excessive requests
- Different markets use different symbol formats:
  - Taiwan Listed Stocks: 2330.TW (TSMC)
  - Taiwan OTC Stocks: 00864B.TWO
  - US Stocks: AAPL
  - Indices: ^IXIC (NASDAQ)

# Future Improvements
📌 Support for additional data attributes (open price, volume, etc.)
📌 Integration with other financial data sources (MoneyDJ, TWSE, etc.)
📌 Optimize request speed to minimize API limitation impacts
🔗 GitHub (https://github.com/zeroboss2006/YAHOOFINANCE-Google-Apps-Script/tree/main)


