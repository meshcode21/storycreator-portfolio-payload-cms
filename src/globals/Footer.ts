import { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Settings', // Groups this neatly in the admin sidebar
  },
  fields: [
    { name: 'watermarkText', type: 'text', defaultValue: 'Visual History' },
    { name: 'brandName', type: 'text', defaultValue: 'StoryCreator' },
    { name: 'tagline', type: 'text', defaultValue: 'Archiving high-end cinematic weddings & lifestyles.' },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
      ],
    },
  ],
}