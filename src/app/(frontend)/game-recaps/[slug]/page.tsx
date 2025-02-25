import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { cookies } from 'next/headers'

import type { GameRecap } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PasswordProtectGameRecapClient } from '@/PasswordProtect/Component.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const gameRecaps = await payload.find({
    collection: 'game-recaps',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = gameRecaps.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function GameRecap({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/game-recaps/' + slug
  const gameRecap = await queryGameRecapBySlug({ slug })

  if (!gameRecap) return <PayloadRedirects url={url} />

  if (gameRecap.protect_password) {
    const cookieStore = await cookies()
    const authed = cookieStore.get(`authed-game-${gameRecap.id}`)

    if (!authed) {
      return <PasswordProtectGameRecapClient doc={gameRecap} />
    }
  }

  const { layout } = gameRecap

  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const gameRecap = await queryGameRecapBySlug({ slug })

  return generateMeta({ doc: gameRecap })
}

const queryGameRecapBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'game-recaps',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
