# 簡介
由於發現部分台股櫃買資訊無法在 GOOGLEFINANCE 獲取因此想改善此問題
YAHOOFINANCE 是一個 Google Apps Script 自訂函數，允許 Google 試算表使用者從 Yahoo Finance 直接抓取台股、國際股市的即時價格與漲跌幅數據。

本腳本適用於 Google Sheets，無須額外安裝套件，只需將程式碼貼入 Apps Script 編輯器 即可開始使用。

# 安裝步驟
##✅ 方法 1：手動安裝
開啟 Google 試算表
點擊 擴充功能 (Extensions) → Apps Script
刪除預設內容，貼上以下完整程式碼：script.gs
按下 儲存 (⌘S / Ctrl+S)
回到試算表，即可使用 =YAHOOFINANCE("股票代號", "price") 來獲取數據
##✅ 方法 2：透過 Google Apps Script API
前往 Google Apps Script 網頁版：Google Apps Script
建立新專案，然後貼上完整程式碼
部署專案，將其綁定至你的 Google 試算表

# 如何使用
在 Google 試算表中，你可以使用以下自訂函數：

#📌 支援的參數
參數	說明	範例
symbol	Yahoo Finance 股票代號	"2330.TW" "AAPL"
attribute	"price" 取得現價
"changepct" 取得當日漲跌幅	"price" "changepct"

#🛠️ 內建函數
🔹 YAHOOFINANCE(symbol, attribute)
功能：從 Yahoo Finance 獲取指定股票的即時價格或漲跌幅

#範例：

=YAHOOFINANCE("00864B.TWO", "price")      // 獲取 00864B.TWO 的即時價格
=YAHOOFINANCE("2330.TW", "changepct")     // 獲取台積電 (2330.TW) 的當日漲跌幅
=YAHOOFINANCE("AAPL", "price")        // Apple 股價
=YAHOOFINANCE("GOOGL", "changepct")   // Google 當日漲跌幅 (%)

#使用方式：
打開 Apps Script 編輯器
點擊 執行 (Run)
會將價格與漲跌幅寫入 A1 和 B1 儲存格

#📖 版本更新
v1.0 (2025-02-24)
✅ 修正 changepct 漲跌幅數據錯誤，確保匹配 Yahoo Finance
✅ 提供更準確的正則表達式以解析市價與漲跌幅
✅ 加入錯誤處理機制，避免因為網路問題導致函數崩潰

#⚠️ 注意事項
Yahoo Finance 可能變更網頁結構，如果無法抓取數據，請更新正則表達式
每個 Google 試算表 API 呼叫數量有限，請避免過於頻繁地請求
部分股票可能需要不同代號，例如：
台灣上市股票：2330.TW (台積電)
台灣上櫃股票：00864B.TWO
美國股票：AAPL
指數：^IXIC (NASDAQ)

#💡 未來改進方向
📌 支援更多數據屬性（如開盤價、成交量等）
📌 加入其他財經數據來源（如 MoneyDJ、台灣證券交易所等）
📌 優化請求速度，減少 API 限制影響
🔗 GitHub Repo (如果有的話)

希望這個 README 對你發行 YAHOOFINANCE Google Apps Script 有幫助！
如果有其他修改需求或想加入更多說明，歡迎告訴我 😊🚀
