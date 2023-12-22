{
  // window.crxDemoContentScriptIdle = {}
  const  now = new Date()
  console.log(`${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getMilliseconds()} %ccontent-script`, 'font-weight: bold;color: #090;', 'document_idle', window.customVariable)
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('runtime.onMessageeeee from content-scripts', message, sender, sendResponse)
  // const textarea = document.querySelector('textarea')
  // textarea.value += JSON.stringify(message) + '\n'
})

chrome.runtime.sendMessage('content-scripts loaded')

const port = chrome.runtime.connect({
  name: 'content_scripts',
  includeTlsChannelId: false,
})

port.postMessage('postMessage from content_scripts')

port.onMessage.addListener((message, port) => {
  console.log('in content_scripts port.onMessageeee: ', message, port)
})
