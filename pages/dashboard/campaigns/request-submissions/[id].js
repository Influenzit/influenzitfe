import React, { useEffect, useState } from 'react'
import LandingLayout from '../../../../layouts/landing.layout'
import { CampaignList, Container, Heading, RequestCard } from '../../../../styles/campaign.style'
import { useRouter } from 'next/router'
import ProfileCard from '../../../../components/profile-card'
import { getCampaignRequestSubmissions } from '../../../../api/campaigns'
import { useQuery } from '@tanstack/react-query'

const Requests = () => {
    const router = useRouter();
    const [getUrl, setGetUrl] = useState("");
    const [status, setStatus] = useState("");
    const {id} = router.query;
    const [requestList, setRequestList] = useState({
      data: [],
    });
    const { data, refetch } = useQuery(["get-requests-submission"], async () => {
      return await getCampaignRequestSubmissions(id, `${getUrl}?status=${status}`);
      }, {
          enabled: false,
          staleTime: Infinity,
          retry: false,
          onSuccess(res) {
              setRequestList(res.data.data);
          }
      });
    useEffect(() => {
        if(id) {
            refetch();
        }
    }, [id])
  return (
    <Container>
        <Heading>
            <h2>Influencer Submissions</h2>
        </Heading>
        <CampaignList>
            {
                requestList.data.map((req, i) => (
                    <ProfileCard
                        profileLink={`/influencers/${req.user_id}`}
                        imgSrc={req.user.profile_pic}
                        handle={'me'}
                        name={`${req.currency} ${req.amount}`}
                        sex={"Male"}
                        rating={5}
                        key={i}
                        skills={req.user.name}
                        address={"Yaba"}
                    />
                ))
            }
        </CampaignList>
    </Container>
  )
}

Requests.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Requests