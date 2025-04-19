import React, { Component } from 'react'
import { Text, View } from 'react-native'
import OboardingScreenWrap from '../componentScreen/OboardingScreen/OboardingScreen'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function OnboardingScreen () {
    return (
        <LanguageProvider>
            <OboardingScreenWrap/>
        </LanguageProvider>
     
    )
  }

