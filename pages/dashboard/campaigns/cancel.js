import Image from 'next/image'
import React, { useState } from 'react'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, ControlContainer, Details, StarsContainer, Textarea, Top } from '../../../styles/completed.style'
import cancelIcon from '../../../assets/cancel.svg'
import { OuterContainer, Wrapper } from '../../../styles/view.style'
import { InputContainer, InputFlex } from '../../../styles/profile.style'
import { useRouter } from 'next/router'

const CampaignCancel = () => {
  const router = useRouter();
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
            <Top>
                <Image src={cancelIcon} height={120} width={120} />
                <Details>
                    <h2>Cancel Campaign?</h2>
                    <p>Thanks for confirming the completion of this campaign. The campaign status has been updated and payment made to the respective influencer account. Kindlygive a review on the campaign to help others decide better.</p>
                </Details>
            </Top>
            <InputFlex>
                <InputContainer>
                    <label>Category</label>
                    <select>
                        <option>test</option>
                    </select>
                </InputContainer>
                <InputContainer>
                    <label>Category</label>
                    <select>
                        <option>test</option>
                    </select>
                </InputContainer>
            </InputFlex>
            <Textarea
                placeholder='Additional message'
            ></Textarea>
            <ControlContainer>
                <button>Submit Request</button>
                <button onClick={() => router.push("/dashboard/campaigns/view")}>Cancel & Go back</button>
            </ControlContainer>
        </Container>
      </Wrapper>
    </OuterContainer>
  )
}
CampaignCancel.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CampaignCancel