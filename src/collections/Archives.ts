import { CollectionConfig } from 'payload'

export const Archives: CollectionConfig = {
  slug: 'archives',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      label: 'Sub Title',
      type: 'text', // e.g., "Cinematic Short Film" or "Director's Cut"
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Motion (Video)', value: 'motion' },
        { label: 'Stills (Photo)', value: 'stills' },
      ],
    },
    {
      name: 'media',
      label: 'Media File',
      type: 'upload',
      relationTo: 'media', // Connects directly to our Media collection
      required: true,
    },
    // {
    //   name: 'videoUrl',
    //   type: 'text',
    //   admin: {
    //     condition: (data) => data?.type === 'motion', // Only shows this field if "Motion" is selected
    //   },
    // },
  ],
}