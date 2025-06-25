import type { Page } from '../payload-types'

import { convertSlateToLexical } from '../utilities/lexical/slateToLexical'

export const staticHome: Page = {
  id: '',
  createdAt: '',
  hero: {
    links: null,
    media: '',
    richText: {
      root: {
        children: [
          {
            children: [
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                tag: 'h1',
                type: 'heading',
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '',
                type: 'text',
                version: 1,
              },
              {
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: '',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'start',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '',
                type: 'text',
                version: 1,
              },
              {
                children: [
                  {
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: '',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                fields: {
                  doc: null,
                  linkType: 'custom',
                  newTab: true,
                  url: '',
                },
                format: '',
                indent: 0,
                type: 'link',
                version: 1,
              },
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: '.',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: 'start',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    } as any,
    type: 'lowImpact',
  },
  layout: [
    {
      blockName: 'CTA',
      blockType: 'cta',
      links: [
        {
          link: {
            appearance: 'primary',
            label: '',
            reference: undefined,
            type: 'custom',
            url: '',
          },
        },
      ],
      richText: convertSlateToLexical([
        {
          children: [
            {
              text: '',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: '',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
              linkType: 'custom',
              type: 'link',
              url: '/admin',
            },
            {
              text: '',
            },
          ],
        },
      ]) as any,
    },
  ],
  meta: {
    description: 'Monsoon Protests Archive',
    title: 'Monsoon Protests Archive | Bangladesh',
  },
  slug: 'home',
  title: 'Home',
  updatedAt: '',
}
