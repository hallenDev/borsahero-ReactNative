import { View } from 'react-native'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getSubsciption, subscribePlan } from '~/shared/api/member'
import PricingCard from './SubscriptionsTab/PricingCard'
import PlanCard from './SubscriptionsTab/PlanCard'
import { useState } from 'react'

const SubscriptionsTab = () => {
  const queryClient = useQueryClient()
  const [productId, setProductId] = useState()

  const { data } = useQuery('subscription', getSubsciption, {
    onError: error => {
      console.log(error)
    },
  })

  const { mutate, isLoading } = useMutation(subscribePlan, {
    onSuccess: subscription => {
      queryClient.setQueryData('subscription', old => ({
        ...old,
        subscription,
      }))
    },
    onError: error => {
      console.log(ErrorUtils)
    },
  })

  const { products = [], subscription } = data || {}

  return (
    <View>
      {subscription ? (
        <PlanCard subscription={subscription} products={products} />
      ) : (
        products.map(product => (
          <PricingCard
            key={product.id}
            {...product}
            isLoading={isLoading && productId === product.id}
            isDisabled={isLoading && productId !== product.id}
            onSubscribe={() => {
              setProductId(product.id)
              mutate({ product_id: product.id })
            }}
          />
        ))
      )}
    </View>
  )
}

export default SubscriptionsTab
