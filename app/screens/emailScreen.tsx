import React, { Component } from 'react'
import { Text, View } from 'react-native'
import EmailScreen from '../componentScreen/SinginScreen/email'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function emailScreen () {
    return (
        <LanguageProvider>
            <EmailScreen/>
        </LanguageProvider>
     
    )
  }

