import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getInfluencer,
  getInfluencers,
} from "../../../../../../api/influencer";
import { startConversation } from "../../../../../../api/messaging";
import { setLoading } from "../../../../../../app/reducers/status";
import { getUser } from "../../../../../../app/reducers/user";
import LandingLayout from "../../../../../../layouts/landing.layout";
import {
  Controls,
  CreatorsCard,
  CreatorDetails,
  SocialHandle,
} from "../../../../../../styles/business-owner.style";
import {
  BackImage,
  Bottom,
  BottomSection,
  Campaign,
  CollaborateBtn,
  Container,
  HeroSectionOne,
  ImageContainer,
  ImageContainerTwo,
  Info,
  LeftSection,
  Listing,
  RightSection,
  SkillCard,
  Social,
  SocialWrapper,
  Tag,
  Tags,
  Top,
  UserCardSection,
  WorkCard,
  Wrapper,
  UserDetails,
  UserImage,
} from "../../../../../../styles/creator-profile.style";
import {
  AnalyticChart,
  AnalyticStats,
  AwardCard,
  Content,
  DataSection,
  DataSectionTwo,
  EmptyWrapper,
  ExperienceWrapper,
  Left,
  PostLayer,
  PostStats,
  PostWrapper,
  Right,
  SectionTwo,
  ServRate,
  ServStats,
  ServUserCard,
  SkillGuage,
  SocialPost,
  SocialStats,
  Stat,
  TabBtn,
  Tabs,
  TopImg,
  PerformanceCont,
  EngagementCard,
  StatsCard,
  Flex,
  AnalyticCard,
  MapWrapper,
  CountryList,
  CountrySection,
  Guage,
} from "../../../../../../styles/influencer-profile";
import {
  Details,
  FormContainer,
  UpdateModal,
} from "../../../../../../styles/view.style";
import { InputContainer } from "../../../../../../styles/profile.style";
import { createDispute } from "../../../../../../api/support";
import ServiceCard from "../../../../../../components/service-card";
import ProfileCard from "../../../../../../components/profile-card";
import { numberFormatter } from "../../../../../../helpers/helper";
import { Chart } from "react-google-charts";
import { colors } from "styles/theme";
import { WorldMap } from "react-svg-worldmap";
import { Country } from "country-state-city";
import AdminLayout from "layouts/admin.layout";
import { getSingleUser, updateAccountAdmin } from "api/admin";
import { ProjectCard, ProjectDetails, UserMiniCard } from "styles/dashboard";
import {
  ActionBtn,
  TBody,
  THead,
  Table,
  TableContent,
  TableHeader,
  TableWrapped,
  TableWrapper,
  Td,
  Th,
  Tr,
  TrH,
} from "styles/connect-pages.style";

