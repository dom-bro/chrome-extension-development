import './document_start.less'
import document_idle_main from './document_idle_main.ts?script&module'

{
  const now = new Date()
  console.log(
    `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getMilliseconds()} %ccontent-script`,
    'font-weight: bold;color: #090;',
    'document_start 12',
    location,
    chrome.runtime
  )
}

// const script = document.createElement('script')
// script.src = chrome.runtime.getURL(document_idle_main)
// script.type = 'module'
// document.head.prepend(script)
