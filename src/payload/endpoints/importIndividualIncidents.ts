import type { Request, Response } from 'express'
import type { Endpoint } from 'payload/config'

import type { IndividualIncident } from '../payload-types'

const importIndividualIncidents: Endpoint = {
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

      console.log(records, records.entries())
      // Map CSV fields to IndividualIncident schema
      const created: IndividualIncident[] = []
      for (const [i, row] of records.entries()) {
        console.log("I am here in loop")
        // Map/convert fields as needed
        let dateValue: string | undefined = undefined
        if (row.date) {
          // If it's a number (epoch ms), convert to ISO string
          if (!isNaN(Number(row.date))) {
            const ms = Number(row.date)
            const iso = new Date(ms).toISOString()
            dateValue = isNaN(ms) ? undefined : iso
          } else {
            // If it's a valid date string, use as is if valid
            const parsed = Date.parse(row.date)
            dateValue = isNaN(parsed) ? undefined : new Date(parsed).toISOString()
          }
        }

        const incident: Partial<IndividualIncident> = {
          name: row.name ? row.name : undefined,
          age: row.age ? Number(row.age) : undefined,
          archiveCode: row.archiveCode ? row.archiveCode : undefined,
          date: dateValue ? dateValue : undefined,
          district: row.district ? row.district : undefined,
          gender: row.gender ? row.gender : undefined,
          graphicLevel: row.graphicLevel || null,
          lat: row.lat ? Number(row.lat) : undefined,
          lng: row.lng ? Number(row.lng) : undefined,
          location: row.location ? row.location : undefined,
          mediaLinks: row.mediaLinks
            ? row.mediaLinks.split('|').map((url: string) => ({ url: url.trim() }))
            : [],
          occupation: row.occupation ? row.occupation : undefined,
          photo: row.photo ? row.photo : undefined,
          summary: row.summary ? row.summary : undefined,
          type: row.type ? row.type : undefined,
        }

        console.log('incident', incident)

        // Create entry in Payload
        const createdIncident = await req.payload.create({
          collection: 'individual-incidents',
          data: incident,
        })

        console.log('createdIncident', createdIncident)

        created.push(createdIncident as IndividualIncident)
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
  path: '/import-individual-incidents',
}

export default importIndividualIncidents
