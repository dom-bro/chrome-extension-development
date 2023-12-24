{
  const params = {
    id: chrome.runtime.id,
    getURLBase: chrome.runtime.getURL(''),
  }
  document.documentElement.setAttribute('demo-crx-runtime', JSON.stringify(params))
  console.log('dynamic_document_start', chrome.runtime, params)
}

