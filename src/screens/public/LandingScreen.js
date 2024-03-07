import React from 'react'
import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '~/ui'

import { colors, typography } from '~/ui/theme'
import { Logo } from '~/ui/icons'
import splash from '~/assets/images/splash.png'

const LandingScreen = ({ navigation }) => (
  <ImageBackground source={splash} style={styles.container}>
    <SafeAreaView style={styles.wrapper}>
      <Logo width="186" height="32" style={styles.logo} />
      <View style={styles.contents}>
        <Text style={styles.title}>
          Trade, earn{`\n`}money, follow{`\n`}popular{`\n`}streamers
        </Text>
        <Text style={styles.desc}>
          Join a community where knowledge is{`\n`}shared, strategies are
          refined, and success{`\n`}stories inspire.
        </Text>

        <Button
          type="primary"
          style={styles.button}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Get started
        </Button>
      </View>
    </SafeAreaView>
  </ImageBackground>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  logo: {
    marginTop: 50,
    alignSelf: 'center',
  },
  contents: {
    paddingHorizontal: 30,
  },
  title: {
    ...typography.h1,
    fontSize: 40,
    lineHeight: 40,
    color: colors.text_primary,
  },
  desc: {
    ...typography.p2,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 10,
  },
  button: {
    marginTop: 30,
    color: colors.text_primary,
    marginBottom: 25,
  },
})

export default LandingScreen
