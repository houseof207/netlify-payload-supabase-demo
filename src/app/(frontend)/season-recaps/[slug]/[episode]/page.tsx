import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cookies, draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { SeasonEpisode } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { PasswordProtectSeasonEpisodeClient } from '@/PasswordProtect/Component.client'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const seasonRecaps = await payload.find({
    collection: 'season-recaps',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = seasonRecaps.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    episode?: string
  }>
}

export default async function SeasonEpisode({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', episode = '' } = await paramsPromise
  const url = `/season-recaps/${slug}/${episode}`
  const seasonEpisode = await querySeasonEpisodeBySlugs({ slug, episode })

  if (!seasonEpisode) return <PayloadRedirects url={url} />

  if (seasonEpisode.protect_password) {
    const cookieStore = await cookies()
    const authed = cookieStore.get(`authed-episode-${seasonEpisode.id}`)

    if (!authed) {
      return <PasswordProtectSeasonEpisodeClient doc={seasonEpisode} />
    }
  }

  const { layout } = seasonEpisode

  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderBlocks blocks={layout} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', episode = '' } = await paramsPromise
  const seasonEpisode = await querySeasonEpisodeBySlugs({ slug, episode })

  return generateMeta({ doc: seasonEpisode })
}

const querySeasonEpisodeBySlugs = cache(
  async ({ slug, episode }: { slug: string; episode: string }) => {
    const { isEnabled: draft } = await draftMode()

    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'season-episodes',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      depth: 1,
      where: {
        'season-recap.slug': {
          equals: slug,
        },
        slug: {
          equals: episode,
        },
      },
    })

    return result.docs?.[0] || null
  },
)
