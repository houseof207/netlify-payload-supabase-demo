import type { Block } from 'payload'

import {
  AlignFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

export const GameRecapsGrid: Block = {
  slug: 'game-recaps-grid',
  labels: {
    singular: 'Game Recaps Grid',
    plural: 'Game Recaps Grids',
  },
  interfaceName: 'GameRecapsGridBlock',
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: [
          BoldFeature(),
          ItalicFeature(),
          UnderlineFeature(),
          StrikethroughFeature(),
          SubscriptFeature(),
          SuperscriptFeature(),
          InlineCodeFeature(),
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2'] }),
          AlignFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          LinkFeature(),
          HorizontalRuleFeature(),
          InlineToolbarFeature(),
          FixedToolbarFeature(),
        ],
      }),
      label: false,
    },
  ],
}
