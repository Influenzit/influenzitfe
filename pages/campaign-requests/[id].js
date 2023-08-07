import React, { useEffect } from 'react'
import LandingLayout from '../../layouts/landing.layout'
import Image from 'next/image'
import chevLeftIcon from "../../assets/chev-left.svg";
import chevRightIcon from "../../assets/chev-right.svg";
import { Container } from '../../styles/campaign.style'
import { ContainerB, ContinueBtn, CtrlBtn, Deliverables, Desc, ImageSlides, Images, Left, RCard, RWrapper, Section, Wrapper,  } from '../../styles/service.style'
import { useRouter } from 'next/router'
import Slider from 'react-slick'
import { Right } from '../../styles/service.style'
import { createProposal, getSingleCampaignRequest } from '../../api/campaigns'
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getCampaignRequest } from '../../api/influencer';
import { ShareContainer, UpdateModal } from 'styles/view.style';
import { useSelector } from 'react-redux';
import { getUserType } from 'app/reducers/status';
import { getUser } from 'app/reducers/user';
import { toast } from 'react-toastify';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <CtrlBtn onClick={onClick} className={className}>
        <Image src={chevRightIcon} alt="chev-left" height={20} width={15} />
      </CtrlBtn>
    );
  }
  
function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <CtrlBtn onClick={onClick} className={className}>
            <Image src={chevLeftIcon} alt="chev-left" height={20} width={15} />
        </CtrlBtn>
    );
}

