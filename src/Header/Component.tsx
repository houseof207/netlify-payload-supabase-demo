import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="py-5 text-white bg-black">
      <div className="container mx-auto">
        <div className="flex flex-col gap-5 items-center md:flex-row md:justify-between">
          <Link href="/" className="block w-[200px]">
            <Image
              src="/hak-logo-web_parent-white.png"
              width={1500}
              height={310}
              alt="Hunt a killer logo"
              priority={true}
            />
          </Link>

          <a
            href="https://huntakiller.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold uppercase opacity-70 transition-opacity hover:opacity-100"
          >
            Games
          </a>
        </div>
      </div>
    </header>
  )
}
