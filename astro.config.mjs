import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    // starlight({ title: 'My delightful docs site', }), 
    mdx(), tailwind()],
  markdown: {
    shikiConfig: {
      langs: [
        'abap',
        'javascript',
        'typescript',
        'bash',
        'yaml',
        'dockerfile',
        {
          id: 'cds',
          scopeName: 'source.cds',
          grammar: {
            patterns: [
              {
                match: '\\b(namespace|entity|type|service|using|as|from|projection|on)\\b',
                name: 'keyword.control.cds'
              },
              {
                match: '\\b(String|Integer|Boolean|Date|Time|DateTime|Decimal|UUID)\\b',
                name: 'support.type.cds'
              }
            ]
          }
        }
      ]
    },
    wrap: true
  },
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@content': '/src/content',
        '@lib': '/src/lib',
        '@types': '/src/types'
      }
    }
  }
});