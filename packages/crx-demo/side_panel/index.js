console.log('side_panellllll', chrome.runtime.onMessage)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('runtime.onMessageeeee from side_panel', message, sender, sendResponse)

  const textarea = document.querySelector('textarea')
  textarea.value += JSON.stringify(message) + '\n'
})

chrome.runtime.sendMessage('side_panel loaded')

chrome.runtime.onConnect.addListener((port) => {
  console.log('side_panels onConnecttttttt', port)
  if (port.name === 'content_scripts') {
    port.onMessage.addListener((message, port) => {
      console.log('in side_panels port.onMessageeee: ', message, port)
      port.postMessage('postMessage from side_panels')
    })
  }
})