import React from 'react'
import { useColorScheme } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

const NavigationProvider = ({ children }) => {
    const scheme = useColorScheme()

    const theme = 
        scheme === 'dark'
            ? require('~/configs/darkSchema').default
            : require('~/configs/lightSchema').default
            
    return (
        <NavigationContainer theme={theme}>
            {children}
        </NavigationContainer>
    )
}

export default NavigationProvider