import Link from 'next/link'
import React from 'react'
import { Container, Wrapper } from './style'

const DashboardFooter = () => {
  return (
    <Container>
        <Wrapper>
            <div>
                <p>&copy; 2022 Influenzit. All Rights Reserved.</p>
            </div>
            <div>
                <Link href="/">
                    <a>Terms &amp; Conditions</a>
                </Link>
                <Link href="/">
                    <a>Privacy Policy</a>
                </Link>
            </div>
        </Wrapper>
    </Container>
  )
}

export default DashboardFooter