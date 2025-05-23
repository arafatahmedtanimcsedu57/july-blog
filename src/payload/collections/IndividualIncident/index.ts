import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrPublished } from '../../access/adminsOrPublished'
import BeforeIndividualIncident from '../../components/BeforeIndividualIncident'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { districts, genders, graphicLevels, incidentTypes } from '../constant'
import { locationCoordinates } from './hooks/locationCoordinates'

const IndividualIncident: CollectionConfig = {
  access: {
    create: admins,
    delete: () => true,
    read: adminsOrPublished,
    update: admins,
  },
  admin: {
    components: {
      BeforeListTable: [BeforeIndividualIncident],
    },
    defaultColumns: ['name', 'type', 'location', 'date'],
    group: 'Incidents',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      required: false,
      type: 'text',
    },
    {
      name: 'gender',
      options: [...genders],
      required: false,
      type: 'select',
    },
    {
      name: 'age',
      required: false,
      type: 'number',
    },
    {
      name: 'occupation',
      required: false,
      type: 'text',
    },
    {
      name: 'type',
      options: [...incidentTypes],
      required: true,
      type: 'select',
    },
    {
      name: 'location',
      required: false,
      type: 'text',
    },
    {
      name: 'district',
      options: [...districts],
      required: false,
      type: 'select',
    },
    {
      name: 'summary',
      required: false,
      type: 'textarea',
    },
    {
      name: 'mediaLinks',
      fields: [
        {
          name: 'url',
          required: true,
          type: 'text',
        },
      ],
      label: 'Media Links',
      required: false,
      type: 'array',
    },
    {
      name: 'lat',
      required: false,
      type: 'number',
    },
    {
      name: 'lng',
      required: false,
      type: 'number',
    },
    // locationCoordinates field removed; now set automatically from lat/lng in a hook
    {
      name: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
        },
        description: 'Select a date. Will be stored as a date (ISO string).',
      },
      required: false,
      type: 'date',
    },
    {
      name: 'graphicLevel',
      options: [...graphicLevels],
      required: false,
      type: 'select',
    },
  ],
  hooks: {
    beforeChange: [populatePublishedDate, locationCoordinates],
  },
  labels: {
    plural: 'Individual Incidents',
    singular: 'Individual Incident',
  },
  slug: 'individual-incidents',
}

export default IndividualIncident
