import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'

export default defineManifest(async (env) => {
  // console.log("defineManifesttttt", env)
  const name = 'Mock Input'
  return {
    manifest_version: 3,
    name,
    description: '快速填充表单输入框',
    version: packageJson.version,
    permissions: [
      'contextMenus',
    ],
    icons: {
      '48': 'logo48.png',
      '128': 'logo128.png',
    },
    action: {
      default_title: name,
      default_popup: 'index.html',
    },
    content_scripts: [
      {
        matches: ['<all_urls>'],
        js: ['src/content-script.ts'],
        all_frames: true,
      },
    ],
    background: {
      service_worker: 'src/background.ts',
    },

    // options_page: 'index.html',
    options_ui: {
      page: 'index.html',
      open_in_tab: false,
    },

    author: {
      email: 'lyz516911028@gmail.com',
    },
    homepage_url: 'https://dombro.site',
  }
})
