import type { GlobalConfig } from 'payload'

export const ArchivesPage: GlobalConfig = {
    slug: 'archives-page',
    label: 'ArchivesPage',
    access: {
        read: () => true,
    },
    admin: {
        group: 'Pages',
        description: 'Manage page metadata and curate items from your Archives collection.',
    },
    fields: [
        {
            type: 'tabs',
            tabs: [
                // --- TAB 1: HERO CONFIG ---
                {
                    label: 'Hero Section',
                    fields: [
                        {
                            name: 'subTitle',
                            type: 'text',
                            label: 'Sub Title',
                            defaultValue: 'The Vault'
                        },
                        {
                            name: 'heroTitle',
                            type: 'text',
                            label: 'Hero Title',
                            defaultValue: 'The Archives',
                        },
                        {
                            name: 'heroDescription',
                            type: 'textarea',
                            label: 'Hero Description',
                            defaultValue: 'A curated collection of motion and still frames. Captured through the lens of atmospheric storytelling.',
                            admin: {
                                rows: 3,
                            },
                        },
                    ],
                },

                // --- TAB 2: CURATE SECTIONS ---
                {
                    label: 'Gallery Content',
                    fields: [
                        {
                            type: 'row',
                            fields: [
                                {
                                    name: 'stills',
                                    type: 'relationship',
                                    relationTo: 'archives', // Points to your existing collection file
                                    hasMany: true,
                                    label: 'Curated Stills',
                                    // description: 'Select and order archives for the Stills tab. You can create new entries directly from this dropdown.',
                                    admin: {
                                        width: '50%',
                                        // Optional: If your archive collection has a 'type' field, 
                                        // you can automatically filter the dropdown list like this:
                                    },
                                    filterOptions: {
                                        type: {
                                            equals: 'stills'
                                        }
                                    }
                                },
                                {
                                    name: 'motion',
                                    type: 'relationship',
                                    relationTo: 'archives', // Points to the same collection file
                                    hasMany: true,
                                    label: 'Curated Motion',
                                    //   description: 'Select and order archives for the Motion tab.',
                                    admin: {
                                        width: '50%',
                                    },
                                    filterOptions: {
                                        type: {
                                            equals: 'motion'
                                        }
                                    }
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}