'use client'

import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onVerify: (token?: string) => void
  className?: string
}

export const TurnstileWidget: React.FC<Props> = ({ onVerify, className, ...props }) => {
  return (
    <div className={'w-full '}>
      <ReCAPTCHA
        sitekey={'6LcQP5UrAAAAAI-Np2csPGUigYvwUCrnu7eVQRwM'}
        onChange={(token) => onVerify(token ?? undefined)}
      />
    </div>
  )
}
