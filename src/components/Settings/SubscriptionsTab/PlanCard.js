import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import ChangeSubscriptionModal from '~/components/Modals/ChangeSubscriptionModal'
import DeleteSubscriptionModal from '~/components/Modals/DeleteSubscriptionModal'
import { colors, text } from '~/ui/theme'
import useDateTime from '~/utils/useDateTime'

const PlanCard = ({ subscription, products = [] }) => {
  const { getSubscriptionDate } = useDateTime()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [changeModalVisible, setChangeModalVisible] = useState(false)

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>{subscription?.product?.title}</Text>
        {subscription?.ended_at &&
          (subscription?.is_cancelled ? (
            <Text style={styles.description}>
              Expire on{' '}
              {getSubscriptionDate(Number(subscription?.ended_at * 1000))}
            </Text>
          ) : (
            <Text style={styles.description}>
              Next invoice on{' '}
              {getSubscriptionDate(Number(subscription?.ended_at * 1000))}
            </Text>
          ))}

        <Text style={styles.description}>
          Billing {subscription?.product?.title?.toLowerCase()}
        </Text>

        <View style={styles.actions}>
          {!subscription?.is_cancelled && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setDeleteModalVisible(true)}
            >
              <Text style={styles.btnText}>Cancel</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.btn, styles.primary]}
            onPress={() => setChangeModalVisible(true)}
          >
            <Text style={styles.btnText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>
            {subscription?.status?.includes('incomplete')
              ? 'Pending'
              : 'Active'}
          </Text>
        </View>
      </View>

      <DeleteSubscriptionModal
        modalVisible={deleteModalVisible}
        onCloseModal={() => setDeleteModalVisible(false)}
      />

      <ChangeSubscriptionModal
        modalVisible={changeModalVisible}
        subscription={subscription}
        products={products}
        onCloseModal={() => setChangeModalVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#222222',
    borderRadius: 20,
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontFamily: text.medium.fontFamily,
    fontSize: 24,
    color: colors.white,
  },
  description: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 3,
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  btn: {
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 7,
  },
  primary: {
    backgroundColor: '#6E3AFF',
  },
  btnText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 14,
    color: colors.white,
  },
  status: {
    position: 'absolute',
    right: 20,
    top: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: 'rgba(133, 255, 58, 0.1)',
    borderRadius: 20,
  },
  statusText: {
    fontFamily: text.regular.fontFamily,
    fontSize: 15,
    color: '#85FF3A',
  },
})

export default PlanCard
