<!--
Chrome扩展开发中的消息传递

 -->
<!-- 参考 [Message passing](https://developer.chrome.com/docs/extensions/develop/concepts/messaging) -->

大家好，我是 dom 哥。这是我关于 Chrome 扩展开发的系列文章，感兴趣的可以 [点个小星星](https://github.com/dom-bro/chrome-extension-development)。

一个复杂的 Chrome 扩展程序通常由 `content_scripts`，`background`，`action popup`，`side panel`，`options page`，`devtools` 等部分组成，这些部分所负责的功能各不相同，所处的运行环境各不相同，所能访问的 `chrome.*` API 也各不相同，也因此经常需要通信告诉对方需要做什么。

下面是我画的一张图，简单说明各部分关系：

![](chrome-extension.png)

这些花花绿绿的部分各自运行在不同的环境中，往往需要相互通信，Chrome 为我们提供了两种通信方式：

- 一种是一次性请求（one-time requests），一次只能发一条消息，类似于手机发短信，跟 HTTP 请求很像。
- 一种是长期连接（long-lived connections），允许发送多条消息，类似于手机打电话，跟 Websocket 连接很像。

接下来就详细说说这两种通信方式。

# 一次性请求（one-time requests）

如果要向扩展程序的另一部分**发送**一条消息，有两个 API 可供调用：

- `chrome.runtime.sendMessage(extensionId?, message)`
- `chrome.tabs.sendMessage(tabId, message)`

从函数签名很容易看出来，一个是向扩展程序的各个部分发消息的，另一个是给某个浏览器的某个页签发消息的。

为什么设计两个 API？这是因为 `content_scripts` 是一个很独特的存在！

先说说浏览器的的工作原理。

**浏览器的每个页签都是单独的线程**。每个页签运行在与其他页签或扩展相隔离的独立线程中。如下图所示

<!-- 参考 [Extension concepts and architecture](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/) -->

![](tab-threads.png)

我们在每个页签中打开页面。`content_scripts` 是一个很特殊的存在！作为被注入到页面的脚本，它的生命周期跟随页面。而扩展程序的其他部分，都有自己的生命周期！如果你在各个部分查看它们的 `location`，就会发现，只有 `content_scripts` 的 origin 是页面的 url 一样，而其它部分的 location.origin 都是 `chrome://your-extention-id`。

知道了 `content_scripts` 的特殊性后，那么这两个 API 就很好理解了。

`chrome.runtime.sendMessage()` 是给扩展程序发消息的，它的第一个参数是一个可选的 extensionId，意味着不但可以给自身扩展程序发消息，还能给别的扩展程序发消息，它发送的消息可以被扩展的任一部分接收到，包括 `background`，`action popup`，`side panel`，`options page`，`devtools` 等等，除了 `content_scripts`！！！

那么想给 `content_scripts` 发送消息怎么办呢？？？

`chrome.tabs.sendMessage()` 就是专门用来给 `content_scripts` 发消息的！值得注意的是，想要给 `content_scripts` 发消息需要指定 tabId，也就是需要指明给哪个页签下的页面的 `content_scripts` 发消息。这个设计很好，因为每个页签的页面都运行了一份 `content_scripts`，这就避免了无关的页面接收到消息。

发送消息搞定啦，有方法发送就得有方法接收才行啊。

**接收**消息的方法只有一个 API：

```js
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => boolean | undefined
)
```
在扩展程序的任意部分（包括 `content_scripts`）都是用这个接收消息。这很方便。

# 长期连接（long-lived connections）

长期链接的 API 和一次性消息的 API 是相互对应的。

要创建一个可重复使用的长期消息传递通道，有两个 API 可以调用：

- `chrome.runtime.connect(extensionId?, connectInfo?): Port`
- `chrome.tabs.connect(tabId, connectInfo?): Port`

这两个 API 的设计和一次性消息的一样。

`chrome.runtime.connect()` 用于和扩展程序的任一部分建立消息通道，除了 `content_scripts`！！！

而 `chrome.tabs.connect()` 是专门用来和 `content_scripts` 建立消息通道哒！

`chrome.{runtime,tabs}.connect()` 返回的是一个 Port 对象。Port 就是被设计用来在扩展程序的不同部分之间进行双向通信的一个接口。

觉得不错可以 [点个小星星](https://github.com/dom-bro/chrome-extension-development) 支持一下哦 🌹
