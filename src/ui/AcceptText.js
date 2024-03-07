import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { colors } from '~/ui/theme'
import { Accept } from '~/ui/icons'

const AcceptText = ({ text }) => {
    return (
        <View style={styles.wrapper}>
            <Accept width="16" height="16" />
            <Text style={styles.success}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        gap: 2,
    },
    success: {
        color: colors.text_success,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 16,
    },
})

export default AcceptText
