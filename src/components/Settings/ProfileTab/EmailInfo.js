import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ChangeEmailModal from '~/components/Modals/ChangeEmailModal'
import { useUser } from '~/context/UserContext'
import { Button } from '~/ui'
import { Verified } from '~/ui/icons'
import { colors, text } from '~/ui/theme'

const EmailInfo = () => {
  const { user } = useUser()
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>Email</Text>
          <Verified width={81} height={22} />
        </View>
        <Text style={styles.email}>{user?.email}</Text>
        <Button type="primary" onPress={() => setModalVisible(true)}>
          Change email
        </Button>
      </View>

      <ChangeEmailModal
        modalVisible={modalVisible}
        onCloseModal={() => setModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 24,
    backgroundColor: '#222222',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  email: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
    marginTop: 3,
    marginBottom: 30,
  },
})

export default EmailInfo
