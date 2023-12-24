import dynamic_document_start from '../content-scripts/dynamic_document_start.ts?script&module'
import dynamic_document_start_MAIN from '../content-scripts/dynamic_document_start_MAIN.ts?script&module'

console.log('background service-worker', dynamic_document_start, dynamic_document_start_MAIN)

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  console.log('onRuleMatchedDebug', info.request.type, info.request.url, info)
})

chrome.webRequest.onResponseStarted.addListener(
  (details) => {
    // console.log("onCompletedddddddd", details.url, details)
  },
  { urls: ['<all_urls>'] },
  ['responseHeaders', 'extraHeaders']
)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('onMessageeeee from background service worker', message, sender, sendResponse)
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

chrome.scripting
  .registerContentScripts([
    {
      id: 'dynamic_document_start',
      js: [dynamic_document_start],
      matches: ['<all_urls>'],
      runAt: 'document_start',
    },
  ])
  .then(() => console.log('registration complete dynamic_document_start'))
  .catch((err) => console.warn('unexpected error dynamic_document_start', err))

chrome.scripting
  .registerContentScripts([
    {
      id: 'dynamic_document_start_MAIN',
      js: [dynamic_document_start_MAIN],
      matches: ['<all_urls>'],
      runAt: 'document_start',
      world: 'MAIN',
    },
  ])
  .then(() => console.log('registration complete dynamic_document_start_MAIN'))
  .catch((err) => console.warn('unexpected error dynamic_document_start_MAIN', err))