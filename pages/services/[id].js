import Image from "next/image";
import React, { useState } from "react";
import LandingLayout from "../../layouts/landing.layout";
import {
  Container,
  DetailTab,
  LeftControl,
  RightControl,
  TopTabContainer,
  Wrapper,
  ContainerB,
  Left,
  Section,
  CurrentPosition,
  ImageSlides,
  CtrlBtn,
  Images,
  Header,
  Desc,
  SectionM,
  ProfileCard,
  ImageWrapper,
  ProfileDetails,
  Stars,
  FaqWrapper,
  FaqCont,
  FaqQuest,
  FaqAns,
  ReviewWrapper,
  Review,
  ReviewL,
  ReviewImg,
  ReviewR,
  ReviewMsg,
  Right,
  PackageCard,
  PackageTabs,
  PackageTab,
  Package,
  PHead,
  PDetails,
  PFeatures,
  Feature,
  ContinueBtn,
  WrapperT,
  AboutWrapper,
  Bio,
  RCountry,
  PDescription,
  MessageBtn,
  QAction,
  WAction,
} from "../../styles/service.style";
import heartIcon from "../../assets/heart.svg";
import shareIcon from "../../assets/share.svg";
import chevLeftIcon from "../../assets/chev-left.svg";
import chevRightIcon from "../../assets/chev-right.svg";
import chevDownIcon from "../../assets/chev-down.svg";
import chevUpIcon from "../../assets/chev-up.svg";
import starIcon from "../../assets/star.svg";
import fillStarIcon from "../../assets/fill-star.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { exploreServices, getExploreService } from "../../api/influencer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserType,
  setError,
  setLoading,
  setSuccess,
} from "../../app/reducers/status";
import { moneyStandard } from "../../helpers/helper";
import { usePaystackPayment } from "react-paystack";
import { createPaymentLog, processPayment } from "../../api/payment";
import { getUser } from "../../app/reducers/user";
import { getCurrentBusiness } from "../../app/reducers/business";
import { toast } from "react-toastify";
import Link from "next/link";
import { Answer, Faq, Question } from "../../styles/home.style";
import { Listing, Bottom } from "../../styles/creator-profile.style";
import ServiceCard from "../../components/service-card";
import { ShareContainer, UpdateModal } from "styles/view.style";
import { WelcomeModal } from "styles/connect-pages.style";

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
  const [packageType, setPackageType] = useState("");
  const [inData, setInData] = useState(null);
  const [packages, setPackages] = useState([]);
  const [paystackConfig, setPaystackConfig] = useState({});
  const initializePayment = usePaystackPayment(paystackConfig);
  const [triggerPayment, setTriggerPayment] = useState(false);
  const [makePayment, setMakePayment] = useState(false);
  const router = useRouter();
  const user = useSelector(getUser);
  const accountType = useSelector(getUserType);
  const currentBusiness = useSelector(getCurrentBusiness);
  const dispatch = useDispatch();
  const { id } = router.query;
  const [linkCopied, setLinkCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { data: serviceData, refetch: refetchServiceData } = useQuery(
    ["get-service"],
    async () => {
      return await getExploreService(id);
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
        router.push("/explore");
      },
    }
  );
  const { data: servicesData, refetch: refetchServicesData } = useQuery(
    ["get-services"],
    async () => {
      return await exploreServices("");
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
    }
  );
  const [showFaq, setShowFaq] = useState(null);
  const handleToggle = (i) => {
    if (showFaq[i]) {
      setShowFaq((prev) => {
        const copyOf = { ...prev };
        copyOf[i] = false;
        return copyOf;
      });
    } else {
      setShowFaq((prev) => {
        const copyOf = { ...prev };
        copyOf[i] = true;
        return copyOf;
      });
    }
  };
  const getCurrentPackage = () =>
    inData?.packages.filter((val) => val.name === packageType)[0];
  useEffect(() => {
    if (id) {
      refetchServiceData();
      refetchServicesData();
    }
  }, [id]);
  useEffect(() => {
    if (serviceData?.data?.data) {
      setInData(serviceData?.data?.data);
      const packagesGotten = [];
      let sFaq = {};
      serviceData?.data?.data.faqs.forEach((_, i) => {
        sFaq = { ...sFaq, [i]: false };
      });
      serviceData?.data?.data.packages.forEach((val) => {
        if (val.name === "Basic" && !packagesGotten[0]) {
          packagesGotten[0] = "Basic";
        }
        if (val.name === "Standard") {
          packagesGotten[1] = "Standard";
        }
        if (val.name === "Premium") {
          packagesGotten[2] = "Premium";
        }
      });
      const formattedPackages = packagesGotten.filter((val) => !!val);
      setShowFaq(sFaq);
      setPackages(formattedPackages);
      setPackageType(formattedPackages[0]);
    }
  }, [serviceData]);
  const onPaymentSuccess = (reference, channel) => {
    dispatch(setLoading(true));
    processPayment({
      channel,
      payment_reference: reference,
    })
      .then((successRes) => {
        dispatch(setLoading(false));
        dispatch(
          setSuccess({ success: true, message: successRes.data.message })
        );
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      })
      .catch((err) => {
        const res = err.response.data;
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: res.message }));
      });
  };
  const onPaymentClose = (close) => {
    console.log(close);
  };
  const createPaymentLogMutation = useMutation(
    (log) => {
      return createPaymentLog(log);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        if (
          res.errors ||
          res.status === "error" ||
          res.message === "Unauthenticated."
        ) {
          dispatch(setLoading(false));
          dispatch(setError({ error: true, message: res.message }));
        } else {
          dispatch(setLoading(false));
          if(res.data.channel === "paystack") {
            setPaystackConfig({
              reference: res.data.payment_reference,
              email: user.email,
              amount: Number(res.data.amount) * 100,
              publicKey: "pk_test_9d97cf0be86b0758ece444694d57a8db41a4be59",
            });
            setTriggerPayment(!triggerPayment);
            setMakePayment(true);
          }
        }
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setLoading(false));
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
          return;
        }
        dispatch(setLoading(false));
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  // handles create Service
  const handleCreatePaymentLog = (channel) => {
    setShowPayment(false);
    if (!!user) {
      if (accountType === "Business Owner") {
        if (inData?.user?.id !== user.id) {
          dispatch(setLoading(true));
          createPaymentLogMutation.mutate({
            channel,
            payment_type: "service_payment",
            amount: getCurrentPackage()?.amount,
            currency: getCurrentPackage()?.currency,
            package_id: getCurrentPackage()?.id,
            meta: { business_id: currentBusiness.id },
          });
        } else {
          toast.error("You can't pay for your services", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        toast.error("Only business owners can pay for services", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error("Please login to make payment", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleLinkCopy = () => {
    navigator.clipboard.writeText(location.href);
    setLinkCopied(true);
  };
  useEffect(() => {
    if (makePayment) {
      initializePayment((res) => {onPaymentSuccess(res.reference, "paystack")}, onPaymentClose);
      setMakePayment(false);
    }
  }, [triggerPayment]);

  return (
    <Container>
      <Wrapper>
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
              <Desc>{inData?.description}</Desc>
            </Section>
            <SectionM>
              <AboutWrapper>
                <ProfileCard>
                  <div id="right">
                    <ImageWrapper>
                      <Image
                        src={
                          inData?.user?.account?.media?.[0]?.url
                            ? inData?.user?.account?.media?.[0]?.url
                            : `https://ui-avatars.com/api/?name=${inData?.user?.firstname}+${inData?.user?.lastname}&color=FFFFFF&background=12544D`
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
                          <span>{inData?.user?.account?.gender}</span>
                        </p>
                      </div>
                    </ProfileDetails>
                  </div>
                  <WAction>
                    <Link href={`/influencers/${inData?.user?.account?.id}`}>
                      View profile
                    </Link>
                    <QAction>
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
                    </QAction>
                  </WAction>
                </ProfileCard>
                <Bio>{inData?.user?.biography}</Bio>
              </AboutWrapper>
            </SectionM>
            <Section>
              <h3>FAQs</h3>
              <FaqWrapper>
                {inData?.faqs.map((val, i) => (
                  <Faq key={i}>
                    <Question onClick={() => handleToggle(i)}>
                      <span>{val.question}</span>
                      <span>
                        {showFaq?.[i] ? (
                          <Image
                            src="/close.svg"
                            alt=""
                            height={20}
                            width={20}
                          />
                        ) : (
                          <Image
                            src="/open.svg"
                            alt=""
                            height={20}
                            width={20}
                          />
                        )}
                      </span>
                    </Question>
                    {showFaq?.[i] && <Answer>{val.answer}</Answer>}
                  </Faq>
                ))}
              </FaqWrapper>
            </Section>
          </Left>
          <Right>
            <PackageCard>
              <PackageTabs>
                {packages.map((val, i) => (
                  <PackageTab
                    key={i}
                    isActive={packageType === val}
                    onClick={() => setPackageType(val)}
                  >
                    {val}
                  </PackageTab>
                ))}
              </PackageTabs>
              <Package>
                <PHead>
                  <span>{packageType}</span>
                  <p>
                    {getCurrentPackage()?.currency}{" "}
                    {moneyStandard(getCurrentPackage()?.amount ?? 0)}
                  </p>
                </PHead>
                <PDescription>{getCurrentPackage()?.description}</PDescription>
                <PFeatures>
                  {getCurrentPackage()?.features.map((feature, i) => (
                    <Feature key={i}>
                      <p>{feature.name}</p>
                    </Feature>
                  ))}
                </PFeatures>
                <ContinueBtn onClick={() => setShowPayment(true)}>
                  <span>Continue</span>{" "}
                  <Image src="/arrow-w.svg" alt="" width={12} height={11} />
                </ContinueBtn>
                <MessageBtn onClick={() => {}}>
                  <Image src="/envelope-p.svg" alt="" width={18} height={15} />{" "}
                  <span>Message</span>
                </MessageBtn>
              </Package>
            </PackageCard>
          </Right>
        </ContainerB>
        <Listing>
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
        </Listing>
      </Wrapper>
      {showShare && (
        <UpdateModal>
          <ShareContainer lCopied={linkCopied}>
            <div>
              <h1>Share this service</h1>{" "}
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
       {
          showPayment && (
              <UpdateModal>
                  <WelcomeModal>
                      <div>
                          <button onClick={() => setShowPayment(false)}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
                      </div>
                      <p>Select Payment Channel</p>
                      <div style={{ display: "flex", justifyContent: "center", columnGap: "20px" }}>
                          <button onClick={() => handleCreatePaymentLog("wallet")}>Wallet</button>
                          <button onClick={() => handleCreatePaymentLog("paystack")}>Paystack</button>
                      </div>
                  </WelcomeModal>
              </UpdateModal>
        )}
    </Container>
  );
};
ServiceView.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default ServiceView;
