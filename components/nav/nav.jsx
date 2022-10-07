import React from 'react'
import { Container, Controls, GetStartedBtn, LoginBtn, Logo, NavLinks, Right, SearchBtn, Wrapper } from './style'

import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  return (
    <Container>
        <Wrapper>
            <Logo href="/">
                <Image src="/influenzit.svg" alt="logo" height={30} width={120} style={{cursor: "pointer"}}/>
            </Logo>
            <Right>
                <NavLinks>
                    <Link href="/">Home</Link>
                    <Link href="/creators">Creators</Link>
                    <Link href="/business-owner">Business Owner</Link>
                    <Link href="/pricing">Pricing</Link>
                </NavLinks>
                <Controls>
                    <SearchBtn>
                        <Image src="/search-b.svg" alt="" height={25} width={25}/>
                    </SearchBtn>
                    <Link href="/login" passHref>
                        <LoginBtn>Login</LoginBtn>
                    </Link>
                    <Link href="/register/account-type" passHref>
                        <GetStartedBtn>Get Started</GetStartedBtn>
                    </Link>
                </Controls>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Nav