import { GlobalConfig } from 'payload'

export const Logos: GlobalConfig = {
    slug: 'logos',
    admin: {
        group: 'Settings', // Groups this neatly in the admin sidebar
    },
    fields: [
        {
            name: 'primaryLogo',
            type: 'upload',
            relationTo: 'media',
            required: true
        },
        {
            name: 'secondaryLogo',
            type: 'upload',
            relationTo: 'media',
            required: true
        }
    ]
}