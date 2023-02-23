import React from 'react'
import LandingLayout from '../layouts/landing.layout'
import { Container } from '../styles/terms.style'

const Terms = () => {
  return (
    <Container>
        <iframe src="https://app.termly.io/document/terms-of-use-for-saas/fa33fbab-b5d2-4479-8aaf-3d8c6e1e1da3"></iframe>
    </Container>
  )
}
Terms.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Terms;
