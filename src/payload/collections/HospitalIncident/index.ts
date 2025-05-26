import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import BeforeHospitalIncident from '../../components/BeforeHospitalIncident'
import { populatePublishedDate } from '../../hooks/populatePublishedDate'

const HospitalIncident: CollectionConfig = {
  access: {
    create: admins,
    delete: admins,
    read: () => true,
    update: admins,
  },
  admin: {
    components: {
      BeforeListTable: [BeforeHospitalIncident],
    },
    defaultColumns: ['name', 'verified_injuries', 'verified_deaths'],
    group: 'Incidents',
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      label: 'Hospital Name',
      required: true,
      type: 'text',
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
    plural: 'Hospital Incidents',
    singular: 'Hospital Incident',
  },
  slug: 'hospital-incidents',
}

export default HospitalIncident
