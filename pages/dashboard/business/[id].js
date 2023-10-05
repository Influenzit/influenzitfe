import Image from "next/image";
import React, { useState } from "react";
import AdminLayout from "../../../layouts/admin.layout";
import {
  Container,
  Wrapper,
  ContainerB,
  Left,
  Section,
  ImageSlides,
  CtrlBtn,
  Images,
  Desc,
  SectionM,
  ProfileCard,
  ImageWrapper,
  ProfileDetails,
  Right,
  PackageCard,
  AboutWrapper,
  Bio,
  QAction,
  WAction,
  ContinueBtn,
  RCard,
  RWrapper,
} from "../../../styles/service.style";
import chevLeftIcon from "../../../assets/chev-left.svg";
import chevRightIcon from "../../../assets/chev-right.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
    getUserType,
  setLoading,
} from "../../../app/reducers/status";
import Link from "next/link";
import { ShareContainer, UpdateModal } from "styles/view.style";
import { getBusiness } from "../../../api/business";
import { RightSection, Social, SocialWrapper } from "../../../styles/creator-profile.style";

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

const ServiceView = () => {
  const [inData, setInData] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const currentAccountType = useSelector(getUserType);
  const getSocialMedia = (name) => {
    return JSON.parse(inData?.social_handles ?? "[]")?.filter((val) => val.name === name)[0]?.value;
  }
  const { data: businessData, refetch: refetchBusinessData } = useQuery(
    ["get-business"],
    async () => {
      return await getBusiness(id);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess() {
        dispatch(setLoading(false));
      },
      onError(res) {
        dispatch(setLoading(false));
      },
    }
  );
  useEffect(() => {
    if (id) {
      refetchBusinessData();
    }
  }, [id]);
  useEffect(() => {
    if (businessData?.data?.data) {
      setInData(businessData?.data?.data);
    }
  }, [businessData]);
  useEffect(() => {
    if(currentAccountType) {
        if (currentAccountType !== "Business Owner") {
            router.push("/dashboard");
        }
    }
  }, [currentAccountType])
  // handles copying of business
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(location.href);
    setLinkCopied(true);
  };

  return (
    <Container style={{ background: "#fff" }}>
      <Wrapper style={{ padding: "20px", marginTop: "90px"}}>
        <ContainerB>
          <Left>
            <ImageSlides>
              {inData?.media && (
                <Slider
                  dots={false}
                  infinite={true}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  prevArrow={<PrevArrow />}
                  nextArrow={<NextArrow />}
                >
                  {inData?.media.map((val, i) => {
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
                  {inData?.media.length === 0 && (
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
              )}
            </ImageSlides>
            <Section>
              <h2>{inData?.name}</h2>
              <Desc>{inData?.description ?? "No description"}</Desc>
            </Section>
            <SectionM>
              <AboutWrapper>
                <ProfileCard>
                  <div id="right">
                    <ImageWrapper>
                      <Image
                        src={
                          inData?.user?.profile_pic
                        }
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                      />
                    </ImageWrapper>
                    <ProfileDetails>
                      <h3>
                        {inData?.user?.firstname} {inData?.user?.lastname}
                      </h3>
                      <div>
                        <p>
                          <Image
                            src="/nigeria.svg"
                            alt=""
                            height={16}
                            width={16}
                          />
                          <span>Nigeria</span>
                        </p>
                        <Image src="/dot.svg" alt="" height={4} width={4} />
                        <p>
                          <Image
                            src="/gender.svg"
                            alt=""
                            height={16}
                            width={16}
                          />
                          <span>{inData?.user?.username}</span>
                        </p>
                      </div>
                    </ProfileDetails>
                  </div>
                  <WAction>
                    <Link href={`/influencers/${inData?.user?.id}`}>
                      View profile
                    </Link>
                    {/* <QAction>
                      <button onClick={() => setShowShare(true)}>
                        <Image src="/share.svg" alt="" width={18} height={15} />{" "}
                        <span>Share</span>
                      </button>
                      <button>
                        <Image
                          src="/bookmarkn.svg"
                          alt=""
                          width={18}
                          height={15}
                        />{" "}
                        <span>Save</span>
                      </button>
                    </QAction> */}
                  </WAction>
                </ProfileCard>
              </AboutWrapper>
            </SectionM>
          </Left>
          <Right>
            <RWrapper>
            <RCard>
                <h3>Business Details</h3>
                <div id="requirements">
                    <div>
                        <p>Website</p>
                        <p>{inData?.website ?? "No website"}</p>
                    </div>
                    <div>
                        <p>Phone</p>
                        <p>{inData?.phone ?? ""}</p>
                    </div>
                    <div>
                        <p>Email</p>
                        <p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{inData?.email ?? ""}</p>
                    </div>
                    <div>
                        <p>RC Number</p>
                        <p>{inData?.rc ?? ""}</p>
                    </div>
                    <div>
                        <p>TIN Number</p>
                        <p>{inData?.tin ?? ""}</p>
                    </div>
                </div>
                </RCard>
                <RightSection>
                    <h3>Social Media Handles</h3>
                    <SocialWrapper>
                        <Social>
                            <div>
                                <Image src="/instagram.png" alt="" height={32} width={32} />
                            </div>
                            <div>
                                <h4>INSTAGRAM</h4>
                                <p title={getSocialMedia("instagram")}>@{getSocialMedia("instagram")}</p>
                            </div>
                        </Social>
                        <Social>
                            <div>
                                <Image src="/youtube.svg" alt="" height={32} width={32} />
                            </div>
                            <div>
                                <h4>YOUTUBE</h4>
                                <p title={getSocialMedia("youtube")}>@{getSocialMedia("youtube")}</p>
                            </div>
                        </Social>
                    </SocialWrapper>
                    <SocialWrapper>
                        <Social>
                            <div>
                                <Image src="/tiktok.png" alt="" height={32} width={32} />
                            </div>
                            <div>
                                <h4>TIKTOK</h4>
                                <p title={getSocialMedia("tiktok")}>@{getSocialMedia("tiktok")}</p>
                            </div>
                        </Social>
                        <Social>
                            <div>
                                <Image src="/twitter.png" alt="" height={32} width={32} />
                            </div>
                            <div>
                                <h4>TWITTER</h4>
                                <p title={getSocialMedia("twitter")}>@{getSocialMedia("twitter")}</p>
                            </div>
                        </Social>
                    </SocialWrapper>
                    <SocialWrapper>
                        <Social style={{ minWidth: "100%" }}>
                            <div>
                                <Image src="/facebook.png" alt="" height={32} width={32} />
                            </div>
                            <div>
                                <h4>FACEBOOK</h4>
                                <p title={getSocialMedia("facebook")}>@{getSocialMedia("facebook")}</p>
                            </div>
                        </Social>
                    </SocialWrapper>
                </RightSection>
              </RWrapper>
          </Right>
        </ContainerB>
        {/* <Listing>
          <h3>Similar services</h3>
          <Bottom>
            {servicesData?.data?.data?.data.slice(0, 4).map((val, i) => {
              return (
                <ServiceCard
                  key={i}
                  title={val.name}
                  imgSrc={val.media[0]?.url ?? "/web-services.jpg"}
                  userName={`${val.user.firstname} ${val.user.lastname}`}
                  price={`${val.currency} ${val.starting_from}`}
                  serviceLink={`/services/${val.id}`}
                  profileImg={val.user.profile_pic}
                />
              );
            })}
          </Bottom>
        </Listing> */}
      </Wrapper>
      {showShare && (
        <UpdateModal>
          <ShareContainer lCopied={linkCopied}>
            <div>
              <h1>Share this business</h1>{" "}
              <button
                onClick={() => {
                  setShowShare(false);
                  setLinkCopied(false);
                }}
              >
                <Image src="/cancel.svg" alt="" height={14} width={14} />
              </button>
            </div>
            <p>Copy the link below to share this service on any platform.</p>
            <div id="link-container">
              <p>{location.href}</p>
              <button onClick={handleLinkCopy}>
                {linkCopied ? "Link copied" : "Copy link"}
              </button>
            </div>
          </ShareContainer>
        </UpdateModal>
      )}
    </Container>
  );
};
ServiceView.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default ServiceView;
