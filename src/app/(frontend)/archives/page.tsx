// page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import ArchivesClient from './ArchivesClient'

export const revalidate = 0; // Ensures fresh updates when editing curation layouts

export default async function ArchivesPage() {
    const payload = await getPayload({ config })

    // Fetch from your curated Global configuration instead of raw database collections
    const pageData = await payload.findGlobal({
        slug: 'archives-page',
        depth: 2, // Depth 2 populates relationship lists (archives) AND their nested assets (media)
    })

    return (
        <main>
            <ArchivesClient pageData={pageData} />
        </main>
    )
}