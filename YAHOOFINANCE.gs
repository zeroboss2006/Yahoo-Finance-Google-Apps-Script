/**
 * 從 Yahoo Finance 抓取指定股票的數據
 * @param {string} symbol - 股票代號，例如 "00864B.TWO"
 * @param {string} attribute - 要抓取的屬性 ("price" 或 "changepct")
 * @customfunction
 */
function YAHOOFINANCE(symbol, attribute) {
  // 驗證輸入
  if (!symbol || !attribute) {
    return "請提供股票代號和屬性";
  }
  
  var url = "https://finance.yahoo.com/quote/" + symbol + "/";
  
  var options = {
    "headers": {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    },
    "muteHttpExceptions": true
  };
  
  try {
    // 抓取網頁內容
    var response = UrlFetchApp.fetch(url, options);
    var html = response.getContentText();
    
    if (attribute.toLowerCase() === "price") {
      // 嘗試解析現價（regularMarketPrice）
      var pricePattern = new RegExp('<fin-streamer[^>]*data-symbol="' + symbol + '"[^>]*data-field="regularMarketPrice"[^>]*>([\\d\\.]+)<\\/fin-streamer>', 'i');
      var match = html.match(pricePattern);
      
      if (match && match[1]) {
        return parseFloat(match[1]); // 返回現價
      } else {
        // 若現價未找到，抓取 Bid 價格
        var bidPattern = /Bid<\/span>\s*<span class="value yf-1d5fln4">([\d\.]+)\s*x/i;
        match = html.match(bidPattern);
        if (match && match[1]) {
          return parseFloat(match[1]); // 返回 Bid 價格
        } else {
          return "無法抓取價格";
        }
      }
    } else if (attribute.toLowerCase() === "changepct") {
      // 精準解析百分比變化（匹配帶括號的百分比）
      var pctMatch = html.match(/data-testid="qsp-price-change-percent"[^>]*>.*?\(([+-]?\d+\.\d+)%\)/is);
      if (pctMatch) {
        return parseFloat(pctMatch[1]);
      }
      
      // 備用方案：直接匹配百分比數值
      var altMatch = html.match(/data-testid="qsp-price-change-percent"[^>]*>.*?([+-]?\d+\.\d+)%?/is);
      return altMatch ? parseFloat(altMatch[1]) : "無法抓取漲跌幅";
    } else {
      return "無效屬性，請使用 'price' 或 'changepct'";
    }
  } catch(e) {
    return "抓取失敗，請檢查網路連線";
  }
}

// 可選：手動寫入指定股票數據到 A1 和 B1
function writeDataToSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var symbol = "00864B.TWO"; // 可修改為其他股票代號
  var price = YAHOOFINANCE(symbol, "price");
  var changePct = YAHOOFINANCE(symbol, "changepct");
  
  if (price !== "無法抓取價格" && price !== "無效屬性") {
    sheet.getRange("A1").setValue(price);
  }
  if (changePct !== "無法抓取漲跌幅" && changePct !== "無效屬性") {
    sheet.getRange("B1").setValue(changePct);
  }
}
