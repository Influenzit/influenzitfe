import React from 'react'
import { Container, LoaderCard } from './style'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setSuccess } from '../../app/reducers/status'

const SuccessPopup = ({message}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setSuccess({success: false, message: ""}))
  }
  return (
    <Container>
        <LoaderCard>
            <Image src="/success.svg" height={70} width={70} />
            <p>{message}</p>
            <button onClick={handleClose}>Close</button>
        </LoaderCard>
    </Container>
  )
}

export default SuccessPopup;