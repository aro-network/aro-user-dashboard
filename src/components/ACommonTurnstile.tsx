'use client'

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

type Props = {
  onVerify: (token?: string) => void
  className?: string
  enableAutoCheck?: boolean
}

export type TurnstileWidgetRef = {
  reset: () => void
}

export const TurnstileWidget = forwardRef<TurnstileWidgetRef, Props>(
  ({ onVerify, className, enableAutoCheck = false, ...props }, ref) => {
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)

    useImperativeHandle(ref, () => ({
      reset() {
        recaptchaRef.current?.reset()
        onVerify(undefined)
      },
    }))

    return (
      <div className={'w-full ' + className}>
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey="6LcQP5UrAAAAAI-Np2csPGUigYvwUCrnu7eVQRwM"
          onChange={(token) => onVerify(token ?? undefined)}
          onExpired={() => {
            recaptchaRef.current?.reset()
            onVerify(undefined)
          }}
          {...props}
        />
      </div>
    )
  }
)
TurnstileWidget.displayName = 'TurnstileWidget'
