import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type {
  SeasonRecapsGridBlock as SeasonRecapsGridBlockProps,
  SeasonRecap,
} from '@/payload-types'

const SeasonRecapCell: React.FC<SeasonRecap> = async ({ title, thumbnail, slug }) => {
  return (
    <div>
      <Link href={`/season-recaps/${slug}`} prefetch={true}>
        {thumbnail && typeof thumbnail === 'object' ? (
          <Image
            src={thumbnail.url!}
            alt={title}
            width={thumbnail.width!}
            height={thumbnail.height!}
          />
        ) : (
          <span>{title}</span>
        )}
      </Link>
    </div>
  )
}

export const SeasonRecapsGridBlock: React.FC<SeasonRecapsGridBlockProps> = async (props) => {
  const { content } = props

  const payload = await getPayload({ config: configPromise })
  const results = await payload.find({
    collection: 'season-recaps',
    pagination: false,
  })

  const seasonRecaps = results.docs

  return (
    <div className="container mx-auto">
      <div className="space-y-12">
        {content && (
          <RichText className="mx-auto max-w-5xl richtext" data={content} enableGutter={false} />
        )}

        {seasonRecaps.length && (
          <div className="grid grid-cols-2 gap-8 mx-auto max-w-5xl sm:grid-cols-3">
            {seasonRecaps.map((seasonRecap) => {
              if (typeof seasonRecap === 'object' && seasonRecap !== null) {
                return <SeasonRecapCell key={seasonRecap.id} {...seasonRecap} />
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
