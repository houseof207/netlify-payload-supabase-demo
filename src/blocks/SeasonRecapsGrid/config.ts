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

export const SeasonRecapsGrid: Block = {
  slug: 'season-recaps-grid',
  labels: {
    singular: 'Season Recaps Grid',
    plural: 'Season Recaps Grids',
  },
  interfaceName: 'SeasonRecapsGridBlock',
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
