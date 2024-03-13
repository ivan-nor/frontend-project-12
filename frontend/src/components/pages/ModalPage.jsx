/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { editChannel } from '../../slices/channelsSlice'
import ModalComponent from '../ui/ModalComponent'

const ModalPage = ({ channel, isShow }) => {
  const [value, setValue] = useState(channel.name)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(editChannel(value))
    setValue('')
  }

  return (
    <ModalComponent isShow={isShow} handleChange={(e) => setValue(e.target.value)} handleSubmit={handleSubmit} />
  )
}

export default ModalPage
