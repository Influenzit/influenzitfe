import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../../../layouts/admin.layout'
import Image from 'next/image'
import CampaignCard from '../../../../../components/campaign-card/campaign-card'
import addImg from '../../../../../assets/addservice.svg'
import { CampaignList, Container, Heading, RequestCard } from '../../../../../styles/campaign.style'
import { useRouter } from 'next/router'
import { getCampaignRequests } from 'api/campaigns'
import { useQuery } from '@tanstack/react-query'
import { getAdminCampaignRequests } from '../../../../../api/admin'

const Requests = () => {
  const router = useRouter();
  const [getUrl, setGetUrl] = useState("");
  const [status, setStatus] = useState("");
  const [requestList, setRequestList] = useState({
    data: [],
  });
  const { data, refetch } = useQuery(["get-campaigin-requests"], async () => {
    return await getAdminCampaignRequests(`${getUrl}?status=${status}`);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            setRequestList(res.data.data);
        }
    });
    const getRequirement = (req, name) => {
        return JSON.parse(req?.requirements.filter((val) => val.name === name)[0]?.value ?? "[]");
    }
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
            {
                requestList.data.map((req, i) => (
                    <CampaignCard
                        content={req.title}
                        price={`₦${req?.amount_start} - ₦${req?.amount_end}`}
                        status={req.status}
                        imgSrc={req.media[0]?.url ?? "/camp.png"}
                        reqId={req.id}
                        refetch={refetch}
                        followers={`${getRequirement(req, "followers")[0] ?? ""} - ${getRequirement(req, "followers")[1] ?? ""}`}
                        engagements={`${getRequirement(req, "engagement_rate")[0] ?? ""}% - ${getRequirement(req, "engagement_rate")[1] ?? ""}%`}
                        key={i}
                        isAdmin={true}
                        reqPlatform={JSON.parse(req.requirements.filter((val) => val.name === "platforms")[0]?.value ?? "[]")}
                    />
                ))
            }
        </CampaignList>
    </Container>
  )
}

Requests.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
)

export default Requests