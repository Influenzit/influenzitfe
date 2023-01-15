import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LandingLayout from '../../../../../layouts/landing.layout';
import { getUserType, setLoading } from '../../../../../app/reducers/status';
import { getUser } from '../../../../../app/reducers/user';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getService, updateServices } from '../../../../../api/influencer';
import { Bottom, Container, Content, CurrentToggle, FormContainer, Heading, InputContainer, Wrapper } from '../../../../../styles/profile.style';
import { CheckContainer, FrameContainer } from '../../../../../styles/auth.style';
import Image from 'next/image';
import { toast } from 'react-toastify';

const EditService = () => {
  const router = useRouter();
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { id } = router.query;
  const currentAcctType = useSelector(getUserType);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    isNegotiable: false,
    link: "",
  })
  const { data: serviceData, refetch: refetchServiceData } = useQuery(["get-service"], async () => {
      return await getService(id);
  }, {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(res) {
        dispatch(setLoading(false));
        setNewService({
          name: res.data.data.name,
          description: res.data.data.description,
          isNegotiable: !!res.data.data.is_negotiable,
          link: res.data.data.link,
        })
        console.log(res.data.data);
      },
      onError(res) {
        dispatch(setLoading(false));
        router.push("/dashboard/profile/services/create");
      } 
  });
  const updateServiceMutation = useMutation((data) => {
      return updateServices(data, id);
  }, {
      onSuccess(successRes) {
        const res = successRes.data;
        refetchServiceData();
        if(res.errors || res.status === "error" || res.message === "Unauthenticated.") {
            dispatch(setLoading(false));
            dispatch(setError({error: true, message: res.message}));
        } else { 
            dispatch(setLoading(false));
            toast.success("Service updated successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
        }
      },
      onError(error) {
          const res = error.response.data;
          if(res){
              dispatch(setLoading(false));
              dispatch(setError({error: true, message: res.message}));
              return;
          }
          dispatch(setLoading(false));
          dispatch(setError({error: true, message: "An error occured"}));
      }
  });

  const handleNewServiceChange = (val, field) => {
    setNewService((prevVal) => {
        if((field === "price" && Number(val)) || (field === "price" && val === "") || (field !== "price")) {
            return {...prevVal, [field]: val};
        } else {
            return prevVal;
        }
    })
  }

  useEffect(() => {
    dispatch(setLoading(true));
    if(!!user) {
      if(currentAcctType === "Business Owner") {
        dispatch(setLoading(false));
        router.push("/dashboard/profile");
      }
      if(id) {
        refetchServiceData();
      }
    }
  }, [user, router.pathname, currentAcctType, id]);
  const handleUpdateService = () => {
    dispatch(setLoading(true));
    updateServiceMutation.mutate({
      is_negotiable: newService.isNegotiable,
      link:  newService.link,
      description: newService.description,
    });
  }
  return (
    <Container>
        <Wrapper>
            <Content>
                <Heading>
                    <h2>Add new service</h2>
                </Heading>
                
                <FormContainer>
                    <InputContainer>
                        <label>Service Name</label>
                        <input
                        type="text"
                        value={newService.name}
                        // onChange={(e) => handleNewServiceChange(e.target.value, "name")}
                        readOnly
                        style={{ cursor: "not-allowed" }}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Description</label>
                        <textarea
                        value={newService.description}
                        onChange={(e) => handleNewServiceChange(e.target.value, "description")}
                        />
                    </InputContainer>
                    <InputContainer>
                        <label>Link</label>
                        <input
                        type="text"
                        value={newService.link}
                        onChange={(e) => handleNewServiceChange(e.target.value, "link")}
                        />
                    </InputContainer>
                    <CurrentToggle>
                        <button onClick={() => handleNewServiceChange(!newService.isNegotiable, "isNegotiable")}>
                        <FrameContainer>
                            <Image src="/check-frame.svg" alt="" height={18} width={18} />
                        </FrameContainer>
                        {
                            newService.isNegotiable && <CheckContainer>
                            <Image src="/check-b.svg" alt="" height={10} width={13} />
                            </CheckContainer>
                        }
                        </button>
                        <span>Negotiable</span>
                    </CurrentToggle>
                </FormContainer>
                <Bottom>
                    <button onClick={handleUpdateService}>Update Service</button>
                </Bottom>
            </Content>
        </Wrapper>
    </Container>
  )
}
EditService.getLayout = (page) => (
  <LandingLayout>
      {page}
  </LandingLayout>
)

export default EditService