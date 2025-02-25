import React from 'react'
import RichText from '@/components/RichText'

import type { ContentBlock as ContentBlockProps } from '@/payload-types'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { richText } = props

  return (
    <div className="container mx-auto">
      {richText && (
        <RichText className="mx-auto max-w-5xl richtext" data={richText} enableGutter={false} />
      )}
    </div>
  )
}
