import React, { Fragment } from 'react'

import type { Page, GameRecap, SeasonRecap, SeasonEpisode } from '@/payload-types'
import { ContentBlock } from '@/blocks/Content/Component'
import { SeasonEpisodesBlock } from '@/blocks/SeasonEpisodes/Component'
import { GameRecapsGridBlock } from './GameRecapsGrid/Component'
import { SeasonRecapsGridBlock } from './SeasonRecapsGrid/Component'

const blockComponents = {
  content: ContentBlock,
  'season-episodes': SeasonEpisodesBlock,
  'game-recaps-grid': GameRecapsGridBlock,
  'season-recaps-grid': SeasonRecapsGridBlock,
}

type BlockType =
  | Page['layout'][0]
  | GameRecap['layout'][0]
  | SeasonRecap['layout'][0]
  | SeasonEpisode['layout'][0]

export const RenderBlocks: React.FC<{
  blocks: BlockType[]
  doc?: SeasonRecap
}> = (props) => {
  const { blocks, doc } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div id={`block-${block.id}`} className="my-[clamp(32px,8vw,96px)]" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} doc={doc} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
