import React, { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import { useMutation, useQuery } from 'react-query'
import { useToast } from 'react-native-toast-notifications'
import CreditCardDetails from './PaymentsTab/CreditCardDetails'
import EmptyCard from './PaymentsTab/EmptyCard'
import ViewAllHeader from '~/components//ViewAllHeader'
import {
  getPaymentMethod,
  getStripeAccountLink,
  getPayoutDetails,
} from '~/shared/api/member'
import AddPaymentModal from './PaymentsTab/AddPaymentModal'
import PayoutDetails from './PaymentsTab/PayoutDetails'

const PaymentsTab = ({ checkPayoutDetails }) => {
  const toast = useToast()
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  const { data: cardDetails } = useQuery('payment-details', getPaymentMethod, {
    onError: error => {
      console.log(error)
    },
  })

  const { data: payoutDetails, refetch } = useQuery(
    'payout-details',
    getPayoutDetails,
    {
      onError: error => {
        console.log(error)
      },
    },
  )

  const { mutateAsync, isLoading: isCreatingLink } =
    useMutation(getStripeAccountLink)

  const handlePayout = async () => {
    try {
      const accountLink = await mutateAsync()

      Linking.canOpenURL(accountLink.url).then(supported => {
        if (supported) {
          Linking.openURL(accountLink.url)
        } else {
          console.log("Don't know how to open URI: " + accountLink.url)
        }
      })
    } catch (error) {
      toast.show('', {
        type: 'notification',
        data: { title: error?.data?.msg || error?.message, error: true },
      })
    }
  }

  useEffect(() => {
    if (checkPayoutDetails) {
      refetch()
    }
  }, [checkPayoutDetails])

  return (
    <>
      <ViewAllHeader
        title="Payment details"
        actionTitle={cardDetails ? 'Edit' : ''}
        onPress={() => setShowPaymentModal(true)}
      />
      {cardDetails ? (
        <CreditCardDetails {...cardDetails} />
      ) : (
        <EmptyCard onPress={() => setShowPaymentModal(true)} />
      )}

      <ViewAllHeader
        title="Payout details"
        actionTitle={cardDetails ? 'Edit' : ''}
      />
      {payoutDetails?.details_submitted ? (
        <PayoutDetails {...payoutDetails} />
      ) : (
        <EmptyCard isLoading={isCreatingLink} onPress={handlePayout} />
      )}

      <AddPaymentModal
        modalVisible={showPaymentModal}
        onCloseModal={() => setShowPaymentModal(false)}
      />
    </>
  )
}

export default PaymentsTab
