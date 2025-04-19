import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { LanguageProvider } from '@/app/context/LanguageContext'
import NotificationsScreen from '../componentScreen/Notification/NotificationScreenwrap'
export default function Notifications () {
    return (
        <LanguageProvider>
            <NotificationsScreen/>
        </LanguageProvider>
     
    )
  }

