console.log("background service-worker 111")

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log("onRuleMatchedDebug", info.request.type, info.request.url, info)
})

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    // console.log("onCompletedddddddd", details.url, details)
  },
  { urls: ["<all_urls>"] },
  ["responseHeaders", "extraHeaders"]
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(
    "onMessageeeee from background service worker",
    message,
    sender,
    sendResponse
  )
})

chrome.runtime.onConnect.addListener((port) => {
  console.log('background onConnecttttttt', port)
  if (port.name === 'content_scripts') {
    port.onMessage.addListener((message, port) => {
      console.log('in background port.onMessageeee: ', message, port)
      port.postMessage('postMessage from background')
    })
  }
})
