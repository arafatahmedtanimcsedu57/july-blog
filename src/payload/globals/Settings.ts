import type { GlobalConfig } from 'payload/types'

export const Settings: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'postsPage',
      label: 'Posts page',
      relationTo: 'pages',
      type: 'relationship',
    },
    {
      name: 'projectsPage',
      label: 'Projects page',
      relationTo: 'pages',
      type: 'relationship',
    },
    {
      name: 'filmsPage',
      label: 'Films page',
      relationTo: 'pages',
      type: 'relationship',
    },
    {
      name: 'studiesPage',
      label: 'Studies page',
      relationTo: 'pages',
      type: 'relationship',
    },
  ],
  graphQL: {
    name: 'Settings',
  },
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
}
