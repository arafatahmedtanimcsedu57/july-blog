import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import BeforeDistrictIncident from '../../components/BeforeDistrictIncident'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'
import { districts } from '../constant'

const DistrictIncident: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },
  admin: {
    components: {
      BeforeListTable: [BeforeDistrictIncident],
    },
    defaultColumns: ['district', 'verified_injuries', 'verified_deaths'],
    group: 'Incidents',
    useAsTitle: 'district',
  },
  fields: [
    {
      name: 'district',
      options: [...districts],
      required: true,
      type: 'select',
    },
    {
      name: 'verified_injuries',
      label: 'Injuries',
      required: true,
      type: 'number',
    },
    {
      name: 'verified_deaths',
      label: 'Death',
      required: true,
      type: 'number',
    },

    {
      name: 'lat',
      label: 'Latitude',
      required: true,
      type: 'number',
    },
    {
      name: 'lng',
      label: 'Longitude',
      required: true,
      type: 'number',
    },
  ],
  hooks: {
    beforeChange: [populatePublishedDate],
  },
  labels: {
    plural: 'District Incidents',
    singular: 'District Incident',
  },
  slug: 'district-incidents',
}

export default DistrictIncident
