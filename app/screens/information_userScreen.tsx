import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Information_userScreen from '../componentScreen/SinginScreen/information_userScreen.tsx'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function informationUserScreen () {
    return (
        <LanguageProvider>
            <Information_userScreen/>
        </LanguageProvider>
     
    )
  }

