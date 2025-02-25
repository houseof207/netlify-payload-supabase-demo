'use server'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cookies } from 'next/headers'

export const handleGameRecapPassword = async (
  _: { success: boolean; message: string },
  formData: FormData,
) => {
  const id = formData.get('id')
  const password = formData.get('password')
  const payload = await getPayload({ config: configPromise })

  if (id && password) {
    const result = await payload.find({
      collection: 'game-recaps',
      draft: false,
      limit: 1,
      pagination: false,
      where: {
        id: {
          equals: id,
        },
      },
    })

    if (result.docs?.[0]?.protect_password === password) {
      const cookieStore = await cookies()
      cookieStore.set(`authed-game-${result.docs[0].id}`, 'true', { httpOnly: true })

      return { success: true, message: '' }
    } else {
      return { success: false, message: 'Please try again' }
    }
  }

  return { success: false, message: 'There was a problem submitting the password' }
}

export const handleSeasonEpisodePassword = async (
  _: { success: boolean; message: string },
  formData: FormData,
) => {
  const id = formData.get('id')
  const password = formData.get('password')
  const payload = await getPayload({ config: configPromise })

  if (id && password) {
    const result = await payload.find({
      collection: 'season-episodes',
      draft: false,
      limit: 1,
      pagination: false,
      where: {
        id: {
          equals: id,
        },
      },
    })

    if (result.docs?.[0]?.protect_password === password) {
      const cookieStore = await cookies()
      cookieStore.set(`authed-episode-${result.docs[0].id}`, 'true', { httpOnly: true })

      return { success: true, message: '' }
    } else {
      return { success: false, message: 'Please try again' }
    }
  }

  return { success: false, message: 'There was a problem submitting the password' }
}
