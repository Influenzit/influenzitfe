import { useRouter } from 'next/router'
import React from 'react'
import LandingLayout from '../../layouts/Landing.layout'

const BusinessProfile = () => {
   const router = useRouter()
   const {id} = router.query
  return (
    <div>{id}</div>
  )
}
BusinessProfile.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default BusinessProfile