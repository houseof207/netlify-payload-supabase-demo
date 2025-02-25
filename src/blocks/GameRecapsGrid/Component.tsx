import React from 'react'
import RichText from '@/components/RichText'
import Image from 'next/image'
import Link from 'next/link'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { GameRecapsGridBlock as GameRecapsGridBlockProps, GameRecap } from '@/payload-types'

const GameRecapCell: React.FC<GameRecap> = async ({ title, thumbnail, slug }) => {
  return (
    <div>
      <Link href={`/game-recaps/${slug}`} prefetch={true}>
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

export const GameRecapsGridBlock: React.FC<GameRecapsGridBlockProps> = async (props) => {
  const { content } = props

  const payload = await getPayload({ config: configPromise })
  const results = await payload.find({
    collection: 'game-recaps',
    pagination: false,
  })

  const gameRecaps = results.docs

  return (
    <div className="container mx-auto">
      <div className="space-y-12">
        {content && (
          <RichText className="mx-auto max-w-5xl richtext" data={content} enableGutter={false} />
        )}

        {gameRecaps.length && (
          <div className="grid grid-cols-2 gap-8 mx-auto max-w-5xl sm:grid-cols-3">
            {gameRecaps.map((gameRecap) => {
              if (typeof gameRecap === 'object' && gameRecap !== null) {
                return <GameRecapCell key={gameRecap.id} {...gameRecap} />
              }

              return null
            })}
          </div>
        )}
      </div>
    </div>
  )
}
