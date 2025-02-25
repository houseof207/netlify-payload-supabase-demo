import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { GameRecap } from '@/payload-types'

export const revalidateGameRecap: CollectionAfterChangeHook<GameRecap> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/game-recaps/${doc.slug}`

      payload.logger.info(`Revalidating game recap at path: ${path}`)

      revalidatePath(path)
    }

    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/game-recaps/${previousDoc.slug}`

      payload.logger.info(`Revalidating old game recap at path: ${oldPath}`)

      revalidatePath(oldPath)
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<GameRecap> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/game-recaps/${doc?.slug}`

    revalidatePath(path)
  }

  return doc
}
