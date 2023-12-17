# 项目依赖

## [vite](https://cn.vitejs.dev/) 5.0.0

- [x] 支持 typescript

## [@crxjs/vite-plugin](https://crxjs.dev/vite-plugin/) 2.0.0-beta.21

- [x] 支持 hmr
  - [x] The manifest
  - [x] Content scripts
  - [x] Service worker

# Chrome Extension 项目各部分更新逻辑

<!-- https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#when_to_reload_the_extension -->

| 扩展各部分                 | 是否需要更新扩展         | HMR |
| -------------------------- | ------------------------ | --- |
| The manifest               | Yes                      | ✅  |
| Service worker             | Yes                      | ✅  |
| Content scripts            | Yes (plus the host page) | ✅  |
| The popup                  | No                       | ✅  |
| Options page               | No                       | ✅  |
| Other extension HTML pages | No                       | ✅  |

# Chrome Extensions 官方示例

https://github.com/GoogleChrome/chrome-extensions-samples
