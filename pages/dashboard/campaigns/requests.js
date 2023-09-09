import React, { useEffect, useState } from 'react'
import LandingLayout from '../../../layouts/landing.layout'
import Image from 'next/image'
import CampaignCard from '../../../components/campaign-card/campaign-card'
import addImg from '../../../assets/addservice.svg'
import { CampaignList, Container, Heading, RequestCard } from '../../../styles/campaign.style'
import { useRouter } from 'next/router'
import { getCampaignRequests } from 'api/campaigns'
import { useQuery } from '@tanstack/react-query'

const Requests = () => {
  const router = useRouter();
  const [getUrl, setGetUrl] = useState("");
  const [status, setStatus] = useState("");
  const [requestList, setRequestList] = useState({
    data: [],
  });
  const { data, refetch } = useQuery(["get-campaigin-requests"], async () => {
    return await getCampaignRequests(`${getUrl}?status=${status}`);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            setRequestList(res.data.data);
        }
    });
  useEffect(() => {
    refetch();
  }, [status])
  
  return (
    <Container>
        <Heading>
            <h2>Campaign Requests</h2>
            <button>
                <Image src="/filter-lines.svg" alt="" height={20} width={20}/>
                <select val={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">All</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Pause">Pause</option>
                    <option value="Open">Open</option>
                    <option value="Ongoing">Ongoing</option>
                </select>
            </button>
        </Heading>
        <CampaignList>
            <RequestCard onClick={() => router.push("/dashboard/create-request")}>
                <Image src={addImg} alt="" height={80} width={80}/>
                <p>Create campaign request</p>
            </RequestCard>
            {
                requestList.data.map((req, i) => (
                    <CampaignCard
                        content={req.title}
                        price={`${req?.amount_start} - ${req?.amount_end}`}
                        status={req.status}
                        imgSrc={req.media[0]?.url ?? "/camp.png"}
                        reqId={req.id}
                        refetch={refetch}
                        key={i}
                        reqPlatform={JSON.parse(req.requirements.filter((val) => val.name === "platforms")[0]?.value ?? "[]")}
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