# 簡介
由於發現部分台股櫃買資訊無法在 GOOGLEFINANCE 獲取因此想改善此問題<br/>
<br/>
YAHOOFINANCE 是一個 Google Apps Script 自訂函數，允許 Google 試算表使用者從 Yahoo Finance 直接抓取台股、國際股市的即時價格與漲跌幅數據<br/>
<br/>
<a data-flickr-embed="true" href="https://www.flickr.com/photos/128548739@N07/54349678688/in/datetaken-public/" title="2025-02-25 13 29 50"><img src="https://live.staticflickr.com/65535/54349678688_77e6554434_o.png" width="541" height="182" alt="2025-02-25 13 29 50"/></a>
<br/>
<br/>
本腳本適用於 Google Sheets，無須額外安裝套件，只需將程式碼貼入 Apps Script 編輯器 即可開始使用<br/>
<br/>
# 安裝步驟
#### 方法 1：手動安裝<br/>
開啟 Google 試算表<br/>
點擊 `擴充功能 (Extensions)` → `Apps Script`<br/>
刪除預設內容，貼上以下完整程式碼：script.gs<br/>
按下 儲存 (⌘S / Ctrl+S)<br/>
回到試算表，即可使用 `=YAHOOFINANCE("股票代號", "price")` 來獲取數據<br/>
#### 方法 2：透過 Google Apps Script API<br/>
前往 Google Apps Script 網頁版：Google Apps Script<br/>
建立新專案，然後貼上完整程式碼<br/>
部署專案，將其綁定至你的 Google 試算表<br/>
<br/>
# 如何使用
在 Google 試算表中，你可以使用以下自訂函數：<br/>
<br/>
# 支援的參數
| 參數 | 說明 | 範例 |
|-------|-------|-------|
| `symbol` | Yahoo Finance 股票代號 | `"2330.TW"` `"AAPL"` |
| `attribute` | `price`取得現價<br/> `changepct`取得當日漲跌幅 | `"changepct"` `"price"` |
<br/>

# 擴增函數
`YAHOOFINANCE(symbol, attribute)`<br/>
功能：從 Yahoo Finance 獲取指定股票的即時價格或漲跌幅<br/>
<br/>

# 範例

| 參數 | 說明 |
|-------|-------|
| `=YAHOOFINANCE("00864B.TWO", "price")` | 獲取 00864B.TWO 的即時價格 |
| `=YAHOOFINANCE("2330.TW", "changepct")` | 獲取台積電 (2330.TW) 的當日漲跌幅 |
| `=YAHOOFINANCE("AAPL", "price")` | Apple 股價 |
| `=YAHOOFINANCE("GOOGL", "changepct")` | Google 當日漲跌幅 (%) |
<br/>

## 使用方式
打開 Apps Script 編輯器<br/>
點擊 執行 (Run)<br/>
會將價格與漲跌幅寫入 A1 和 B1 儲存格<br/>
<br/>

## 版本更新
v1.0.1 (2025-02-24)<br/>
- 更新了價格抓取的正則表達式，使用 data-testid="qsp-price" 作為精確匹配條件<br/>
- 優化了價格數據的提取邏輯，確保只保留數字和小數點<br/>
- 提供了更清晰的錯誤提示信息<br/>
- 
v1.0 (2025-02-24)<br/>
- 修正 changepct 漲跌幅數據錯誤，確保匹配 Yahoo Finance<br/>
- 提供更準確的正則表達式以解析市價與漲跌幅<br/>
- 加入錯誤處理機制，避免因為網路問題導致函數崩潰<br/>

# 注意事項
Yahoo Finance 可能變更網頁結構，如果無法抓取數據，請更新正則表達式<br/>
每個 Google 試算表 API 呼叫數量有限，請避免過於頻繁地請求<br/>
部分股票可能需要不同代號，例如：<br/>
台灣上市股票：2330.TW (台積電)<br/>
台灣上櫃股票：00864B.TWO<br/>
美國股票：AAPL<br/>
指數：^IXIC (NASDAQ)<br/>

# 未來改進方向
📌 支援更多數據屬性（如開盤價、成交量等）<br/>
📌 加入其他財經數據來源（如 MoneyDJ、台灣證券交易所等）<br/>
📌 優化請求速度，減少 API 限制影響<br/>
🔗 GitHub (https://github.com/zeroboss2006/YAHOOFINANCE-Google-Apps-Script/tree/main)<br/>


