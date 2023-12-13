# 项目依赖
## vite 5.0.0
- [x] 支持 typescript
## @crxjs/vite-plugin 2.0.0-beta.21
- [x] 支持 hmr
  - [x] The manifest
  - [x] Content scripts
  - [x] Service worker

# Chrome Extension 项目各部分更新逻辑
| Extension component	| Requires extension reload | HMR
| ------------------- | ------------------------- | ---
| The manifest	      | Yes                       | ✅ 
| Service worker	    | Yes                       | ✅ 
| Content scripts     | Yes (plus the host page)  | ✅ 
| The popup   	      | No                        | ✅ 
| Options page        | No                        | ✅ 
| Other extension HTML pages | No                 | ✅ 

# Chrome Extensions 官方示例
https://github.com/GoogleChrome/chrome-extensions-samples