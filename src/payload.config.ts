import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob"

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Archives } from './collections/Archives'
import { StoryPage } from './globals/StoryPage'
import { HomePage } from './globals/HomePage'
import { Footer } from './globals/Footer'
import { Header } from './globals/Header'
import { Logos } from './globals/Logos'
import { ArchivesPage } from './globals/ArchivesPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    }
  },

  collections: [Users, Media, Archives],
  globals: [Logos, Header, HomePage, ArchivesPage, StoryPage, Footer],

  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: true, // You can use process.env.NODE_ENV === 'production' to enable only in production
      collections: {
        media: true, // Matches the slug of your Media collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // clientUploads: true,
    })
  ],
})