const CreatorProfile = () => {
  const router = useRouter();
  const { id } = router.query;
  const user = useSelector(getUser);
  const [inData, setInData] = useState(null);
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("instagram");
  const [showEngagePopup, setShowEngagePopup] = useState(false);
  const [showDispute, setShowDispute] = useState(false);
  const [disputeSubject, setDisputeSubject] = useState("");
  const [country] = useState(Country.getAllCountries());

  const optionsPie = {
    pieHole: 0.5,
    is3D: false,
    colors: ["#DF475C", "#2A2939"],
  };
  const generateCountryData = () => {
    let cData = [];
    JSON.parse(
      inData?.analytics?.youtube?.countryviews === 0
        ? false
        : inData?.analytics?.youtube?.countryviews ?? "[]"
    ).forEach((val, i) =>
      cData.push({
        country: val[0].toLocaleLowerCase(),
        value: val[1],
      })
    );
    return cData.sort((a, b) => b.value - a.value);
  };
  const generateICountryData = () => {
    let cData = [];
    let countryObj = JSON.parse(
      inData?.analytics?.instagram_insights?.audience_country ?? "{}"
    );
    Object.keys(countryObj).forEach((val, i) =>
      cData.push({
        country: val.toLocaleLowerCase(),
        value: countryObj[val],
      })
    );
    return cData.sort((a, b) => b.value - a.value);
  };
  const generateTotalCount = () => {
    let cData = 0;
    JSON.parse(
      inData?.analytics?.youtube?.countryviews === 0
        ? false
        : inData?.analytics?.youtube?.countryviews ?? "[]"
    ).forEach((val, i) => (cData += val[1]));
    return cData;
  };
  const generateITotalCount = () => {
    let cData = 0;
    generateICountryData()?.forEach((val, i) => (cData += val.value));
    return cData;
  };
  const getTopFive = () => {
    let topFive = [];
    generateCountryData()?.forEach((val) => {
      if (topFive.length < 6) {
        topFive.push(val);
      } else {
        if (topFive.some((valu) => valu.value < val.value)) {
          topFive.push(val);
          topFive.splice(
            topFive.lastIndexOf(
              topFive.filter((valu) => valu.value < val.value)[0]
            ),
            1
          );
        }
      }
    });
    return topFive;
  };
  const getITopFive = () => {
    let topFive = [];
    generateICountryData()?.forEach((val) => {
      if (topFive.length < 6) {
        topFive.push(val);
      } else {
        if (topFive.some((valu) => valu.value < val.value)) {
          topFive.push(val);
          topFive.splice(
            topFive.lastIndexOf(
              topFive.filter((valu) => valu.value < val.value)[0]
            ),
            1
          );
        }
      }
    });
    return topFive;
  };
  const generateGenderData = () => {
    const eData = [
      ["Gender", "Count"],
      ...JSON.parse(
        inData?.analytics?.youtube?.genderviewerPercentage === 0
          ? false
          : inData?.analytics?.youtube?.genderviewerPercentage ?? "[]"
      ),
    ];
    return eData;
  };
  const [disputeMessage, setDisputeMessage] = useState("");
  const { data: userData, refetch: refetchUserData } = useQuery(
    ["get-single-account"],
    async () => {
      return await getSingleUser(id);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        if (res.data.data) {
          setInData(res.data.data);
        }
        // console.log(inData);
      },
      onError() {
        dispatch(setLoading(false));
      },
    }
  );
  const startConversationMutation = useMutation(
    (data) => {
      return startConversation(data);
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
          router.push("/dashboard/messages");
        }
      },
      onError(error) {
        const res = error.response.data;
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const createDisputeMutation = useMutation(
    (disputeData) => {
      return createDispute(disputeData);
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
          toast.success("Dispute created successfully", {
            position: toast.POSITION.TOP_RIGHT,
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
      },
    }
  );
  const handleStartConversation = () => {
    if (user?.id) {
      startConversationMutation.mutate({
        to_user_id: inData.user_id,
        text: "Hi " + inData?.user?.firstname,
      });
    } else {
      toast.error("Please login to start a conversation", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleReportAccount = () => {
    if (user?.id) {
      setShowDispute(true);
    } else {
      toast.error("Please login before you can report account", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleCreateDispute = () => {
    if (!disputeSubject && !disputeSubject) {
      return;
    } else {
      dispatch(setLoading(true));
      createDisputeMutation.mutate({
        subject: disputeSubject,
        message: disputeMessage,
        account_id: id,
      });
    }
  };
  const getCoverImages = (list) => {
    const checker = [
      "cover_img_1",
      "cover_img_2",
      "cover_img_3",
      "cover_img_4",
    ];
    return list?.filter((val) => checker.includes(val.identifier));
  };
  const updateAccountMutation = useMutation(
    (data) => {
      return updateAccountAdmin(id, data);
    },
    {
      onSuccess(successRes) {
        const res = successRes.data;
        toast.success("Account verified successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(setLoading(false));
        refetchUserData();
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
        if (res) {
          dispatch(setError({ error: true, message: res.message }));
          return;
        }
        dispatch(setError({ error: true, message: "An error occured" }));
      },
    }
  );
  const handleSocialToggle = (key, value) => {
    dispatch(setLoading(true));
    updateAccountMutation.mutate({
      [key]: value,
    });
  };
  useEffect(() => {
    dispatch(setLoading(true));
    if (id) {
      refetchUserData();
    }
  }, [router.pathname, id, refetchUserData, dispatch]);
  useEffect(() => {
    if (userData?.data?.data) {
      setInData(userData?.data?.data);
    }
  }, [userData]);
  useEffect(() => {
    setCurrentTab((prev) => {
      if (inData?.analytics?.instagram) {
        return "instagram";
      } else if (inData?.youtube) {
        return "youtube";
      } else if (inData?.analytics?.facebook) {
        return "facebook";
      } else if (inData?.twitter) {
        return "twitter";
      } else if (inData?.tiktok) {
        return "tiktok";
      } else if (inData?.services.length !== 0) {
        return "services";
      } else if (inData?.businesses.length !== 0) {
        return "businesses";
      }
    });
    console.log(currentTab);
  }, [currentTab, inData]);
  const generateRatingText = (num) => {
    console.log(num);
    if (num < 2) {
      return "average";
    } else if (num > 2 && num < 5) {
      return "good";
    } else {
      return "excellent";
    }
  };
  return (
    <Container style={{ padding: "20px" }}>
      <HeroSectionOne>
        <Wrapper>
          {getCoverImages(inData?.media)?.length === 1 && (
            <ImageContainer>
              <div id="img">
                <Image
                  src={getCoverImages(inData?.media)[0]?.url}
                  alt=""
                  layout="fill"
                  objectPosition="top center"
                  objectFit="cover"
                />
              </div>
            </ImageContainer>
          )}
          {getCoverImages(inData?.media)?.length === 2 && (
            <ImageContainerTwo>
              <div className="wrap">
                <Image
                  src={getCoverImages(inData?.media)[0].url}
                  alt=""
                  layout="fill"
                  objectPosition="top center"
                  objectFit="cover"
                />
              </div>
              <div className="wrap">
                <Image
                  src={getCoverImages(inData?.media)[1].url}
                  alt=""
                  layout="fill"
                  objectPosition="top center"
                  objectFit="cover"
                />
              </div>
            </ImageContainerTwo>
          )}
          {getCoverImages(inData?.media)?.length === 3 && (
            <ImageContainerTwo>
              <div className="wrap">
                <Image
                  src={getCoverImages(inData?.media)[0].url}
                  alt=""
                  layout="fill"
                  objectPosition="top center"
                  objectFit="cover"
                />
              </div>
              <div className="wrap">
                <div className="wrap-top">
                  <Image
                    src={getCoverImages(inData?.media)[1].url}
                    alt=""
                    layout="fill"
                    objectPosition="top center"
                    objectFit="cover"
                  />
                </div>
                <div className="wrap-bottom">
                  <Image
                    src={getCoverImages(inData?.media)[2].url}
                    alt=""
                    layout="fill"
                    objectPosition="top center"
                    objectFit="cover"
                  />
                </div>
              </div>
            </ImageContainerTwo>
          )}
          {getCoverImages(inData?.media)?.length === 4 && (
            <ImageContainerTwo>
              <div className="wrap">
                <Image
                  src={getCoverImages(inData?.media)[0].url}
                  alt=""
                  layout="fill"
                  objectPosition="top center"
                  objectFit="cover"
                />
              </div>
              <div className="wrap">
                <div className="wrap-top">
                  <Image
                    src={getCoverImages(inData?.media)[1].url}
                    alt=""
                    layout="fill"
                    objectPosition="top center"
                    objectFit="cover"
                  />
                </div>
                <div className="wrap-bottom">
                  <div>
                    <Image
                      src={getCoverImages(inData?.media)[2].url}
                      alt=""
                      layout="fill"
                      objectPosition="top center"
                      objectFit="cover"
                    />
                  </div>
                  <div>
                    <Image
                      src={getCoverImages(inData?.media)[3].url}
                      alt=""
                      layout="fill"
                      objectPosition="top center"
                      objectFit="cover"
                    />
                  </div>
                </div>
              </div>
            </ImageContainerTwo>
          )}
          <BottomSection>
            <LeftSection style={{ width: "100%" }}>
              <UserCardSection>
                <UserDetails>
                  <h2>{inData?.user?.name}</h2>
                  <div>
                    <p>
                      <Image src="/nigeria.svg" alt="" height={16} width={16} />
                      <span>Nigeria</span>
                    </p>
                    <p>
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.985 9.9294C10.985 10.1244 10.945 10.3248 10.86 10.5198C10.775 10.7148 10.665 10.899 10.52 11.0723C10.275 11.3648 10.005 11.5761 9.7 11.7115C9.4 11.8469 9.075 11.9173 8.725 11.9173C8.215 11.9173 7.67 11.7873 7.095 11.5219C6.52 11.2565 5.945 10.899 5.375 10.4494C4.8 9.9944 4.255 9.49065 3.735 8.93273C3.22 8.3694 2.755 7.77898 2.34 7.16148C1.93 6.54398 1.6 5.92648 1.36 5.3144C1.12 4.6969 1 4.10648 1 3.54315C1 3.17482 1.06 2.82273 1.18 2.49773C1.3 2.16732 1.49 1.86398 1.755 1.59315C2.075 1.2519 2.425 1.08398 2.795 1.08398C2.935 1.08398 3.075 1.11648 3.2 1.18148C3.33 1.24648 3.445 1.34398 3.535 1.48482L4.695 3.25607C4.785 3.39148 4.85 3.51607 4.895 3.63523C4.94 3.74898 4.965 3.86273 4.965 3.96565C4.965 4.09565 4.93 4.22565 4.86 4.35023C4.795 4.47482 4.7 4.60482 4.58 4.73482L4.2 5.16273C4.145 5.22232 4.12 5.29273 4.12 5.3794C4.12 5.42273 4.125 5.46065 4.135 5.50398C4.15 5.54732 4.165 5.57982 4.175 5.61232C4.265 5.79107 4.42 6.02398 4.64 6.30565C4.865 6.58732 5.105 6.8744 5.365 7.16148C5.635 7.44857 5.895 7.71398 6.16 7.95773C6.42 8.19607 6.635 8.35857 6.805 8.45607C6.83 8.4669 6.86 8.48315 6.895 8.4994C6.935 8.51565 6.975 8.52107 7.02 8.52107C7.105 8.52107 7.17 8.48857 7.225 8.42898L7.605 8.02273C7.73 7.88732 7.85 7.7844 7.965 7.7194C8.08 7.64357 8.195 7.60565 8.32 7.60565C8.415 7.60565 8.515 7.62732 8.625 7.67607C8.735 7.72482 8.85 7.79523 8.975 7.88732L10.63 9.16023C10.76 9.25773 10.85 9.37148 10.905 9.5069C10.955 9.64232 10.985 9.77773 10.985 9.9294Z"
                          stroke="#667085"
                          stroke-width="1.5"
                          stroke-miterlimit="10"
                        />
                      </svg>
                      <span>{inData?.phone1}</span>
                    </p>
                    <Image src="/dot.svg" alt="" height={4} width={4} />
                    <p>
                      <Image src="/gender.svg" alt="" height={16} width={16} />
                      <span>{inData?.gender}</span>
                    </p>
                    <Image src="/dot.svg" alt="" height={4} width={4} />
                    <p>
                      <Image src="/star-p.svg" alt="" height={16} width={16} />
                      <span>
                        {inData?.rating.rating_count} (
                        {inData?.rating.reviews_count} ratings)
                      </span>
                    </p>
                  </div>
                </UserDetails>
                <UserImage>
                  <Image
                    src={inData?.user?.profile_pic}
                    alt=""
                    layout="fill"
                    objectPosition="center"
                    objectFit="cover"
                  />
                </UserImage>
              </UserCardSection>
              <TableWrapped style={{ marginTop: "50px" }}>
                <TableHeader>
                  <h2>Social Handles</h2>
                </TableHeader>
                <TableWrapper style={{ marginBottom: "15px" }}>
                  <TableContent>
                    <Table>
                      <THead>
                        <TrH>
                          <Th cellWidth="370px">Social Media</Th>
                          <Th cellWidth="250px">Handle</Th>
                          <Th cellWidth="120px">Status</Th>
                          <Th cellWidth="200px">Action</Th>
                        </TrH>
                      </THead>
                      <TBody>
                        <Tr>
                          <Td cellWidth="370px">Instagram</Td>
                          <Td cellWidth="250px">@{inData?.instagram}</Td>
                          <Td cellWidth="120px">
                            {inData?.instagram_verified
                              ? "Verified"
                              : "Not Verified"}
                          </Td>
                          <Td
                            cellWidth="200px"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            <ActionBtn
                              onClick={() =>
                                handleSocialToggle(
                                  "instagram_verified",
                                  !inData?.instagram_verified
                                )
                              }
                            >
                              {inData?.instagram_verified
                                ? "Disapprove"
                                : "Approve"}
                            </ActionBtn>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td cellWidth="370px">Facebook</Td>
                          <Td cellWidth="250px">@{inData?.facebook}</Td>
                          <Td cellWidth="120px">
                            {inData?.facebook_verified
                              ? "Verified"
                              : "Not Verified"}
                          </Td>
                          <Td
                            cellWidth="200px"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            <ActionBtn
                              onClick={() =>
                                handleSocialToggle(
                                  "facebook_verified",
                                  !inData?.facebook_verified
                                )
                              }
                            >
                              {inData?.facebook_verified
                                ? "Disapprove"
                                : "Approve"}
                            </ActionBtn>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td cellWidth="370px">Youtube</Td>
                          <Td cellWidth="250px">@{inData?.youtube}</Td>
                          <Td cellWidth="120px">
                            {inData?.youtube_verified
                              ? "Verified"
                              : "Not Verified"}
                          </Td>
                          <Td
                            cellWidth="200px"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            <ActionBtn
                              onClick={() =>
                                handleSocialToggle(
                                  "youtube_verified",
                                  !inData?.youtube_verified
                                )
                              }
                            >
                              {inData?.youtube_verified
                                ? "Disapprove"
                                : "Approve"}
                            </ActionBtn>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td cellWidth="370px">Tiktok</Td>
                          <Td cellWidth="250px">@{inData?.tiktok}</Td>
                          <Td cellWidth="120px">
                            {inData?.tiktok_verified
                              ? "Verified"
                              : "Not Verified"}
                          </Td>
                          <Td
                            cellWidth="200px"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            <ActionBtn
                              onClick={() =>
                                handleSocialToggle(
                                  "tiktok_verified",
                                  !inData?.tiktok_verified
                                )
                              }
                            >
                              {inData?.tiktok_verified
                                ? "Disapprove"
                                : "Approve"}
                            </ActionBtn>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td cellWidth="370px">Twitter</Td>
                          <Td cellWidth="250px">@{inData?.twitter}</Td>
                          <Td cellWidth="120px">
                            {inData?.twitter_verified
                              ? "Verified"
                              : "Not Verified"}
                          </Td>
                          <Td
                            cellWidth="200px"
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              paddingRight: "20px",
                            }}
                          >
                            <ActionBtn
                              onClick={() =>
                                handleSocialToggle(
                                  "twitter_verified",
                                  !inData?.twitter_verified
                                )
                              }
                            >
                              {inData?.twitter_verified
                                ? "Disapprove"
                                : "Approve"}
                            </ActionBtn>
                          </Td>
                        </Tr>
                      </TBody>
                    </Table>
                  </TableContent>
                </TableWrapper>
              </TableWrapped>
              <Info>
                <h3>{inData?.headline}</h3>
                <p>{inData?.biography}</p>
                <Tags>
                  {inData?.skills.map((val, i) => (
                    <Tag key={i}>{val.name}</Tag>
                  ))}
                </Tags>
              </Info>
              <DataSection>
                <Tabs>
                  {inData?.analytics?.instagram && (
                    <TabBtn
                      isActive={currentTab === "instagram"}
                      onClick={() => setCurrentTab("instagram")}
                    >
                      Instagram
                    </TabBtn>
                  )}
                  {inData?.youtube && (
                    <TabBtn
                      isActive={currentTab === "youtube"}
                      onClick={() => setCurrentTab("youtube")}
                    >
                      Youtube
                    </TabBtn>
                  )}
                  {inData?.analytics?.facebook && (
                    <TabBtn
                      isActive={currentTab === "facebook"}
                      onClick={() => setCurrentTab("facebook")}
                    >
                      Facebook
                    </TabBtn>
                  )}
                  {inData?.twitter && (
                    <TabBtn
                      isActive={currentTab === "twitter"}
                      onClick={() => setCurrentTab("twitter")}
                    >
                      Twitter
                    </TabBtn>
                  )}
                  {inData?.tiktok && (
                    <TabBtn
                      isActive={currentTab === "tiktok"}
                      onClick={() => setCurrentTab("tiktok")}
                    >
                      TikTok
                    </TabBtn>
                  )}
                  {inData?.services.length !== 0 && (
                    <TabBtn
                      isActive={currentTab === "services"}
                      onClick={() => setCurrentTab("services")}
                    >
                      Services
                    </TabBtn>
                  )}
                  {inData?.businesses.length !== 0 && (
                    <TabBtn
                      isActive={currentTab === "businesses"}
                      onClick={() => setCurrentTab("businesses")}
                    >
                      Businesses
                    </TabBtn>
                  )}
                </Tabs>
                {currentTab === "instagram" &&
                inData?.analytics?.instagram &
                  (inData?.analytics?.options?.instagram_source ===
                    "facebook") ? (
                  <Content>
                    <h3>Influencer Summary</h3>
                    <AnalyticStats>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(
                              inData?.analytics?.instagram_insights
                                ?.follower_count
                            )
                          )}
                        </h1>
                        <p>Followers</p>
                      </Stat>
                      <Stat isCenter>
                        <h1>
                          {numberFormatter(
                            inData?.analytics?.instagram_insights?.reach
                          )}
                        </h1>
                        <p>Reach</p>
                      </Stat>
                      <Stat>
                        <h1>
                          {inData?.analytics?.instagram_insights?.impressions}
                        </h1>
                        <p>Impressions</p>
                      </Stat>
                    </AnalyticStats>
                    <h3>Audience Insights</h3>
                    <AnalyticChart>
                      <MapWrapper>
                        <AnalyticCard style={{ border: "none" }}>
                          <h2>Audience Location</h2>
                          <WorldMap
                            color={colors.primaryColor}
                            size="lg"
                            data={generateICountryData()}
                          />
                        </AnalyticCard>
                        <CountryList>
                          {getITopFive().map((val, i) => (
                            <CountrySection key={i}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "12px",
                                  color: colors.textColor,
                                }}
                              >
                                <p>
                                  {
                                    country.filter(
                                      (valu) =>
                                        valu.isoCode.toLocaleLowerCase() ===
                                        val.country
                                    )[0].flag
                                  }{" "}
                                  {
                                    country.filter(
                                      (valu) =>
                                        valu.isoCode.toLocaleLowerCase() ===
                                        val.country
                                    )[0].name
                                  }
                                </p>
                                <div>
                                  {(
                                    (val.value / generateITotalCount()) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </div>
                              </div>
                              <Guage
                                guage={(
                                  (val.value / generateITotalCount()) *
                                  100
                                ).toFixed(2)}
                              />
                            </CountrySection>
                          ))}
                        </CountryList>
                      </MapWrapper>
                    </AnalyticChart>
                    <PerformanceCont>
                      <Flex>
                        <EngagementCard>
                          <h3>Engagement Rate</h3>
                          <div id="wrapper">
                            <h1>
                              {inData?.analytics?.instagram_insights
                                ?.engagement_rate ?? 0}
                              %
                            </h1>
                            <div>
                              <p>
                                {generateRatingText(
                                  Number(
                                    inData?.analytics?.instagram_insights
                                      ?.engagement_rate ?? "0"
                                  )
                                )}
                              </p>
                              {/* <span>Higher than 60% of influencers</span> */}
                            </div>
                          </div>
                        </EngagementCard>
                        <StatsCard>
                          <h3>Avg. likes per post</h3>
                          <div>
                            <span>
                              <Image
                                src="/heart-p.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(
                                  inData?.analytics?.instagram_insights?.likes
                                )
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                      <Flex>
                        <StatsCard>
                          <h3>Avg. comments per post</h3>
                          <div>
                            <span>
                              <Image
                                src="/comment.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(
                                  inData?.analytics?.instagram_insights
                                    ?.comments
                                )
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                        <StatsCard>
                          <h3>Profile views</h3>
                          <div>
                            <span>
                              <Image
                                src="/eye.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                inData?.analytics?.instagram_insights
                                  ?.profile_views
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                    </PerformanceCont>
                  </Content>
                ) : (
                  currentTab === "instagram" && (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>Instagram not connected yet</h3>
                      </EmptyWrapper>
                    </Content>
                  )
                )}
                {currentTab === "facebook" && inData?.analytics?.facebook ? (
                  <Content>
                    <h3>Influencer Summary</h3>
                    <AnalyticStats style={{ marginBottom: "20px" }}>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.facebook?.page_fans)
                          )}
                        </h1>
                        <p>Followers</p>
                      </Stat>
                      <Stat isCenter>
                        <h1>
                          {numberFormatter(inData?.analytics?.facebook?.count)}
                        </h1>
                        <p>Reach</p>
                      </Stat>
                      <Stat>
                        <h1>{inData?.analytics?.facebook?.engagement}%</h1>
                        <p>Engagement</p>
                      </Stat>
                    </AnalyticStats>

                    <PerformanceCont>
                      <Flex>
                        <EngagementCard>
                          <h3>Engagement Rate</h3>
                          <div id="wrapper">
                            <h1>{inData?.analytics?.facebook?.engagement}%</h1>
                            <div>
                              <p>Average</p>
                              <span>Higher than 60% of influencers</span>
                            </div>
                          </div>
                        </EngagementCard>
                        <StatsCard>
                          <h3>Avg. likes per post</h3>
                          <div>
                            <span>
                              <Image
                                src="/heart-p.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(
                                  inData?.analytics?.facebook?.page_like_total
                                )
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                      <Flex>
                        <StatsCard>
                          <h3>Impressions</h3>
                          <div>
                            <span>
                              <Image
                                src="/comment.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(
                                  inData?.analytics?.facebook?.page_impressions
                                )
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                        <StatsCard>
                          <h3>Profile views</h3>
                          <div>
                            <span>
                              <Image
                                src="/eye.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                inData?.analytics?.facebook?.page_views_total
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                    </PerformanceCont>
                  </Content>
                ) : (
                  currentTab === "facebook" && (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>Facebook not connected yet</h3>
                      </EmptyWrapper>
                    </Content>
                  )
                )}
                {currentTab === "twitter" && inData?.twitter ? (
                  <Content>
                    <h3>Influencer Summary</h3>
                    <AnalyticStats style={{ marginBottom: "20px" }}>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.twitter?.following_count)
                          )}
                        </h1>
                        <p>Following</p>
                      </Stat>
                      <Stat isCenter>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.twitter?.followers_count)
                          )}
                        </h1>
                        <p>Followers</p>
                      </Stat>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.twitter?.tweet_count)
                          )}
                        </h1>
                        <p>Tweet Count</p>
                      </Stat>
                    </AnalyticStats>
                  </Content>
                ) : (
                  currentTab === "twitter" && (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>Twitter not connected yet</h3>
                      </EmptyWrapper>
                    </Content>
                  )
                )}
                {currentTab === "tiktok" && inData?.tiktok ? (
                  <Content>
                    <h3>Influencer Summary</h3>
                    <AnalyticStats style={{ marginBottom: "20px" }}>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.tiktok?.following_count)
                          )}
                        </h1>
                        <p>Following</p>
                      </Stat>
                      <Stat isCenter>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.tiktok?.follower_count)
                          )}
                        </h1>
                        <p>Followers</p>
                      </Stat>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(inData?.analytics?.tiktok?.likes_count)
                          )}
                        </h1>
                        <p>Likes Count</p>
                      </Stat>
                    </AnalyticStats>
                  </Content>
                ) : (
                  currentTab === "tiktok" && (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>TikTok not connected yet</h3>
                      </EmptyWrapper>
                    </Content>
                  )
                )}
                {currentTab === "youtube" && inData?.youtube ? (
                  <Content>
                    <h3>Influencer Summary</h3>
                    <AnalyticStats>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            Number(
                              inData?.analytics?.youtube?.subscribersGained
                            )
                          )}
                        </h1>
                        <p>Subscribers</p>
                      </Stat>
                      <Stat isCenter>
                        <h1>
                          {numberFormatter(inData?.analytics?.youtube?.views)}
                        </h1>
                        <p>Total video views</p>
                      </Stat>
                      <Stat>
                        <h1>
                          {numberFormatter(
                            inData?.analytics?.youtube?.estimatedMinutesWatched
                          )}
                        </h1>
                        <p>Estimatated Minutes Watched</p>
                      </Stat>
                    </AnalyticStats>
                    <h3>Audience Insights</h3>
                    <AnalyticChart>
                      <AnalyticCard>
                        <h2>Gender</h2>
                        <Chart
                          chartType="PieChart"
                          width="100%"
                          height="400px"
                          data={generateGenderData()}
                          options={optionsPie}
                        />
                      </AnalyticCard>
                      <MapWrapper>
                        <AnalyticCard style={{ border: "none" }}>
                          <h2>Audience Location</h2>
                          <WorldMap
                            color={colors.primaryColor}
                            size="lg"
                            data={generateCountryData()}
                          />
                        </AnalyticCard>
                        <CountryList>
                          {getTopFive().map((val, i) => (
                            <CountrySection key={i}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: "12px",
                                  color: colors.textColor,
                                }}
                              >
                                <p>
                                  {
                                    country.filter(
                                      (valu) =>
                                        valu.isoCode.toLocaleLowerCase() ===
                                        val.country
                                    )[0].flag
                                  }{" "}
                                  {
                                    country.filter(
                                      (valu) =>
                                        valu.isoCode.toLocaleLowerCase() ===
                                        val.country
                                    )[0].name
                                  }
                                </p>
                                <div>
                                  {(
                                    (val.value / generateTotalCount()) *
                                    100
                                  ).toFixed(2)}
                                  %
                                </div>
                              </div>
                              <Guage
                                guage={(
                                  (val.value / generateTotalCount()) *
                                  100
                                ).toFixed(2)}
                              />
                            </CountrySection>
                          ))}
                        </CountryList>
                      </MapWrapper>
                    </AnalyticChart>
                    <h3>Performance</h3>
                    <PerformanceCont>
                      <Flex>
                        <EngagementCard>
                          <h3>Avg. view percentage</h3>
                          <div id="wrapper">
                            <h1>
                              {
                                inData?.analytics?.youtube
                                  ?.averageViewPercentage
                              }
                              %
                            </h1>
                            <div>
                              <p>Average</p>
                              <span>Higher than 60% of influencers</span>
                            </div>
                          </div>
                        </EngagementCard>
                        <StatsCard>
                          <h3>Avg. likes per video</h3>
                          <div>
                            <span>
                              <Image
                                src="/heart-p.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(inData?.analytics?.youtube?.likes)
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                      <Flex>
                        <StatsCard>
                          <h3>Avg. comments per video</h3>
                          <div>
                            <span>
                              <Image
                                src="/comment.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                Number(inData?.analytics?.youtube?.comments)
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                        <StatsCard>
                          <h3>Avg. views per video</h3>
                          <div>
                            <span>
                              <Image
                                src="/eye.svg"
                                alt="heart"
                                height={25}
                                width={25}
                              />
                            </span>
                            <h1>
                              {numberFormatter(
                                inData?.analytics?.youtube?.averageViewDuration
                              )}
                            </h1>
                          </div>
                        </StatsCard>
                      </Flex>
                      <div style={{ marginTop: "20px" }}>
                        <Image
                          src={"/youtube-full.png"}
                          height={35}
                          width={156.1}
                        />
                      </div>
                    </PerformanceCont>
                  </Content>
                ) : (
                  currentTab === "youtube" && (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>Youtube not connected yet</h3>
                      </EmptyWrapper>
                    </Content>
                  )
                )}
                {currentTab === "services" &&
                  (inData?.services.length ? (
                    <Listing>
                      <h3>Services</h3>
                      <Bottom style={{ columnGap: "15px" }}>
                        {inData?.services.map((val, i) => (
                          <ServiceCard
                            key={i}
                            title={val.name}
                            imgSrc={val.media[0]?.url ?? "/web-services.jpg"}
                            userName={inData?.user?.name}
                            price={`${val.currency} ${val.starting_from}`}
                            serviceLink={`/services/${val.id}`}
                            profileImg={inData?.user?.profile_pic}
                          />
                        ))}
                      </Bottom>
                    </Listing>
                  ) : (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>No Service</h3>
                      </EmptyWrapper>
                    </Content>
                  ))}
                {currentTab === "businesses" &&
                  (inData?.businesses.length ? (
                    <Listing>
                      <h3>Businesses</h3>
                      <Bottom style={{ columnGap: "15px" }}>
                        {inData?.businesses.map((val, i) => (
                          <div key={i}>
                            <ProjectCard>
                              <UserMiniCard>
                                <div>
                                  <h4>{val.name}</h4>
                                  <p>{val.email}</p>
                                </div>
                              </UserMiniCard>
                              <ProjectDetails style={{ borderRight: "0" }}>
                                <div id="img">
                                  <Image
                                    src={val.media[0].url}
                                    layout="fill"
                                    objectFit="cover"
                                    objectPosition="center"
                                  />
                                </div>
                                <div>
                                  <h4>{val.website}</h4>
                                  <p>{val.phone}</p>
                                </div>
                              </ProjectDetails>
                            </ProjectCard>
                          </div>
                        ))}
                      </Bottom>
                    </Listing>
                  ) : (
                    <Content>
                      <EmptyWrapper>
                        <Image
                          src="/empty.png"
                          alt=""
                          height={120}
                          width={120}
                        />
                        <h3>No Business</h3>
                      </EmptyWrapper>
                    </Content>
                  ))}
              </DataSection>
            </LeftSection>
          </BottomSection>
        </Wrapper>
      </HeroSectionOne>
      {showDispute && (
        <UpdateModal>
          <FormContainer>
            <h3>Report Account</h3>
            <InputContainer>
              <label>Subject</label>
              <input
                type="text"
                value={disputeSubject}
                onChange={(e) => setDisputeSubject(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <label>Message</label>
              <textarea
                value={disputeMessage}
                onChange={(e) => setDisputeMessage(e.target.value)}
              ></textarea>
            </InputContainer>
            <button onClick={() => setShowDispute(false)}>Go back</button>
            <button onClick={handleCreateDispute}>Create Dispute</button>
          </FormContainer>
        </UpdateModal>
      )}
    </Container>
  );
};
CreatorProfile.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CreatorProfile;
