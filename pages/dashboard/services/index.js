import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Overview from "../../../components/service/overview";
import LandingLayout from "../../../layouts/landing.layout";

import close from "../../../assets/closeservice.svg";
import serviceimage from "../../../assets/serviceimage.svg";
import addservice from "../../../assets/addservice.svg";
import moment from "moment";
import Pricing from "../../../components/service/pricing";
import Gallery from "../../../components/service/gallery";
import Faq from "../../../components/service/faq";
import Review from "../../../components/service/review";
import { toast } from "react-toastify";
import {
  createServices,
  getServices,
  createFaqServices,
  createReviewServices,
  uploadServiceMedia,
} from "../../../api/influencer";

const Services = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isServiceModalOpen, setisServiceModalOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [step, setstep] = useState(1);
  const platform = ["instagram", "twitter", "tiktok", "facebook", "youtube"];

  const [allServices, setallServices] = useState(null);
  const [coverImageViewer, setcoverImageViewer] = useState(null);
  const [image1Viewer, setimage1Viewer] = useState(null);
  const [image2Viewer, setimage2Viewer] = useState(null);
  const [image3Viewer, setimage3Viewer] = useState(null);
  const [image4Viewer, setimage4Viewer] = useState(null);
  const [coverImage, setcoverImage] = useState(null);
  const [image1, setimage1] = useState(null);
  const [image2, setimage2] = useState(null);
  const [image3, setimage3] = useState(null);
  const [image4, setimage4] = useState(null);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [type, settype] = useState("");
  const [currentPackagesIndex, setcurrentPackagesIndex] = useState(0);
  const [currentPackageId, setCurrentPackageId] = useState(null);
  const [faqs, setfaqs] = useState([{ question: "", answer: "" }]);
  const [review, setreview] = useState({ name: "", comment: "" });
  const [packages, setpackages] = useState([
    {
      description: "",
      amount: "",
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
    {
      description: "",
      amount: "",
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
    {
      description: "",
      amount: "",
      currency: "NGN",
      name: "",
      features: [
        {
          name: "",
          quantity: "",
        },
      ],
    },
  ]);

  const handleImage = (imageStore, file) => {
    console.log(imageStore);
    if (imageStore === "cover") {
      setcoverImage(file);
      setcoverImageViewer(URL.createObjectURL(file));
      return;
    }
    if (imageStore === "image1") {
      setimage1(file);
      setimage1Viewer(URL.createObjectURL(file));
      return;
    }
    if (imageStore === "image2") {
      setimage2(file);
      setimage2Viewer(URL.createObjectURL(file));
      return;
    }
    if (imageStore === "image3") {
      setimage3(file);
      setimage3Viewer(URL.createObjectURL(file));
      return;
    }
    if (imageStore === "image4") {
      setimage4(file);
      setimage4Viewer(URL.createObjectURL(file));
      return;
    }
  };
  const handleAddFaq = () => {
    setfaqs((prevState) => {
      const newState = [...prevState, { question: "", answer: "" }];

      return newState;
    });
  };

  const handleAddFeature = () => {
    setpackages((prevState) => {
      const newState = [...prevState];
      const newFeatures = [
        ...newState[currentPackagesIndex].features,
        {
          name: "",
          quantity: "",
        },
      ];
      newState[currentPackagesIndex] = {
        ...newState[currentPackagesIndex],
        features: newFeatures,
      };
      return newState;
    });
  };
  const handleRemoveFaq = (id) => {
    setfaqs((prevState) => {
      const newState = [...prevState];
      newState.splice(id, 1);

      return newState;
    });
  };
  const handleRemove = (id) => {
    setpackages((prevState) => {
      const newState = [...prevState];
      const newFeatures = [...newState[currentPackagesIndex].features];
      newFeatures.splice(id, 1);
      newState[currentPackagesIndex] = {
        ...newState[currentPackagesIndex],
        features: newFeatures,
      };
      return newState;
    });
    console.log(id);
  };

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setpackages((prevState) => {
      const newState = [...prevState];
      if (name == "amount") {
        newState[currentPackagesIndex][name] = +value; //convert amount input to intergers
      } else {
        newState[currentPackagesIndex][name] = value;
      }
      return newState;
    });
  };
  const handleFormFeatureInput = (e, featureId) => {
    const { name, value } = e.target;
    setpackages((prevState) => {
      const newState = [...prevState];
      newState[currentPackagesIndex].features[featureId][name] = value;

      return newState;
    });
  };
  const handleFaqinput = (e, faqid) => {
    const { name, value } = e.target;
    setfaqs((prevState) => {
      const newState = [...prevState];
      newState[faqid][name] = value;
      return newState;
    });
  };
  const handleReviewinput = (e) => {
    const { name, value } = e.target;
    setreview((prevState) => {
      prevState[name] = value;
      console.log(prevState);
      return prevState;
    });
  };

  const handleGetCampaign = (campaign) => {
    // getCampaigns()
    //   .then((res) => {
    //     console.log(res);
    //     setCampaignList(res.data.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });
  };
  const handleIncrement = () => {
    if (step >= 1 && step < 5) {
      setstep(step + 1);
    }
  };
  const handleDecrement = () => {
    if (step > 1 && step <= 5) {
      setstep(step - 1);
    }
  };

  const handleServiceCreation = () => {
    let activePackages = [];
    for (let i = 0; i < packages.length; i++) {
      // push complete packages into activePackages
      const item = packages[i];
      if (item.name) {
        if (
          item.description !== "" ||
          item.amount !== "" ||
          item.name !== "" ||
          item.features.some((f) => f.name !== "" || f.quantity !== "")
        ) {
          activePackages.push(item);
        }
      }
    }
    if (activePackages.length === 0) {
      // if no active packages
      toast.error("Atleast one package is required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    setloading(true);

    const payload = {
      name: title,
      description,
      type: "project",
      price: +price,
      currency: "NGN",
      is_negotiable: true,
      link: "http://johndoe.myname.com/services/social-media",
      packages: activePackages,
    };
    createServices(payload)
      .then((res) => {
        console.log(res.data.data);
        setCurrentPackageId(res.data.data.id); // save current ServiceId upon creation , so as to update the service with other features to fill
        setloading(false);

        handleIncrement();
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err.response);
      });
  };
  const handleFaqCreation = () => {
    setloading(true);

    const payload = faqs;
    createFaqServices(currentPackageId, payload)
      .then((res) => {
        console.log(res.data.data);
        setloading(false);

        handleIncrement();
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err.response);
      });
  };
  const handleGalleryCreation = () => {
    if (!coverImage || !image1 || !image2 || !image3 || !image4) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    let formData = new FormData();

    formData.append("coverImage", coverImage);
    formData.append("image1", image1);
    formData.append("image2", image2);
    formData.append("image3", image3);
    formData.append("image4", image4);
    setloading(true);

    uploadServiceMedia(currentPackageId, formData)
      .then((res) => {
        console.log(res.data.data);
        setloading(false);

        handleIncrement();
      })
      .catch((err) => {
        setloading(false);
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(err.response);
      });
  };
  const handleReviewCreation = () => {
    // const payload = review;
    // createReviewServices(currentPackageId, payload)
    //   .then((res) => {
    //     console.log(res.data.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //     handleIncrement();
    //   });
  };
  const handleGetServices = () => {
    getServices()
      .then((res) => {
        console.log(res.data.data);
        setallServices(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    handleGetServices();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="py-28 px-12">
      <div className="flex justify-between mb-6">
        <h1 className="text-xl">My Services</h1>
      </div>

      <div className="mt-7">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 items-stretch">
          {allServices !== null &&
            allServices.map((x, idx) => (
              <div
                key={idx}
                className="service-card hover:shadow-xl duration-300"
              >
                <Link href={`/dashboard/services/${x.id}`}>
                  <Image
                    src={x.media[0]?.url || ""}
                    alt="title_image"
                    className="h-full w-full object-cover rounded-t-lg"
                    width="100%"
                    height="100%"
                    layout="responsive"
                  />
                </Link>

                <div className="space-y-4 p-4">
                  <div className=" flex space-x-2 items-center">
                    {platform.map((img) => (
                      <div key={img}>
                        <Image
                          src={require(`../../../assets/${img}.svg`)}
                          alt={img}
                          className="h-5 w-5 rounded-lg mx-2"
                        />
                      </div>
                    ))}
                  </div>
                  <p>{x.name}</p>

                  <p>{x.price}</p>
                </div>
              </div>
            ))}
          <div className="service-card-add grid place-content-center h-[400px]">
            <button
              onClick={() => {
                setisServiceModalOpen(!isServiceModalOpen);
              }}
            >
              <Image
                src={addservice}
                alt="add_service"
                className="h-full w-full"
              />
              <p>Add a service</p>
            </button>
          </div>
        </div>
      </div>

      {isServiceModalOpen && (
        <div className="bg-white fixed overflow-y-auto inset-0 px-[100px] py-10  z-[999999]">
          <div className="flex justify-end mb-5">
            <button
              onClick={() => {
                setisServiceModalOpen(!isServiceModalOpen);
              }}
            >
              <Image src={close} alt="close" />
            </button>
          </div>
          <div className="w-[80%] mx-auto">
            <div className="grid grid-cols-5 gap-4 text-[#94949C] text-sm mb-2">
              <div className="">Overview</div>
              <div className="">Pricing</div>
              <div className="">Gallery</div>
              <div className="">FAQ</div>
              <div className="">Review</div>
            </div>
            <div className="grid grid-cols-5 gap-4 mb-4">
              <div
                className={` ${
                  step > 0 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 1 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 2 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>

              <div
                className={` ${
                  step > 3 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
              <div
                className={` ${
                  step > 4 ? "bg-primary-100" : "bg-[#EAEAEB]"
                }   h-1 w-full rounded-full`}
              ></div>
            </div>

            <section className="mt-4">
              {step === 1 && (
                <Overview
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  type={type}
                  price={price}
                  description={description}
                  title={title}
                  settitle={settitle}
                  setprice={setprice}
                  setdescription={setdescription}
                  settype={settype}
                />
              )}
              {step === 2 && (
                <Pricing
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  packages={packages}
                  setpackages={setpackages}
                  handleAddFeature={handleAddFeature}
                  handleRemove={handleRemove}
                  currentPackagesIndex={currentPackagesIndex}
                  setcurrentPackagesIndex={setcurrentPackagesIndex}
                  handleFormInput={handleFormInput}
                  handleFormFeatureInput={handleFormFeatureInput}
                  handleServiceCreation={handleServiceCreation}
                  loading={loading}
                />
              )}
              {step === 3 && (
                <Gallery
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleImage={handleImage}
                  coverImageViewer={coverImageViewer}
                  image1Viewer={image1Viewer}
                  image2Viewer={image2Viewer}
                  image3Viewer={image3Viewer}
                  image4Viewer={image4Viewer}
                  handleGalleryCreation={handleGalleryCreation}
                  loading={loading}
                />
              )}

              {step === 4 && (
                <Faq
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleAddFaq={handleAddFaq}
                  handleRemoveFaq={handleRemoveFaq}
                  faqs={faqs}
                  handleFaqinput={handleFaqinput}
                  handleFaqCreation={handleFaqCreation}
                  loading={loading}
                />
              )}
              {step === 5 && (
                <Review
                  review={review}
                  setreview={setreview}
                  handleIncrement={handleIncrement}
                  handleDecrement={handleDecrement}
                  handleReviewinput={handleReviewinput}
                  handleReviewCreation={handleReviewCreation}
                />
              )}
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

Services.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default Services;