window.CrxDemoActionPopup = true
console.log('action popupppppppp', chrome.runtime.onMessage, window)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('runtime.onMessageeeee from action popup', message, sender, sendResponse)

  const textarea = document.querySelector('textarea')
  textarea.value += JSON.stringify(message) + '\n'
})

chrome.runtime.sendMessage('action_popup loaded')

chrome.runtime.onConnect.addListener((port) => {
  console.log('action_popup onConnecttttttt', port)
  if (port.name === 'content_scripts') {
    port.onMessage.addListener((message, port) => {
      console.log('in action_popup port.onMessageeee: ', message, port)
      port.postMessage('postMessage from action_popup')
    })
  }
})