import { getPayload } from 'payload'
import config from '@/payload.config'
import StoryClient from './StoryClient'

// This makes the page render on the server dynamically
export const revalidate = 0 

export default async function StoryPage() {
  // 1. Initialize the internal payload engine
  const payload = await getPayload({ config })

  // 2. Fetch the 'story-page' global entry
  const storyData = await payload.findGlobal({
    slug: 'story-page',
  })

  // 3. Feed the loaded database items straight into your UI layout
  return <StoryClient data={storyData} />
}