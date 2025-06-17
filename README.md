# Yahoo Finance Google Apps Script

由於發現部分台股櫃買資訊無法在 GOOGLEFINANCE 獲取，因此本專案改用 Yahoo Finance 的 JSON chart endpoint，提升穩定性與兼容性，無需 crumb/cookie 驗證。

---

## 🧩 功能特色

- **即時收盤價／漲跌幅抓取**：透過自訂函數 `YAHOOFINANCE(symbol, attribute)`，取得  
  - `price`：最近有效交易日收盤價  
  - `changepct`：當日漲跌幅百分比，四捨五入到小數兩位  
- **支援市場多樣化**：包括台股上市（`.TW`）、櫃買 ETF（`.TWO`）、美股／國際市場  
- **更穩定的 JSON 資料源**：全面改用 Yahoo 的 JSON Endpoint（`query2.finance.yahoo.com/v8/finance/chart`），避免 crumb／cookie 驗證失敗

---

## 📦 安裝說明

### 方法一：手動安裝
1. 開啟 Google 試算表，點選 **擴充功能 → Apps Script**  
2. 刪除預設內容，貼上 `YAHOOFINANCE.gs` 中完整程式碼  
3. 儲存後返回試算表，即可使用自訂函式

### 方法二：函式庫部署
1. 前往 [Google Apps Script](https://script.google.com)  
2. 建立專案並貼上 `YAHOOFINANCE.gs`，儲存後部署成函式庫  
3. 在其他試算表中透過函式庫 ID 引入使用

---

## ══ 使用範例 ══

| 函數範例                                | 說明 |
|-----------------------------------------|------|
| `=YAHOOFINANCE("00864B.TWO","price")`    | 取得 OTC ETF 00864B 收盤價，如 43.43 |
| `=YAHOOFINANCE("00864B.TWO","changepct")`| 取得當日漲跌幅，如 +0.07% |
| `=YAHOOFINANCE("2330.TW","price")`       | 台積電當日收盤價 |
| `=YAHOOFINANCE("AAPL","changepct")`      | Apple 當日漲跌幅 |

---

## 🔍 參數說明

| 參數       | 說明                                   | 範例                         |
|------------|----------------------------------------|------------------------------|
| `symbol`   | Yahoo Finance 的識別代號              | `2330.TW`, `00864B.TWO`, `AAPL` |
| `attribute`| `price`（收盤價）或 `changepct`（漲跌幅％）| `"price"`、`"changepct"`     |

---

## 💾 程式碼檔案：`YAHOOFINANCE.gs`

請將以下程式碼貼入你的 Apps Script 專案中，並另存為 `YAHOOFINANCE.gs`：

```javascript
/**
 * 從 Yahoo JSON chart API 抓取最近收盤價與漲跌幅
 * @param {string} symbol - 例如 "00864B.TWO"
 * @param {string} attribute - "price" 或 "changepct"
 * @customfunction
 */
function YAHOOFINANCE(symbol, attribute) {
  if (!symbol || !attribute) return "請提供 symbol 與 attribute";
  var now = Math.floor(Date.now()/1000);
  var tenDaysAgo = now - 10*24*60*60;
  var url = 'https://query2.finance.yahoo.com/v8/finance/chart/' +
            encodeURIComponent(symbol) +
            '?period1=' + tenDaysAgo +
            '&period2=' + now +
            '&interval=1d&events=history';
  try {
    var res = UrlFetchApp.fetch(url, {
      muteHttpExceptions: true,
      headers: { "User-Agent": "Mozilla/5.0" }
    }).getContentText();
    var result = JSON.parse(res).chart.result;
    if (!result || result.length === 0) return "";
    var closes = result[0].indicators.quote[0].close;
    var valid = closes.filter(v => v !== null);
    if (valid.length === 0) return "";
    var today = valid[valid.length -1];
    var prev = valid.length > 1 ? valid[valid.length-2] : today;
    if (attribute.toLowerCase() === "price") return today;
    if (attribute.toLowerCase() === "changepct") {
      if (prev === 0) return 0;
      return Math.round((today - prev) / prev * 10000) / 100;
    }
    return "屬性請填 price 或 changepct";
  } catch (e) {
    return "抓取失敗：" + e.message;
  }
}
```
## 📝 版本歷程
v1.1 (2025‑06‑17)

改用 JSON Endpoint (v8/chart)，穩定解析收盤價與當日漲跌幅

支援 OTC ETF、台股與國際股票，精準輸出至小數點後兩位

v1.0.1 (2025‑02‑27)

更新 HTML Regex 與錯誤處理機制

v1.0 (2025‑02‑24)

初版實作 price 與 changepct 功能

## ⚠️ 注意事項
JSON Endpoint 穩定，不需 crumb／cookie 驗證

回傳空值可能代表：非交易日、symbol 無效或當日未成交

建議避免過於頻繁呼叫，以免觸發 API 限制

## 🚀 未來開發方向
支援更多屬性 (開盤、高低、成交量)

批次查詢多標的

trigger 自動更新 & 儲存歷史資料

提供 JSON／HTML 模式切換選項
