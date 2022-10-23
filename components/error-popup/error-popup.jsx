import React from 'react'
import { Container, LoaderCard } from './style'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setError } from '../../app/reducers/status'

const ErrorPopup = ({message}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(setError({error: false, message: ""}))
  }
  return (
    <Container>
        <LoaderCard>
            <Image src="/fail.svg" height={70} width={70} />
            <p>{message}</p>
            <button onClick={handleClose}>Close</button>
        </LoaderCard>
    </Container>
  )
}

export default ErrorPopup;