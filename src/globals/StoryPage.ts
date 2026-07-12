import { GlobalConfig } from 'payload'

export const StoryPage: GlobalConfig = {
  slug: 'story-page',
  fields: [
    {
      name: 'name',
      type: 'text',
      defaultValue: 'Julian Vance',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      defaultValue: 'Lead Cinematographer',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'defaultPortrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'alternatePortrait',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'An Archivist of Raw & Unscripted Emotion',
      required: true,
    },
    {
      name: 'biography',
      type: 'richText', // Allows paragraph layout management
      required: true,
    },
    // Array field for customizable stats counters
    {
      name: 'stats',
      type: 'array',
      maxRows: 3,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
    },
    // Array field for your creative code cards
    {
      name: 'philosophies',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
      ],
    },
    // Footer quote section
    {
      name: 'footerQuote',
      type: 'textarea',
      required: true,
    },
  ],
}