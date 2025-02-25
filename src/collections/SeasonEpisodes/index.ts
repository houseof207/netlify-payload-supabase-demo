import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { slugField } from '@/fields/slug'
import { revalidateDelete, revalidateSeasonEpisode } from './hooks/revalidateSeasonEpisode'
import { populatePublishedAt } from '@/hooks/populatePublishedAt'
import { Content } from '@/blocks/Content/config'

export const SeasonEpisodes: CollectionConfig<'season-episodes'> = {
  slug: 'season-episodes',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    'season-recap': true,
    thumbnail: true,
  },
  admin: {
    group: false,
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'season-episodes',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'season-episodes',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'protect_password',
      label: 'Password Protect Page',
      type: 'text',
      admin: {
        placeholder: 'Enter password',
      },
    },
    {
      name: 'season-recap',
      type: 'relationship',
      relationTo: 'season-recaps',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Content],
      required: true,
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidateSeasonEpisode],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
