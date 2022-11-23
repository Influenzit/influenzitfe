import Image from 'next/image'
import React, { useState } from 'react'
import LandingLayout from '../../../layouts/landing.layout'
import { Container, ControlContainer, Details, StarsContainer, Textarea, Top } from '../../../styles/completed.style'
import completeIcon from '../../../assets/complete.svg'
import starIcon from '../../../assets/star.svg'
import fillStarIcon from '../../../assets/fill-star.svg'
import { OuterContainer, Wrapper } from '../../../styles/view.style'

const CampaignCompleted = () => {
  const [inContainer, setInContainer] = useState(false);
  const [currentOver, setCurrentOver] = useState(0);
  const [currentStar, setCurrentStar] = useState(0);
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
            <Top>
                <Image src={completeIcon} height={120} width={120} />
                <Details>
                    <h2>Marked as Completed</h2>
                    <p>Thanks for confirming the completion of this campaign. The campain status has been updated and payment made to the respective influencer account. Kindlygive a review on the campaign to help others decide better.</p>
                </Details>
            </Top>
            <StarsContainer onMouseOver={() => setInContainer(true)} onMouseOut={() => {setInContainer(false); setCurrentOver(currentStar)}}>
                <button onClick={() => setCurrentStar(1)} onMouseOver={() => setCurrentOver(1)}>
                    {
                        (inContainer && ((currentOver === 1)||(currentOver > 1))) || (!inContainer && ((currentStar === 1)||(currentStar > 1))) ?
                        <Image src={fillStarIcon} height={40} width={40} />: <Image src={starIcon} height={40} width={40} />
                    }
                </button>
                <button onClick={() => setCurrentStar(2)} onMouseOver={() => setCurrentOver(2)}>
                    {
                        (inContainer && ((currentOver === 2)||(currentOver > 2))) || (!inContainer && ((currentStar === 2)||(currentStar > 2))) ?
                        <Image src={fillStarIcon} height={40} width={40} />: <Image src={starIcon} height={40} width={40} />
                    }
                </button>
                <button onClick={() => setCurrentStar(3)} onMouseOver={() => setCurrentOver(3)}>
                    {
                        (inContainer && ((currentOver === 3)||(currentOver > 3))) || (!inContainer && ((currentStar === 3)||(currentStar > 3)))?
                        <Image src={fillStarIcon} height={40} width={40} />: <Image src={starIcon} height={40} width={40} />
                    }
                </button>
                <button onClick={() => setCurrentStar(4)} onMouseOver={() => setCurrentOver(4)}>
                    {
                        (inContainer && ((currentOver === 4)||(currentOver > 4))) || (!inContainer && ((currentStar === 4)||(currentStar > 4))) ?
                        <Image src={fillStarIcon} height={40} width={40} />: <Image src={starIcon} height={40} width={40} />
                    }
                </button>
                <button onClick={() => setCurrentStar(5)} onMouseOver={() => setCurrentOver(5)}>
                    {
                        (inContainer && currentOver === 5) || (!inContainer && currentStar === 5) ?
                        <Image src={fillStarIcon} height={40} width={40} />: <Image src={starIcon} height={40} width={40} />
                    }
                </button>
            </StarsContainer>
            <Textarea></Textarea>
            <ControlContainer>
                <button>Skip Review & Confirm</button>
                <button>Submit Review</button>
            </ControlContainer>
        </Container>
      </Wrapper>
    </OuterContainer>
  )
}
CampaignCompleted.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default CampaignCompleted