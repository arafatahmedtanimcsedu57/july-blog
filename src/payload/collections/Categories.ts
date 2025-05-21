import type { CollectionConfig } from 'payload/types'

const CategoriesCollection: CollectionConfig = {
  access: {
    delete: () => false,
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
  id: string
  title?: string
  updatedAt: string
  createdAt: string
}

export default CategoriesCollection
