import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ProfileScreenwrap from '../componentScreen/ProfileScreen/ProfileScreenwrap'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function ProfileScreen () {
    return (
        <LanguageProvider>
            <ProfileScreenwrap/>
        </LanguageProvider>
     
    )
  }

