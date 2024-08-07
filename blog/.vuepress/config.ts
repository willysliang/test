/**
 * @ Author: willy
 * @ CreateTime: 2024-02-26 19:19:37
 * @ Modifier: willysliang
 * @ ModifierTime: 2024-07-19 12:38:54
 * @ Description: 配置文件
 */

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'
import theme from './theme/defaultTheme'

export default defineUserConfig({
  head: [
    // 引入你的图标文件
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  theme,

  base: '/blog/',
  port: 8080,

  lang: 'zh-CN',
  title: 'Mr.Willy',
  description: 'This is willysliang blog site.',
})
