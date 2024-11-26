import React from 'react'
import { Bottom, BottomLinks, Container, Wrapper } from './style'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <Container>
        <Wrapper>
            <Bottom>
                <p>&copy; 2024. Influenzit. All rights reserved.</p>
                <BottomLinks>
                    <Link href="/">
                        <a>
                            <Image src="/facebook.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <Image src="/twitter.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                    <Link href="/">
                        <a>
                            <Image src="/instagram.svg" alt="" height={20} width={20} />
                        </a>
                    </Link>
                </BottomLinks>
            </Bottom>
        </Wrapper>
    </Container>
  )
}

export default Footer