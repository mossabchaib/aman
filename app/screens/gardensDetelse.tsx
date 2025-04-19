import React, { Component } from 'react'
import { Text, View } from 'react-native'
import GardensDetelseWrap from '../componentScreen/gardensDetelse/gardensDetelsewrap'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function gardensDetelse () {
    return (
        <LanguageProvider>
            <GardensDetelseWrap/>
        </LanguageProvider>
     
    )
  }

