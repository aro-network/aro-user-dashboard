'use client'

import React from 'react'
import Turnstile from 'react-turnstile'

type Props = {
  onVerify: (token: string) => void
  className?: string
}

export const TurnstileWidget: React.FC<Props> = ({ onVerify, className, ...props }) => {
  return (
    <div className={'w-full '}>
      <Turnstile
        className='w-full '
        onVerify={onVerify}
        sitekey="0x4AAAAAABmAVimgQa2LKEp0"
        {...props}
      />
    </div>
  )
}
