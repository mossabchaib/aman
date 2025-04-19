import React from 'react'
import DashboardScreen from '../componentScreen/Dashboard/dashboardScreenwrap'
import { LanguageProvider } from '@/app/context/LanguageContext'

export default function index () {
    return (
        <LanguageProvider>
            <DashboardScreen/>
        </LanguageProvider>
    )
  }

