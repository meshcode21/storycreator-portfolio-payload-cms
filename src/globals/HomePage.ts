import { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
    slug: 'home-page',
    admin: {
        group: 'Pages',
        description: 'Manage page metadata and curate items from your Archives collection.',
    },
    fields: [
        // --- Hero Section ---
        {
            type: 'group',
            name: 'hero',
            fields: [
                {
                    name: 'backgroundImage',
                    type: 'upload',
                    relationTo: 'media',
                    required: true
                },
                {
                    name: 'subtitle',
                    type: 'text',
                    defaultValue: 'Cinematic Legacy'
                },
                {
                    name: 'title',
                    type: 'textarea', // Textarea allows you to press 'Enter' in the CMS to create the line break naturally
                    defaultValue: 'Crafting Living\nMemories',
                    required: true
                },
                {
                    name: 'description',
                    type: 'textarea',
                    defaultValue: 'High-end cinematic wedding & event films of raw, moody, and timeless beauty.',
                    required: true
                },
                {
                    type: 'row', // Groups the buttons side-by-side in the admin UI
                    fields: [
                        {
                            type: 'group',
                            name: 'primaryButton',
                            fields: [
                                { name: 'label', type: 'text', defaultValue: '[ View Showreel ]' },
                                { name: 'url', type: 'text', defaultValue: '#showreel-anchor' },
                            ]
                        },
                        {
                            type: 'group',
                            name: 'secondaryButton',
                            fields: [
                                { name: 'label', type: 'text', defaultValue: 'Explore The Work' },
                                { name: 'url', type: 'text', defaultValue: '/the-work' },
                            ]
                        }
                    ]
                }
            ],
        },
        // --- Legacy Philosophy Section ---
        {
            type: 'group',
            name: 'philosophy',
            fields: [
                { name: 'subheading', type: 'text', required: true, defaultValue: 'The Julian Vance Studio Philosophy' },
                { name: 'quote', type: 'textarea', required: true, defaultValue: "Legacy is not what we leave behind, but the timeless frames we choose to keep alive." },
                { name: 'description', type: 'text', required: true, defaultValue: "5+ years capturing raw, moody, and timeless visual history for couples and artists globally." }]
        },
        // --- Showreel Section ---
        {
            type: 'group',
            name: 'showreel',
            fields: [
                { name: 'subtitle', type: 'text', defaultValue: 'Visual Showreel' },
                { name: 'title', type: 'text', defaultValue: 'TIMELINESS IN EVERY FRAME' },
                {
                    name: 'archiveItem',
                    type: 'relationship',
                    relationTo: 'archives',
                    required: true,
                    admin: {
                        description: 'Select a Motion (Video) archive to feature as the primary showreel.',
                    },
                    filterOptions: {
                        type: {
                            equals: 'motion',
                        },
                    },
                },
            ],
        },
        // --- Recent Chapters (Featured Work) ---
        {
            type: 'group',
            name: 'featuredWord',
            fields: [
                { name: 'subTitle', type: 'text', defaultValue: 'Selected Work' },
                { name: 'title', type: 'text', defaultValue: 'Recent Chapters' },
                { name: 'cta-redirect', type: 'text', label: 'Redirect To', defaultValue: '/archives' },
                {
                    name: 'workList',
                    type: 'relationship',
                    relationTo: 'archives',
                    hasMany: true,
                    minRows: 4,
                    maxRows: 4,
                    required: true,
                    filterOptions: {
                        type: {
                            equals: 'stills',
                        },
                    },
                },
            ]
        }
    ],
}