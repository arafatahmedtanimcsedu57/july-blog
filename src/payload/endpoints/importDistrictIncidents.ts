import type { Request, Response } from 'express'
import type { Endpoint } from 'payload/config'

import type { DistrictIncident } from '../payload-types'

const importDistrictIncidents: Endpoint = {
  handler: async (req: Request & { files?: any; payload?: any }, res: Response) => {
    try {
      // Dynamically require Node-only modules inside the handler
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { parse } = require('csv-parse/sync')
      if (!req.files || !req.files.csv) {
        return res.status(400).json({ error: 'CSV file is required (field name: csv)' })
      }

      const csvFile = req.files.csv
      // Buffer is available in Node.js, but not in browser. This ensures it's only used server-side.
      const csvBuffer = Array.isArray(csvFile) ? csvFile[0].data : csvFile.data
      const csvString = Buffer.from(csvBuffer).toString('utf-8')

      // Parse CSV
      const records = parse(csvString, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      })

      // Map CSV fields to DistrictIncident schema
      const created: DistrictIncident[] = []
      for (let i = 0; i < records.length; i++) {
        const row = records[i]
        const incident: Partial<DistrictIncident> = {
          district: row.district,
          lat: row.lat,
          lng: row.lng,
          verified_deaths: row.verified_deaths,
          verified_injuries: row.verified_injuries,
        }

        // Create entry in Payload
        const createdIncident = await req.payload.create({
          collection: 'district-incidents',
          data: incident,
        })
        created.push(createdIncident as DistrictIncident)
      }

      console.log(created)
      return res.status(200).json({
        incidents: created,
        message: `Imported ${created.length} incidents.`,
      })
    } catch (err: any) {
      console.log(err)
      return res.status(500).json({ error: err.message || 'Failed to import incidents.' })
    }
  },
  method: 'post',
  path: '/import-district-incidents',
}

export default importDistrictIncidents
