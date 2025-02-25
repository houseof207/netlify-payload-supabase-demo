'use client'
import type { AccordionBlock as AccordionBlockProps } from 'src/payload-types'

import { cn } from '@/utilities/ui'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

type AccordionItemProps = {
  className?: string
} & NonNullable<AccordionBlockProps['items']>[number]

const AccordionBlockItem: React.FC<AccordionItemProps> = ({ title, content }) => {
  const [open, setOpen] = useState(false)

  return (
    <li>
      <p
        className="flex gap-4 items-center transition-colors cursor-pointer text-[1.22222em] hover:text-red"
        role="button"
        onClick={() => setOpen(!open)}
      >
        <span className="flex flex-shrink-0 w-3 font-bold text-red">
          <span className="m-auto">{open ? '-' : '+'}</span>
        </span>
        {title}
      </p>
      <div
        className={cn('border-t border-gray-300 mt-4 pt-4 transition-discrete transition', {
          hidden: !open,
        })}
      >
        <RichText data={content} enableGutter={false} enableProse={false} />
      </div>
    </li>
  )
}

type Props = {
  className?: string
} & AccordionBlockProps

export const AccordionBlock: React.FC<Props> = ({ className, items }) => {
  if (!items?.length) {
    return null
  }

  return (
    <ul className={cn('block-accordion', className)}>
      {items.map((item) => (
        <AccordionBlockItem key={item.id} {...item} />
      ))}
    </ul>
  )
}
