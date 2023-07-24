import { useRouter } from 'next/router'
import React from 'react'
import { Container, Wrapper } from '../../styles/ebooks.style';
import LandingLayout from '../../layouts/landing.layout';

const Guide = () => {
  const router = useRouter();
  const { id } = router.query;
  const IframeLink = {
    "1": "https://docs.google.com/document/d/e/2PACX-1vQRon68zw2JSQGxZ6Z-A30Msz_fDsnIlo-S0QUS5LhffSrtwVyA--Rj3_PklCX9X9HUyNS6Uo2xKEC4/pub?embedded=true",
    "2": "https://docs.google.com/document/d/e/2PACX-1vQQ9AhPFelvUAaNerbB0YD2bWlznJ7OlIRGs2C1fTz7EHYRFR3q9dl5b55bea_Iip12DPd-APFrAT99/pub?embedded=true",
    "3": "https://docs.google.com/document/d/e/2PACX-1vQv3NzJi525GaQhPbFhTOtku_fbiAhJCCJamAgc53rTRpU-445QURE4mtY3bAqaxs0ivVjdi9szq0vG/pub?embedded=true",
    "4": "https://docs.google.com/document/d/e/2PACX-1vTY7dra7omKck0AGesCbjLpTDLTUGWQlzq9E4uvom3l1rDNeFvssxoYRCGmiZtZRTQc_z8-dFXjTpKP/pub?embedded=true",
    "5": "https://docs.google.com/document/d/e/2PACX-1vQ53pvDcX4hv53IHPW8qwY_AE0jayfzlpTqNIepTFKlWrDrGZwBwAg4Omvoy2KIZ_qmjzKaiBfwsZTk/pub?embedded=true"
  }
  return (
    <Container>
        <Wrapper>
            <iframe src={IframeLink[id] ?? ""}></iframe>
        </Wrapper>
    </Container>
  )
}

Guide.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Guide