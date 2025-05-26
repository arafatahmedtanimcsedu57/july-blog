'use client'
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'

import './index.scss'

const BeforeDistrictIncident: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [message, setMessage] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setMessage('Please select a CSV file.')
      return
    }
    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.append('csv', file)

    try {
      const res = await fetch('/api/import-district-incidents', {
        body: formData,
        method: 'POST',
      })
      const data = await res.json()
      if (res.ok) {
        setMessage(data.message || 'CSV uploaded successfully!')
      } else {
        setMessage(data.error || 'Failed to upload CSV.')
      }
    } catch (err) {
      setMessage('An error occurred while uploading.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="before-incident">
      <h4>Import District Incidents from CSV</h4>
      <form className="form form__incident" onSubmit={handleSubmit}>
        <input
          accept=".csv"
          className="input input__upload"
          disabled={loading}
          onChange={handleFileChange}
          type="file"
        />

        <button
          className="button button__upload"
          disabled={loading || !file}
          style={{ marginLeft: 8 }}
          type="submit"
        >
          <span className="label">{loading ? 'Uploading...' : 'Upload'}</span>
        </button>
      </form>

      {message && (
        <div style={{ color: message.includes('success') ? 'green' : 'red', marginTop: 12 }}>
          {message}
        </div>
      )}
    </div>
  )
}

export default BeforeDistrictIncident
