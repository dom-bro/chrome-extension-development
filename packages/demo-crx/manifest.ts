import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest(async (env) => {
  // console.log("defineManifesttttt", env)
  return {
    // 必须的
    manifest_version: 3,
    name: 'Demo Crx',
    version: packageJson.version,
    // 推荐的，发布 CWS 必须
    description: '扩展的描述',
    icons: {
      '48': 'icon48.png',
      '128': 'icon128.png',
    },

    // 重要的
    content_scripts: [
      {
        js: ['content-scripts/document_start.ts'],
        matches: ['<all_urls>'],
        run_at: 'document_start',
        all_frames: true,
        match_about_blank: true,
        match_origin_as_fallback: true,
      },
      {
        js: ['content-scripts/document_end.ts'],
        matches: ['<all_urls>'],
        run_at: 'document_end',
        all_frames: true,
      },
      {
        js: ['content-scripts/document_idle.ts'],
        matches: ['<all_urls>'],
        run_at: 'document_idle',
        all_frames: true,
      },
      {
        js: ['content-scripts/document_idle_main.ts'],
        matches: ['<all_urls>'],
        run_at: 'document_idle',
        world: 'MAIN',
        all_frames: true,
      },
    ],
    background: {
      type: 'module',
      service_worker: 'background/service-worker.ts',
    },
    permissions: [
      'tabs',
      'activeTab',
      'declarativeNetRequest',
      'declarativeNetRequestWithHostAccess',
      'declarativeNetRequestFeedback',
      'webRequest',
      'cookies',
      'desktopCapture',
      'downloads',
      'notifications',
      'storage',
      'sidePanel',
    ],
    host_permissions: ['<all_urls>'],

    // UI
    action: {
      default_popup: 'popup/index.html',
      default_title: '这是一个草莓🍓',
      // "default_icon": {
      //   "16": "popup/emotion_005.png"
      // }
    },
    devtools_page: 'devtools/index.html',
    side_panel: {
      default_path: 'side_panel/index.html',
    },
    options_page: 'options_page/index.html',
    chrome_url_overrides: {
      // "newtab": "newtab/index.html"
      // "history": "history/index.html"
      // "bookmarks": "bookmarks/index.html"
    },

    // 其他
    // "declarative_net_request": {
    //   "rule_resources": [
    //     {
    //       "id": "responseHeaders",
    //       "enabled": true,
    //       "path": "./rule_resources/responseHeaders.json"
    //     }
    //   ]
    // },

    homepage_url: 'https://dombro.site/',
  }
})
