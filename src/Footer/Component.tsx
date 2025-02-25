import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { SocialIcons } from './components/SocialIcons'

import type { Footer } from '@/payload-types'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const socialItems = []

  if (footerData?.social_facebook) {
    socialItems.push({
      key: 'facebook',
      link: footerData.social_facebook,
    })
  }

  if (footerData?.social_twitter) {
    socialItems.push({
      key: 'twitter',
      link: footerData.social_twitter,
    })
  }

  if (footerData?.social_instagram) {
    socialItems.push({
      key: 'instagram',
      link: footerData.social_instagram,
    })
  }

  if (footerData?.social_youtube) {
    socialItems.push({
      key: 'youtube',
      link: footerData.social_youtube,
    })
  }

  if (footerData?.contact_email) {
    socialItems.push({
      key: 'email',
      link: `mailto:${footerData.contact_email}`,
    })
  }

  return (
    <>
      <SocialIcons />

      <footer className="text-white">
        <div className="py-5 bg-red">
          <div className="container mx-auto">
            <ul className="flex justify-center mx-auto w-fit group">
              {socialItems.map(({ key, link }) => (
                <li key={key}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block transition-opacity group-hover:opacity-50 hover:opacity-100 size-14"
                  >
                    <svg viewBox="0 0 64 64">
                      <use xlinkHref={`#${key}-icon`} className="fill-white"></use>
                      <use xlinkHref={`#${key}-mask`} className="fill-transparent"></use>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-16 bg-black text-white/40">
          <div className="container mx-auto">
            <div className="space-y-5 text-center">
              <p>&copy; {new Date().getFullYear()} | Relatable Detectives</p>
              <p>Portions &copy; Simon & Schuster, Inc., {new Date().getFullYear()}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
