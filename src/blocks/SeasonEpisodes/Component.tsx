import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type {
  SeasonEpisode,
  SeasonEpisodesBlock as SeasonEpisodesBlockProps,
  SeasonRecap,
} from '@/payload-types'

const SeasonEpisodeCell: React.FC<SeasonEpisode & { href: string }> = async ({
  title,
  thumbnail,
  href,
}) => {
  let foundThumbnail

  if (thumbnail) {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'media',
      limit: 1,
      pagination: false,
      where: {
        id: {
          equals: thumbnail,
        },
      },
    })

    foundThumbnail = result.docs[0]
  }

  return (
    <div>
      <Link href={href} prefetch={true}>
        {foundThumbnail ? (
          <Image
            src={foundThumbnail.url!}
            alt={title}
            width={foundThumbnail.width!}
            height={foundThumbnail.height!}
          />
        ) : (
          <span>{title}</span>
        )}
      </Link>
    </div>
  )
}

export const SeasonEpisodesBlock: React.FC<
  SeasonEpisodesBlockProps & {
    doc?: SeasonRecap
  }
> = (props) => {
  const { content, doc } = props

  const episodes = doc?.episodes?.docs

  return (
    <div className="container mx-auto">
      <div className="space-y-12">
        {content && (
          <RichText className="mx-auto max-w-5xl richtext" data={content} enableGutter={false} />
        )}

        {doc && episodes?.length && (
          <div className="grid grid-cols-2 gap-8 mx-auto max-w-5xl sm:grid-cols-3">
            {episodes.map((episode) => {
              if (typeof episode === 'object' && episode !== null) {
                const href = `/season-recaps/${doc.slug}/${episode.slug}`
                return <SeasonEpisodeCell key={episode.id} href={href} {...episode} />
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
