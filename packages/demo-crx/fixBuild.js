import fs from 'fs'
const crxjsPath = (await import.meta.resolve('@crxjs/vite-plugin')).replace('file://', '')
console.log(crxjsPath, fs.existsSync(crxjsPath))
let content = fs.readFileSync(crxjsPath, 'utf8')
content = content.replace('const asset = bundle[key];', 'const asset = bundle[key] || bundle[`.vite/${key}`];')
// content-script MAIN 执行 chrome.runtime.connect 需要传 extensionId
content = content.replace('chrome.runtime.connect({ name: \\"@crx/client\\" });', `chrome.runtime.connect(chrome.runtime.extensionId, { name: \\"@crx/client\\" });`)
// content-script MAIN 实现 HMR 需要 onConnectExternal
content = content.replace('chrome.runtime.onConnect.addListener(', `const _chromeRuntimeOnConnectAddListener_ = (...args) => {chrome.runtime.onConnect.addListener(...args); chrome.runtime.onConnectExternal.addListener(...args);};_chromeRuntimeOnConnectAddListener_(`)
fs.writeFileSync(crxjsPath, content)
