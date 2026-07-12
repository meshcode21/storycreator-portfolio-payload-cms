import React from 'react'
import StudioInbox from './StudioInbox'
import { INITIAL_INQUIRIES } from '@/data'

export default function page() {
    return (
        <StudioInbox initialInquiries={INITIAL_INQUIRIES} />
    )
}
