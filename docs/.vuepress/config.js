module.exports = {
  title: 'Automatic Speech Recognizes',// 设置网站标题
  description: 'Speech recognizes sensitive words',
  base: '/',   // 设置站点根路径
  // dest: './ROOT',  // 设置输出目录
  // port: 8080,
  head: [],
  plugins: [],
  themeConfig: {
      // 添加导航栏
      nav: [
          { text: '主页', link: '/' },
          { text: '指南', link: '/guide/' },
          { text: '生活', link: '/life/'},
          { text: '学习',
              items: [
                  { text: '英语', link: '/study/english/english01' },
                  { text: '数学', link: '/study/math/math01' },
              ]
          }
    ],
      // 为以下路由添加左侧边栏
      sidebar: {
          '/life/': [
              {
                  title: '生活测试',
                  collapsable: false,
                  children: [
                      { title: '生活测试01', path: '/life/life01' },
                      { title: '生活测试02', path: '/life/life02' },
                      { title: '生活测试03', path: '/life/life03' },
                  ]
              }
          ],
          '/study/english/': [
              {
                  title: '英语',
                  collapsable: false,
                  children: [
                      { title: '第一节', path: '/study/english/english01' },
                      { title: '第二节', path: '/study/english/english02' },
                      { title: '第三节', path: '/study/english/english03' },
                  ]
              }
          ],
          '/study/math/': [
              {
                  title: '数学',
                  collapsable: false,
                  children: [
                      { title: '第一节', path: '/study/math/math01' },
                      { title: '第二节', path: '/study/math/math02' },
                      { title: '第三节', path: '/study/math/math03' },
                  ]
              }
          ],
      },
      sidebarDepth: 2,//左侧导航显示的层级
      lastUpdated: 'Last Updated'
  }
}