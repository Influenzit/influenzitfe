import React from 'react'
import { Container, LoaderCard } from './style'
import loadingSVG from '../../assets/loader.svg'

const Loader = () => {
  return (
    <Container>
        <LoaderCard>
            <object wmode='transparent' type="image/svg+xml" data={loadingSVG.src}></object>
            <p>LOADING</p>
        </LoaderCard>
    </Container>
  )
}

export default Loader