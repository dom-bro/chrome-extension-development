console.log('devtools panel', chrome.runtime.onMessage)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('runtime.onMessageeeee from devtools', message, sender, sendResponse)
  const textarea = document.querySelector('textarea')
  textarea.value += JSON.stringify(message) + '\n'
})

chrome.runtime.sendMessage('devtools loaded')