import { useMutation, useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProject } from '../../../api/projects'
import { getUserType, setError, setLoading } from '../../../app/reducers/status'
import { getUser } from '../../../app/reducers/user'
import { AlertTriangleIcon, CheckCircleIcon, CheckIcon, XSquareIcon } from '../../../assets/svgIcons'
import { UserDropdown } from '../../../components/nav/style'
import LandingLayout from '../../../layouts/landing.layout'
import { AddSocialBtn, InputContainer } from '../../../styles/profile.style'
import { Bottom, Container, ControlContainer, CurrentPackage, Desc, Details, DetailsContainer, FormContainer, ImageWrapper, MDetails, MDone, Milestone, MilestoneHeader, MilestoneList, Milestones, MStatus, OuterContainer, SubDetails, Top, TopBtn, UpdateModal, Wrapper } from '../../../styles/view.style'
import { toast } from 'react-toastify';
import { getWalletTransaction, releaseFund } from '../../../api/wallet'

const ProjectView = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch();
  const [walletDetails, setWalletDetails] = useState({});
  const user = useSelector(getUser);
  const accountType = useSelector(getUserType);
  const [showUpdate, setShowUpdate] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [disputeMessage, setDisputeMessage] = useState("");

  const { data, refetch } = useQuery(["get-single-transaction"], async () => {
        return await getWalletTransaction(id);
    }, {
        enabled: false,
        staleTime: Infinity,
        retry: false,
        onSuccess(res) {
            dispatch(setLoading(false));
            setWalletDetails(res.data.data)
        },
        onError(res) {
            dispatch(setLoading(false));
        } 
    });
    const releaseFundMutation = useMutation((data) => {
        return releaseFund(data);
    }, {
        onSuccess(successRes) {
            const res = successRes.data;
            if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
                dispatch(setLoading(false));
                dispatch(setError({error: true, message: res.message}));
            } else {
                dispatch(setLoading(false));
                toast.success("Funds released successfully", {
                    position: toast.POSITION.TOP_RIGHT
                });
            }
        },
        onError(error) {
            dispatch(setLoading(false));
            const res = error.response.data;
            if(res){
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT
                });
                return;
            }
            dispatch(setError({error: true, message: "An error occured"}));
        }
    });
    const handleReleaseFunds = () => {
        dispatch(setLoading(true));
        releaseFundMutation.mutate({
            txnref: walletDetails?.txnref,
            escrow_id: id
        })
    }
    useEffect(() => {
    if(id){
        refetch();
    }
    }, [id])
  return (
    <OuterContainer>
      <Wrapper>
        <Container>
        <Top>
            <TopBtn onClick={() => router.push("/dashboard/profile/wallet")}>
              <Image src="/arrow-left.svg" height={24} width={24}/>
              <span>Wallet</span>
            </TopBtn>
            {/* <div id="drop-cont" onClick={() => setShow(!show)}>
              <TopBtn>
               <Image src="/more-vertical.svg" height={24} width={24}/>
              </TopBtn>
              {
                show && (
                  <UserDropdown style={{ right: "0", width: "200px" }}>
                    <button onClick={() => router.push("/dashboard/projects/completed")}><CheckCircleIcon /><span>Mark as Completed</span></button>
                    <button onClick={() => router.push("/dashboard/projects/cancel")}><XSquareIcon /><span>Cancel Project</span></button>
                    <button onClick={() => {}}><AlertTriangleIcon /><span>Report Account</span></button>
                  </UserDropdown>
                )
              }
            </div> */}
          </Top>
          <Bottom>
            <DetailsContainer>
              <Details>
                <h2>{walletDetails?.remark}</h2>
                <Desc>
                    {walletDetails?.currency} {walletDetails?.amount}
                    <br />
                    ({walletDetails?.status})
                    <br />
                    Transaction ID: {walletDetails?.txnref}
                </Desc>
              </Details>
            </DetailsContainer>
            {(walletDetails?.status ===  "Pending") && (
                <ControlContainer style={{ marginTop: "15px" }}>
                    <button></button>
                    <button onClick={handleReleaseFunds}>Release Fund</button>
                </ControlContainer>
            )}
          </Bottom>
        </Container>
      </Wrapper>
    </OuterContainer>
  )
}
ProjectView.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default ProjectView