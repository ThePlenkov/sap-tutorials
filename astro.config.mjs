import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [mdx(), tailwind()],
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
  }
});