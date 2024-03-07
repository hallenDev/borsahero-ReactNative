import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
} from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import { SafeAreaView } from 'react-native-safe-area-context'

import {
    KeyboardAvoidingView,
    LinearGradient,
    InputField,
    ErrorText,
    OZContainer,
    Button,
} from '~/ui'

import { colors, typography } from '~/ui/theme'
import { Logo } from '~/ui/icons'

const HomeScreen = ({ navigation }) => {

    const form = useForm({
        reValidateMode: 'onSubmit',
    })

    return (
        <FormProvider {...form}>
            <LinearGradient
                style={styles.wrapper}
                colors={colors.bgGradient}
            >
                <KeyboardAvoidingView style={styles.wrapper}>
                    <SafeAreaView ediges={['top']} style={{ padding: 24 }}>
                        <Logo width="186" height="32" />
                    </SafeAreaView>
                    <SafeAreaView
                        ediges={['left', 'right', 'bottom']}
                        style={[styles.wrapper, { paddingTop: 80 }]}
                    >
                        <Text style={styles.title}>Home Page</Text>
                        <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>Sign out</Text>
                    </SafeAreaView>
                </KeyboardAvoidingView>
            </LinearGradient>
        </FormProvider>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    title: {
        fontSize: 40,
        fontWeight: '500',
        color: colors.white,
        textAlign: 'center',
    },
    link: {
        marginTop: 40,
        fontSize: 24,
        fontWeight: '500',
        color: colors.white,
        textAlign: 'center'
    }
})

export default HomeScreen