const Requests = () => {
  const router = useRouter();
  const { id } = router.query;
  const [request, setRequest] = useState();
  const user = useSelector(getUser);
  const accountType = useSelector(getUserType);
  const [showPopup, setShowPopup] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitRequest = () => {
    if (!!user) {
        if (accountType === "Influencer") {
          if (request?.user_id !== user.id) {
           setShowPopup(true);
          } else {
            toast.error("You can't submit to your own campaign request", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } else {
          toast.error("Only influecers can submit a Proposal", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("Please login to submit a Proposal", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
  }
  const createProposalMutation = useMutation(proposalData => {
    return createProposal(proposalData, id);
}, {
    onSuccess(successRes) {
        const res = successRes.data;
        if (res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setError({ error: true, message: res.message }));
        } else {
            setLoading(false);
            setShowPopup(false);
            toast.success("Proposal Submitted", {
                position: toast.POSITION.TOP_RIGHT
            });
            setShowDispute(false);
        }
    },
    onError(error) {
        const res = error.response.data;
        if (res) {
            dispatch(setLoading(false));
            dispatch(setError({ error: true, message: res.message }));
            return;
        }
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: "An error occured" }));
    }
});
const handleCreateProposal = () => {
    if(loading) return;
    setLoading(true);
    if (user?.id) {
        if(!Number(amount)) {
          toast.error("Enter a valid amount", {
            position: toast.POSITION.TOP_RIGHT
          });
          return;
        }
        createProposalMutation.mutate({
            amount: Number(amount)
        })
    } else {
        toast.error("Please login to submit a proposal", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
}
  const { data: requestData, refetch: refetchRequestData } = useQuery(["get-request"], async () => {
    return await getCampaignRequest(id);
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        setRequest(res.data.data)
      }
  });
  const getRequirement = (name) => {
    return JSON.parse(request?.requirements.filter((val) => val.name === name)[0]?.value ?? "[]");

  }
  useEffect(() => {
    if (id) {
        refetchRequestData();
    }
}, [router.pathname, id]);
  return (
    <Container>
       <Wrapper>
        <ContainerB>
          <Left>
            <ImageSlides>
                <Slider
                  dots={false}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  prevArrow={<PrevArrow />}
                  nextArrow={<NextArrow />}
                >
                  {request?.media.map((val, i) => {
                    return (
                      <Images key={i}>
                        <Image
                          src={val.url}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          quality={100}
                        />
                      </Images>
                    );
                  })}
                  {request?.media.length === 0 && (
                    <Images>
                      <Image
                        src={"/web-services.jpg"}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        quality={100}
                      />
                    </Images>
                  )}
                </Slider>
            </ImageSlides>
            <Section>
              <h2>{request?.title}</h2>
              <Desc>{request?.description}</Desc>
            </Section>
            {/* <Section>
              <h3>Deliverables</h3>
              <Deliverables>
                <div><span></span><p>1 Instagram post and story</p></div>
                <div><span></span><p>2 tiktok videos</p></div>
              </Deliverables>
            </Section> */}
            {/* <Section>
              <h3>Visuals and Theme</h3>
              <Desc>We would love to see selfies of you using the products, reel trends, testimonials, or product pics from out and about!
                    Be as creative as you like - We're excited to see what you come up with!
                    Please make sure your photos are high res, well lit, and that the product is legible ✨
               </Desc>
            </Section> */}
          </Left>
          <Right>
            <RWrapper>
                <RCard>
                    <h3>Pricing</h3>
                    <div className='seperator'></div>
                    <p>₦ {request?.amount_start} - ₦ {request?.amount_end}</p>
                </RCard>
                <RCard>
                    <h3>Influencer Requirements</h3>
                    <div id="requirements">
                        <div>
                            <p>Platform</p>
                            <div>
                            {getRequirement("platforms").map((val) => {
                              switch (val) {
                                case "Facebook":
                                  return <Image src="/facebook-icon.svg" alt="" height={12} width={12}/>
                                case "Instagram":
                                  return <Image src="/instagram-icon.svg" alt="" height={12} width={12}/>
                                case "Twitter":
                                  return <Image src="/twitter-icon.svg" alt="" height={12} width={12}/>
                                case "TikTok":
                                  return <Image src="/tiktok-icon.svg" alt="" height={12} width={12}/>
                                case "Youtube":
                                  return <Image src="/youtube-icon.svg" alt="" height={12} width={12}/>
                                default:
                                  break;
                              }
                            })}
                            </div>
                        </div>
                        <div>
                            <p>Followers</p>
                            <p>{getRequirement("followers")[0]} - {getRequirement("followers")[1]}</p>
                        </div>
                        <div>
                            <p>Engagement</p>
                            <p>{getRequirement("engagement_rate")[0]} - {getRequirement("engagement_rate")[1]}</p>
                        </div>
                        <div>
                            <p>Audience Country</p>
                            <p>{getRequirement("country").map((val) => {
                              return `${val}, `
                            })}</p>
                        </div>
                        <div>
                            <p>Age Range</p>
                            <p>{getRequirement("age").map((val) => {
                              return `${val}, `
                            })}</p>
                        </div>
                    </div>
                    <ContinueBtn onClick={handleSubmitRequest}>
                    <span>Submit Proposal</span>{" "}
                    <Image src="/arrow-w.svg" alt="" width={12} height={11} />
                    </ContinueBtn>
                </RCard>
            </RWrapper>
          </Right>
        </ContainerB>
      </Wrapper>
      {showPopup && (
        <UpdateModal>
          <ShareContainer style={{ maxWidth: "500px" }}>
            <div>
              <h1>Submit Proposal</h1>{" "}
              <button
                onClick={() => {
                  setShowPopup(false);
                }}
              >
                <Image src="/cancel.svg" alt="" height={14} width={14} />
              </button>
            </div>
            <p>Enter your proposed amount</p>
            <div id="link-container">
              <input type="text" value={amount} onChange={(e) => !isNaN(Number(e.target.value)) && setAmount(e.target.value)} placeholder='Enter Amount'/>
              <button onClick={handleCreateProposal}>
                {loading ? "Submitting..." : "Submit" }
              </button>
            </div>
          </ShareContainer>
        </UpdateModal>
      )}
    </Container>
  )
}

Requests.getLayout = (page) => (
    <LandingLayout>
        {page}
    </LandingLayout>
)

export default Requests