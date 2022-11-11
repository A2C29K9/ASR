
import { defineUserConfig } from 'vuepress'

// export default defineUserConfig({
//   lang: 'zh-CN',
//   title: '你好， VuePress ！',
//   description: '这是我的第一个 VuePress 站点',
// })
module.exports = {
  title: 'Automatic Speech Recognizes',// 设置网站标题
  description: 'Speech recognizes sensitive words',
  base: '/',   // 设置站点根路径
  // dest: './ROOT',  // 设置输出目录
  // port: 8080,
  head: [],
  plugins: ["@ulu/vuepress-plugin-auto-nav"],
  themeConfig: {
    pluginAutoNav: {
      /**
       * Generate links for the sidebar (nests children)
       */
      createSidebar: true,
      /**
       * Generate links for the top navbar
       */
      createNav: true,
      /**
       * If true it should show the whole tree else show by section (landing page)
       */
      sidebarAllSections: false
    },
    plugins: ["@ulu/vuepress-plugin-auto-nav"]
  }
}