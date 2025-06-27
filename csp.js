const policies = {
  'child-src': ["'self'"],
  'connect-src': [
    "'self'",
    'https://maps.googleapis.com',
    'https://player.vimeo.com',
    'https://vimeo.com',
  ],
  'default-src': ["'self'"],
  'font-src': ["'self'"],
  'frame-src': ["'self'", 'https://player.vimeo.com', 'https://vimeo.com'],
  'img-src': ["'self'", 'https://raw.githubusercontent.com'],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    "'unsafe-eval'",
    'https://maps.googleapis.com',
    'https://player.vimeo.com',
    'https://vimeo.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'",
    'https://fonts.googleapis.com',
    'https://player.vimeo.com',
    'https://vimeo.com',
  ],
}

module.exports = Object.entries(policies)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key} ${value.join(' ')}`
    }
    return ''
  })
  .join('; ')
