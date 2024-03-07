import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { Modal } from 'react-native'
import Toast from 'react-native-toast-notifications'
import Notification from '~/components/Notification'
import noop from '~/utils/noop'

const ModalComponent = ({ children, visible, onRequestClose = noop }, ref) => {
  const toastRef = useRef()

  useImperativeHandle(ref, () => ({
    showToast: message =>
      toastRef.current?.show('', {
        type: 'notification',
        data: { title: message, error: true },
      }),
  }))

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
    >
      {children}
      <Toast
        ref={toastRef}
        placement="bottom"
        offsetBottom={85}
        renderType={{
          notification: toast => <Notification data={toast.data} />,
        }}
      />
    </Modal>
  )
}

export default forwardRef(ModalComponent)
