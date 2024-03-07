import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DeleteAccountModal from '~/components/Modals/DeleteAccountModal'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'

const AccountDelete = () => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Account</Text>
        <Button type="warning" onPress={() => setModalVisible(true)}>
          Delete account
        </Button>
      </View>

      <DeleteAccountModal
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
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
    marginBottom: 30,
  },
})

export default AccountDelete
