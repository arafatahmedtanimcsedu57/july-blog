import type { Request, Response } from 'express'
import type { Endpoint } from 'payload/config'

import type { HospitalIncident } from '../payload-types'

const importHospitalIncidents: Endpoint = {
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

      // Map CSV fields to HospitalIncident schema
      const created: HospitalIncident[] = []
      for (const [i, row] of records.entries()) {
        const incident: Partial<HospitalIncident> = {
          name: row.name,
          lat: row.lat ? row.lat : 0,
          lng: row.lng ? row.lng : 0,
          verified_deaths: row.verified_deaths,
          verified_injuries: row.verified_injuries,
        }

        // Create entry in Payload
        const createdIncident = await req.payload.create({
          collection: 'hospital-incidents',
          data: incident,
        })
        created.push(createdIncident as HospitalIncident)
      }

      return res.status(200).json({
        incidents: created,
        message: `Imported ${created.length} incidents.`,
      })
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Failed to import incidents.' })
    }
  },
  method: 'post',
  path: '/import-hospital-incidents',
}

export default importHospitalIncidents
