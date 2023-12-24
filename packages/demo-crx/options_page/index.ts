window.CrxDemoOptionsPage = true
console.log('options_pageeee', chrome.runtime.onMessage, window)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('runtime.onMessageeeee from options_page', message, sender, sendResponse)
  const textarea = document.querySelector('textarea')
  textarea.value += JSON.stringify(message) + '\n'
})

chrome.runtime.sendMessage('options_page loaded')