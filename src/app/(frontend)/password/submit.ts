'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'

export const handlePassword = async (formData) => {
  const slug = formData.get('slug')
  const password = formData.get('password')
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (result.docs[0].password === password) {
    const cookieStore = await cookies()
    cookieStore.set(`authed-${slug}`, 'true')
  }
}
