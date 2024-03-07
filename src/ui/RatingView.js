import { useEffect } from 'react'
import { Rating } from 'react-native-ratings'
import { useFormContext, Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'

const RatingView = ({ name, defaultValue = 0, ...props }) => {
  const form = useFormContext()

  useEffect(() => {
    form.setValue(name, defaultValue)
  }, [])

  return (
    <Controller
      name={name}
      render={({ field: { onChange } }) => (
        <Rating
          {...props}
          type="custom"
          ratingCount={5}
          imageSize={20}
          tintColor="#141414"
          style={styles.rating}
          ratingColor="#946EFF"
          startingValue={0}
          onFinishRating={rate => {
            onChange(rate)
            if (form.formState.errors[name]?.message) {
              form.trigger(name)
            }
          }}
        />
      )}
    />
  )
}

const styles = StyleSheet.create({
  rating: {
    alignItems: 'flex-start',
  },
})

export default RatingView
