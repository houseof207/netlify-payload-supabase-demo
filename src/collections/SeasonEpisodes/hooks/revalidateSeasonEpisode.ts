import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { SeasonEpisode } from '@/payload-types'

export const revalidateSeasonEpisode: CollectionAfterChangeHook<SeasonEpisode> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const populatedDoc = await payload.findByID({
        collection: 'season-episodes',
        id: doc.id,
        depth: 1,
      })

      if (typeof populatedDoc['season-recap'] === 'object') {
        const path = `/season-recaps/${populatedDoc['season-recap'].slug}/${doc.slug}`
        payload.logger.info(`Revalidating season episode at path: ${path}`)
        revalidatePath(path)
      }
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const populatedDoc = await payload.findByID({
        collection: 'season-episodes',
        id: previousDoc.id,
        depth: 1,
      })

      if (typeof populatedDoc['season-recap'] === 'object') {
        const oldPath = `/season-recaps/${populatedDoc['season-recap'].slug}/${previousDoc.slug}`
        payload.logger.info(`Revalidating old season episode at path: ${oldPath}`)
        revalidatePath(oldPath)
      }
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<SeasonEpisode> = async ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const populatedDoc = await payload.findByID({
      collection: 'season-episodes',
      id: doc.id,
      depth: 1,
    })

    if (typeof populatedDoc['season-recap'] === 'object') {
      const path = `/season-recaps/${populatedDoc?.['season-recap']?.slug}/${doc?.slug}`
      revalidatePath(path)
    }
  }

  return doc
}
