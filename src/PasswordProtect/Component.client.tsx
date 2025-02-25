'use client'

import { GameRecap, SeasonEpisode } from '@/payload-types'
import { useActionState } from 'react'
import { handleGameRecapPassword, handleSeasonEpisodePassword } from '@/app/password-protect/check'

export const PasswordProtectGameRecapClient: React.FC<{ doc: GameRecap }> = ({ doc }) => {
  const [state, formAction] = useActionState(handleGameRecapPassword, {
    success: false,
    message: '',
  })

  return (
    <article className="py-16">
      <div className="container mx-auto">
        <div className="flex place-content-center place-items-center min-h-[75vh]">
          <form action={formAction} className="w-[90%] max-w-xs">
            <div
              className="flex mx-auto mb-5 text-gray-400 rounded-full border-2 border-gray-400 size-16"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="m-auto w-1/2">
                <path
                  d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <label htmlFor="password" className="block sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="block py-2.5 px-4 w-full text-black border-2 border-gray-300"
              placeholder="Password"
              required
            />
            <input type="hidden" name="id" value={doc.id} />
            <button
              type="submit"
              className="block py-2.5 px-5 mt-3 w-full font-bold text-center text-white bg-black transition-colors cursor-pointer hover:bg-red"
            >
              Submit
            </button>
            {!state.success && (
              <p className="mt-5 text-base font-bold text-center text-red">{state.message}</p>
            )}
          </form>
        </div>
      </div>
    </article>
  )
}

export const PasswordProtectSeasonEpisodeClient: React.FC<{ doc: SeasonEpisode }> = ({ doc }) => {
  const [state, formAction] = useActionState(handleSeasonEpisodePassword, {
    success: false,
    message: '',
  })

  return (
    <article className="py-16">
      <div className="container mx-auto">
        <div className="flex place-content-center place-items-center min-h-[75vh]">
          <form action={formAction} className="w-[90%] max-w-xs">
            <div
              className="flex mx-auto mb-5 text-gray-400 rounded-full border-2 border-gray-400 size-16"
              aria-hidden="true"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="m-auto w-1/2">
                <path
                  d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <label htmlFor="password" className="block sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              className="block py-2.5 px-4 w-full text-black border-2 border-gray-300"
              placeholder="Password"
              required
            />
            <input type="hidden" name="id" value={doc.id} />
            <button
              type="submit"
              className="block py-2.5 px-5 mt-3 w-full font-bold text-center text-white bg-black transition-colors cursor-pointer hover:bg-red"
            >
              Submit
            </button>
            {!state.success && (
              <p className="mt-5 text-base font-bold text-center text-red">{state.message}</p>
            )}
          </form>
        </div>
      </div>
    </article>
  )
}
