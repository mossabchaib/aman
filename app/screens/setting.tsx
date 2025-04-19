import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { LanguageProvider } from '../context/LanguageContext'
import SettingsScreen from '../componentScreen/setting/settingscreenwrap'

export default function setting () {
    return (
       <LanguageProvider>
                 <SettingsScreen/>
             </LanguageProvider>
    )
}
