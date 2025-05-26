import type { BeforeChangeHook } from 'payload/dist/collections/config/types'

export const locationCoordinates: BeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' || operation === 'update') {
    if (req.body) {
      const locationCoordinates =
        typeof data.lat === 'number' && typeof data.lng === 'number'
          ? `${data.lat}, ${data.lng}`
          : undefined
      return {
        ...data,
        locationCoordinates,
      }
    }
  }

  return data
}
