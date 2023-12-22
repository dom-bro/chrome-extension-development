export function testChromeRuntimeOnMessage (which: string) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`runtime.onMessageeeee from ${which}`, message, sender, sendResponse)
  
    const textarea = document.querySelector('textarea')
    if (textarea) textarea.value += JSON.stringify(message) + '\n'
  })
  
  chrome.runtime.sendMessage(`${which} loaded`)
}

export function testChromeRuntimeOnConnect (which: string) {
  chrome.runtime.onConnect.addListener((port) => {
    console.log(`${which} onConnecttttttt`, port, port.name)
    port.onMessage.addListener((message, port) => {
      console.log(`in ${which} port.onMessageeee: `, port.name, message, port)
      port.postMessage(`postMessage from ${which}`)
    })
  })
}