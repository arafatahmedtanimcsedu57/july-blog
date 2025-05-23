import type { CollectionConfig } from 'payload/types'

import { admins } from '../access/admins'

const CategoriesCollection: CollectionConfig = {
  access: {
    delete: admins,
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
  slug: 'categories',
}

export interface Category {
  createdAt: string
  id: string
  title?: string
  updatedAt: string
}

export default CategoriesCollection
