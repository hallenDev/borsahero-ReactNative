import React, { useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from '~/ui'
import { colors, text } from '~/ui/theme'
import { Close } from '~/ui/icons'
import noop from '~/utils/noop'
import { updateSubscription } from '~/shared/api/member'

const ChangeSubscriptionModal = ({
  modalVisible,
  subscription,
  products = [],
  onCloseModal = noop,
}) => {
  const queryClient = useQueryClient()
  const [productId, setProductId] = useState('')
  const { mutate, isLoading } = useMutation(updateSubscription, {
    onSuccess: subscription => {
      queryClient.setQueryData('subscription', old => ({
        ...old,
        subscription,
      }))
      onCloseModal()
    },
    onError: error => {
      console.log(error)
    },
  })

  const handleSubscribe = _productId => {
    setProductId(_productId)
    mutate({ product_id: _productId })
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Change subscription</Text>
            <Text style={styles.description}>
              Your subscription will remain active until the next invoice date.
              After that, it will become inactive and new one wil start.
            </Text>

            {products.map(product =>
              subscription?.product?.id === product.id ? null : (
                <View style={styles.card} key={product.id}>
                  <Text style={styles.cardTitle}>{product.title}</Text>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardPrice}>${product.price}</Text>
                    <Text style={styles.cardText}>{product.per_text}</Text>
                  </View>
                  <Button
                    type="primary"
                    loading={isLoading && productId === product.id}
                    isDisabled={isLoading && productId !== product.id}
                    onPress={() => handleSubscribe(product.id)}
                  >
                    Subscribe
                  </Button>
                </View>
              ),
            )}
          </View>

          <TouchableOpacity style={styles.closeBtn} onPress={onCloseModal}>
            <Close width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 10,
    paddingHorizontal: 20,
  },
  container: {
    width: '100%',
    backgroundColor: '#141414',
    padding: 25,
    borderRadius: 30,
    gap: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingBottom: 0,
  },
  title: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 3,
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    position: 'absolute',
    right: 20,
    top: 20,
  },
  card: {
    backgroundColor: '#222222',
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
  },
  cardTitle: {
    fontFamily: text.semiBold.fontFamily,
    fontSize: 16,
    color: colors.white,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 15,
    marginBottom: 10,
  },
  cardPrice: {
    fontFamily: text.medium.fontFamily,
    fontSize: 40,
    color: colors.white,
  },
  cardText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
    marginLeft: 3,
  },
})

export default ChangeSubscriptionModal
