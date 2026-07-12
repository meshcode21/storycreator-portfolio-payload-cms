import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  admin: {
    group: 'Settings', // Groups this neatly in the admin sidebar
  },
  fields: [
    {
      name: 'brandName',
      type: 'text',
      defaultValue: 'StoryCreator',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Manage your main navigation links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          admin: {
            description: 'Example: /, /archives, /story, /inquire',
          },
        },
      ],
    },
  ],
}