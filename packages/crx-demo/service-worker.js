// import './sub.js'
console.log("background service-worker", 444)

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log("onRuleMatchedDebug", info.request.type, info.request.url, info)
})

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    // if (details.url === "https://pss.bdstatic.com/r/www/cache/static/protocol/https/soutu/css/soutu_new2_e1a824c.css") {
      console.log("onCompletedddddddd", details.url, details)
    // }
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders", "extraHeaders"]
)
