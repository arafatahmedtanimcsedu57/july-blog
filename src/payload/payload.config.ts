import { webpackBundler } from '@payloadcms/bundler-webpack' // bundler-import
import { mongooseAdapter } from '@payloadcms/db-mongodb' // database-adapter-import
import type { GenerateTitle } from '@payloadcms/plugin-seo/types'

import { payloadCloud } from '@payloadcms/plugin-cloud'
// import formBuilder from '@payloadcms/plugin-form-builder'
import nestedDocs from '@payloadcms/plugin-nested-docs'
import redirects from '@payloadcms/plugin-redirects'
import seo from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload/config'

import Categories from './collections/Categories'
import Comments from './collections/Comments'
import DistrictIncident from './collections/DistrictIncident'
import { Films } from './collections/Films'
import HospitalIncident from './collections/HospitalIncident'
import IndividualIncident from './collections/IndividualIncident'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Projects } from './collections/Projects'
import { Studies } from './collections/Studies'
import Users from './collections/Users'
import BeforeDashboard from './components/BeforeDashboard'
import BeforeLogin from './components/BeforeLogin'
import Logo, { Icon } from './components/Logo'
import importDistrictIncidents from './endpoints/importDistrictIncidents'
import importHospitalIncidents from './endpoints/importHospitalIncidents'
import importIndividualIncidents from './endpoints/importIndividualIncidents'
import { clearDBEndpoint, resetDBEndpoint, seedDBEndpoint } from './endpoints/resetDB'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Settings } from './globals/Settings'
import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3'
import { cloudStorage } from '@payloadcms/plugin-cloud-storage'
// Ensure S3_ENDPOINT, S3_ACCESS_KEY_ID, S3_SECRET, and S3_BUCKET environment variables are set

const generateTitle: GenerateTitle = () => {
  return 'MONSOON PROTEST ARCHIVES'
}

const m = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    autoLogin: {
      email: 'demo@payloadcms.com',
      password: 'demo',
      prefillOnly: true,
    },
    bundler: webpackBundler(), // bundler-config
    components: {
      beforeDashboard: [BeforeDashboard],
      beforeLogin: [BeforeLogin],
      graphics: { Icon, Logo },
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
      ],
    },
    meta: {
      favicon: './favicon.svg',
      ogImage: './logo.png',
      titleSuffix: 'MONSOON PROTEST ARCHIVES',
    },
    user: Users.slug,
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          express: m,
          [path.resolve(__dirname, './cron/reset')]: m,
        },
      },
    }),
  },
  collections: [
    Pages,
    Posts,
    Projects,
    Films,
    Media,
    Categories,
    Users,
    Comments,
    IndividualIncident,
    DistrictIncident,
    HospitalIncident,
    Studies,
  ],
  cors: [process.env.MAP_SERVER || '', 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.MAP_SERVER || '', 'http://localhost:3000'].filter(Boolean),
  editor: lexicalEditor({}),
  endpoints: [
    resetDBEndpoint,
    seedDBEndpoint,
    clearDBEndpoint,
    importIndividualIncidents,
    importDistrictIncidents,
    importHospitalIncidents,
  ],
  globals: [Settings, Header, Footer],
  graphQL: {
    disablePlaygroundInProduction: false,
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  rateLimit: {
    max: 10000, // limit each IP per windowMs
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
  },
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
  // database-adapter-config-end

  plugins: [
    // formBuilder({}),
    redirects({
      collections: ['pages', 'posts'],
    }),
    nestedDocs({
      collections: ['categories'],
    }),
    seo({
      collections: ['pages', 'posts', 'projects', 'films', 'studies'],
      generateTitle,
      uploadsCollection: 'media',
    }),
    payloadCloud(),
    cloudStorage({
      collections: {
        media: {
          adapter: s3Adapter({
            config: {
              endpoint: process.env.S3_ENDPOINT,
              region: process.env.S3_REGION || 'auto',
              credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
                secretAccessKey: process.env.S3_SECRET || '',
              },
            },
            bucket: process.env.S3_BUCKET || '',
          }),
        },
      },
    }),
  ],
})
