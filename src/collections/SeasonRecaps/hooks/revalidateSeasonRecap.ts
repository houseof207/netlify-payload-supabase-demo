import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { SeasonRecap } from '@/payload-types'

export const revalidateSeasonRecap: CollectionAfterChangeHook<SeasonRecap> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/season-recaps/${doc.slug}`

      payload.logger.info(`Revalidating season recap at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/season-recaps/${previousDoc.slug}`

      payload.logger.info(`Revalidating old season recap at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<SeasonRecap> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/season-recaps/${doc?.slug}`

    revalidatePath(path)
  }

  return doc
}
