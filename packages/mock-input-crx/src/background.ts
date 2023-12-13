chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    title: 'Mock Input All',
    id: 'MockInputAll',
  })
})
chrome.contextMenus.onClicked.addListener((info, tab) => {
  console.log('onClickedddddd', info, tab)
  if (info.menuItemId === 'MockInputAll' && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: 'MockInputAll',
    })
  }
})
