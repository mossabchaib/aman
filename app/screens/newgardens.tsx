import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Newgardenswrap from '../componentScreen/newgardens/newgardenswrap'
import { LanguageProvider } from '../context/LanguageContext'

export default function newgardens () {
    return (
        <LanguageProvider>
            <Newgardenswrap 
            />
        </LanguageProvider>
     
    )
  }

