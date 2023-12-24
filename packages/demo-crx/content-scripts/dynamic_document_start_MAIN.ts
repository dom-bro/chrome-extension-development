{
  if (!chrome.runtime) chrome.runtime = {}
  const attribute = 'demo-crx-runtime'
  const runtimeParams = JSON.parse(document.documentElement.getAttribute(attribute))
  document.documentElement.removeAttribute(attribute)
  // chrome.runtime.id 浏览器不让写入
  if (!chrome.runtime.id) chrome.runtime.extensionId = runtimeParams.id
  if (!chrome.runtime.getURL) chrome.runtime.getURL = (path) => runtimeParams.getURLBase + path
  console.log('dynamic_document_start_MAIN', runtimeParams, chrome.runtime)
}
