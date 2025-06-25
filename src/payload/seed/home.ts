import type { Page } from '../payload-types'

import { convertSlateToLexical } from '../utilities/lexical/slateToLexical'

export const home: Partial<Page> = {
  _status: 'published',
  hero: {
    links: [
      // {
      //   link: {
      //     appearance: 'primary',
      //     label: 'All posts',
      //     reference: {
      //       relationTo: 'pages',
      //       value: '{{POSTS_PAGE_ID}}',
      //     },
      //     type: 'reference',
      //     url: '',
      //   },
      // },
      // {
      //   link: {
      //     appearance: 'secondary',
      //     label: 'All projects',
      //     reference: {
      //       relationTo: 'pages',
      //       value: '{{PROJECTS_PAGE_ID}}',
      //     },
      //     type: 'reference',
      //     url: '',
      //   },
      // },
    ],
    media: '{{IMAGE_1}}',
    richText: {
      root: {
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
                  newTab: false,
                  url: '/admin',
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
                    text: 'here',
                    type: 'text',
                    version: 1,
                  },
                ],
                direction: 'ltr',
                fields: {
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
            format: '',
            indent: 0,
            type: 'largeBody',
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
    type: 'highImpact',
  },
  layout: [
    {
      blockName: 'Content Block',
      blockType: 'content',
      columns: [
        {
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h2',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'full',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
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
                  url: '',
                },
                {
                  text: '.',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
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
                  url: '',
                },
                {
                  text: ' and ',
                },
                {
                  children: [
                    {
                      text: '',
                    },
                  ],
                  linkType: 'custom',
                  type: 'link',
                  url: '',
                },
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },

        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
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
                  url: '',
                },
                {
                  text: '.',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: 'Users can ',
                },
                {
                  children: [
                    {
                      text: '',
                    },
                  ],
                  linkType: 'custom',
                  type: 'link',
                  url: '',
                },
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
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
                  url: '',
                },
                {
                  text: '.',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
        {
          enableLink: false,
          richText: convertSlateToLexical([
            {
              children: [
                {
                  text: '',
                },
              ],
              type: 'h3',
            },
            {
              children: [
                {
                  text: '',
                },
              ],
            },
          ]) as any,
          size: 'oneThird',
        },
      ],
    },
    {
      blockName: 'Media Block',
      blockType: 'mediaBlock',
      media: '{{IMAGE_2}}',
      position: 'default',
    },
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      categories: [],
      introContent: convertSlateToLexical([
        {
          children: [
            {
              text: 'Recent posts',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: '',
            },
          ],
          type: 'p',
        },
      ]) as any,
      populateBy: 'collection',
      relationTo: 'posts',
    },
    {
      blockName: 'Archive Block',
      blockType: 'archive',
      categories: [],
      introContent: convertSlateToLexical([
        {
          children: [
            {
              text: 'Recent projects',
            },
          ],
          type: 'h4',
        },
        {
          children: [
            {
              text: '',
            },
          ],
          type: 'p',
        },
      ]) as any,
      populateBy: 'collection',
      relationTo: 'projects',
    },
    {
      blockName: 'CTA',
      blockType: 'cta',
      links: [
        {
          link: {
            appearance: 'primary',
            label: '',
            reference: {
              relationTo: 'pages',
              value: '{{POSTS_PAGE_ID}}',
            },
            type: 'reference',
            url: '',
          },
        },
        {
          link: {
            appearance: 'secondary',
            label: '',
            reference: {
              relationTo: 'pages',
              value: '{{PROJECTS_PAGE_ID}}',
            },
            type: 'reference',
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
              url: '',
            },
            {
              text: '.',
            },
          ],
        },
      ]) as any,
    },
  ],
  meta: {
    description: 'Monsoon Protests Archive',
    image: '{{IMAGE_1}}',
    title: 'Monsoon Protests Archive | Bangladesh',
  },
  publishedDate: '2023-09-30T23:00:00.000Z',
  slug: 'home',
  title: 'Home',
}
