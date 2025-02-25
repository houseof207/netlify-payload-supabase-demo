import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  admin: {
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'social_facebook',
      label: 'Facebook URL',
      type: 'text',
    },
    {
      name: 'social_twitter',
      label: 'X (Twitter) URL',
      type: 'text',
    },
    {
      name: 'social_instagram',
      label: 'Instagram URL',
      type: 'text',
    },
    {
      name: 'social_youtube',
      label: 'YouTube URL',
      type: 'text',
    },
    {
      name: 'contact_email',
      label: 'Contact Email Address',
      type: 'email',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
