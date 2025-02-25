import type { Block } from 'payload'

import {
  AlignFeature,
  BlocksFeature,
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

import { Accordion } from '@/blocks/Accordion/config'

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'richText',
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
          BlocksFeature({ blocks: [Accordion] }),
        ],
      }),
      label: false,
    },
  ],
}
