import React from 'react'
import Password from '../componentScreen/SinginScreen/password'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function PasswordauthScreeen () {
    return (
        <LanguageProvider>
            <Password/>
        </LanguageProvider>
     
    )
  }

