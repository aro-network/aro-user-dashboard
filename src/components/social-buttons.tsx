import React from 'react'
import { FaTelegramPlane } from 'react-icons/fa';
import { FaDiscord, FaXTwitter } from 'react-icons/fa6'

const socialLinks = [
    { href: 'https://x.com/AroNetwork', icon: <FaXTwitter /> },
    { href: 'https://discord.gg/Rc4BMUjbNB', icon: <FaDiscord /> },
    { href: 'https://t.me/ARO_Network', icon: <FaTelegramPlane /> },
]

export function SocialButtons() {

    return <div className="flex items-center gap-5 flex-row  lg:flex-row ">
        {
            socialLinks.map((item) => {
                return <a
                    key={item.href}
                    className="border text-lg items-center justify-center flex hover:text-[#00E42A] hover:border-[#00E42A]  w-8 h-8 mo:h-6 border-white rounded-full "
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                >
                    {item.icon}
                </a>
            })
        }
    </div>
}