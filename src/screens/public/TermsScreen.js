import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { LinearGradient, OZContainer } from '~/ui'

import { colors, typography } from '~/ui/theme'
import { Logo, Close } from '~/ui/icons'
import { SafeAreaView } from 'react-native-safe-area-context'

const TermsScreen = ({ navigation }) => {
    const onSubmit = input => {}

    return (
        <LinearGradient style={styles.background} colors={colors.bgGradient}>
            <SafeAreaView ediges={['top']}>
                <Logo width="186" height="32" />
            </SafeAreaView>
            <View style={styles.container}>
                <View
                    style={{
                        alignItems: 'flex-end',
                        marginTop: 24,
                        marginRight: 24,
                    }}
                >
                    <Close
                        width="24"
                        height="24"
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <OZContainer hideHeader={true} withScroll={true}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>Terms & Conditions</Text>
                        <View style={{ gap: 8 }}>
                            <Text style={styles.subtitle}>
                                1. Acceptance of Terms
                            </Text>
                            <Text style={styles.subtext}>
                                By downloading, accessing, or using [Trading App
                                Name], you agree to comply with and be bound by
                                the following Terms and Conditions. If you do
                                not agree to these terms, please refrain from
                                using the app.
                            </Text>
                        </View>
                        <View style={{ gap: 8 }}>
                            <Text style={styles.subtitle}>2. Eligibility</Text>
                            <Text style={styles.subtext}>
                                You must be at least 18 years old and legally
                                able to enter into contracts to use [Trading App
                                Name]. By using the app, you affirm that you
                                meet these eligibility requirements. If you are
                                accessing [Trading App Name] on behalf of a
                                business or other entity, you represent and
                                warrant that you have the authority to bind that
                                entity to these terms.{' '}
                            </Text>
                        </View>
                        <View style={{ gap: 8 }}>
                            <Text style={styles.subtitle}>2. Eligibility</Text>
                            <Text style={styles.subtext}>
                                You must be at least 18 years old and legally
                                able to enter into contracts to use [Trading App
                                Name]. By using the app, you affirm that you
                                meet these eligibility requirements. If you are
                                accessing [Trading App Name] on behalf of a
                                business or other entity, you represent and
                                warrant that you have the authority to bind that
                                entity to these terms.{' '}
                            </Text>
                        </View>
                        <View style={{ gap: 8 }}>
                            <Text style={styles.subtitle}>2. Eligibility</Text>
                            <Text style={styles.subtext}>
                                You must be at least 18 years old and legally
                                able to enter into contracts to use [Trading App
                                Name]. By using the app, you affirm that you
                                meet these eligibility requirements. If you are
                                accessing [Trading App Name] on behalf of a
                                business or other entity, you represent and
                                warrant that you have the authority to bind that
                                entity to these terms.{' '}
                            </Text>
                        </View>
                    </View>
                </OZContainer>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 68,
        borderRadius: 30,
        paddingBottom: 20,
        backgroundColor: '#222222',
        gap: 10,
    },
    wrapper: {
        gap: 32,
    },
    title: {
        color: colors.white,
        fontWeight: '500',
        fontSize: 24,
        lineHeight: 26.4,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 22.4,
        color: colors.white,
    },
    subtext: {
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19.6,
        color: colors.white,
    },
    background: {
        flex: 1,
        padding: 24,
    },
})

export default TermsScreen