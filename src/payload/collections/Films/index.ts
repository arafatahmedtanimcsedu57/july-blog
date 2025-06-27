import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import { Archive } from '../../blocks/ArchiveBlock'
import { CallToAction } from '../../blocks/CallToAction'
import { Content } from '../../blocks/Content'
import { ContentMedia } from '../../blocks/ContentMedia'
import { MediaBlock } from '../../blocks/MediaBlock'
import richText from '../../fields/richText'
import { slugField } from '../../fields/slug'
import { populateArchiveBlock } from '../../hooks/populateArchiveBlock'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { revalidateFilm } from './hooks/revalidateFilm'

export const Films: CollectionConfig = {
  access: {
    create: admins,
    delete: () => false,
    read: adminsOrPublished,
    update: admins,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/films/${data?.slug}`,
    },
    preview: (doc) => {
      return `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/preview?url=${encodeURIComponent(
        `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/films/${doc?.slug as string}`,
      )}&secret=${process.env.PAYLOAD_PUBLIC_DRAFT_SECRET}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'categories',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
      type: 'relationship',
    },
    {
      name: 'publishedDate',
      admin: {
        position: 'sidebar',
      },
      type: 'date',
    },
    {
      tabs: [
        {
          fields: [
            {
              name: 'hero',
              fields: [
                richText(),

                {
                  name: 'videoLink',
                  type: 'text',
                  admin: {
                    description:
                      'Please enter a valid Vimeo link (e.g.,  https://player.vimeo.com/video/xxxxxx)',
                  },
                },
              ],

              type: 'group',
            },
          ],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              blocks: [CallToAction, Content, ContentMedia, MediaBlock, Archive],
              required: true,
              type: 'blocks',
            },
          ],
          label: 'Content',
        },
      ],
      type: 'tabs',
    },
    {
      name: 'relatedFilms',
      filterOptions: ({ id }) => {
        return {
          id: {
            not_in: [id],
          },
        }
      },
      hasMany: true,
      relationTo: 'films',
      type: 'relationship',
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateFilm],
    afterRead: [populateArchiveBlock],
    beforeChange: [populatePublishedDate],
  },
  slug: 'films',
  versions: {
    drafts: true,
  },
}
