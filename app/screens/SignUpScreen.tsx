import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SignUpScreenwrap from '../componentScreen/SignUpScreen/SignUpScreenwrap'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function SignInScreen () {
    return (
        <LanguageProvider>
            <SignUpScreenwrap/>
        </LanguageProvider>
     
    )
  }

