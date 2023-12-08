import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Vue Document Exporter",
  themeConfig: {
    logo: '/vue.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Usage', link: '/guide/word' }
    ],

    sidebar: [
      {
        text: 'Get Started',
        items: [
          { text: 'Installation', link: '/guide/installation' },
        ]
      },
      {
        text: 'Export Types',
        items: [
          { text: 'Word', link: '/guide/word' },
          { text: 'Excel', link: '/guide/excel' },
          { text: 'CSV', link: '/guide/csv' },
          { text: 'PDF', link: '/guide/pdf' },
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/KellsWorks/vue-doc-exporter' },
      { icon: 'x', link: 'https://twitter.com/kellskamuzu'}
    ]
  }
})
