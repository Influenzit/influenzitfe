import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Container } from './style'

const Notify = ({ imgSrc, header, body, linkDisplay, link }) => {
  return (
    <Container>
        <Image src={imgSrc} alt="" height={150} width={150} />
        <h2>{header}</h2>
        {body}
        <Link href={link}>{linkDisplay}</Link>
    </Container>
  )
}

export default Notify