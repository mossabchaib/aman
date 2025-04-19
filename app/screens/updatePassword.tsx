import React, { Component } from 'react'
import UpdatepasswordScreenwrap from '../componentScreen/updatepassword/updatePasswordwrap'
import { LanguageProvider } from '../context/LanguageContext'
export default function updatePassword () {
    return (
       <LanguageProvider>
                 <UpdatepasswordScreenwrap/>
             </LanguageProvider>
    )
}
