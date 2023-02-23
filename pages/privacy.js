import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { Container } from '../styles/terms.style'

const Privacy = () => {
  return (
    <div>
        <Container>
            <iframe src="https://app.termly.io/document/privacy-policy/87b52fe0-96de-491b-ab52-b6e84f4a67b6"></iframe>
        </Container>
    </div>
  )
}
Privacy.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)
export default Privacy