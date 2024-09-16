import React, { useEffect, useState } from "react";
import NotifyCard from "../../components/notify-card";
import LandingLayout from "../../layouts/landing.layout";
import { Container, Wrapper } from "../../styles/notify.style";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "api/auth"; // Ensure this path is correct in production
import { toast } from "react-toastify";

const EmailVerify = () => {
  const router = useRouter();
  const { id, token, email } = router.query; 
  const [loading, setLoading] = useState(true); 
  const [success, setSuccess] = useState(false);

  console.log("ID:", id);
  console.log("Token:", token);
  console.log("Email:", email);

  // Query to verify email when API is triggered
  const { refetch: verifyEmailReq } = useQuery(
    ['verify-email'],
    async () => {
      console.log(`Verifying email with URL: /${id}?token=${token}&email=${email}`);
      return verifyEmail(`/${id}?token=${token}&email=${email}`);
    },
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess(data) {
        console.log('API Success:', data);
        setLoading(false);
        setSuccess(true);
        toast.success('Email verified successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      onError(error) {
        console.error('API Error:', error);
        setLoading(false);
        setSuccess(false);
        toast.error(
          `An error occurred: ${error?.response?.data?.message || 'Verification failed, try again.'}`,
          { position: toast.POSITION.TOP_RIGHT }
        );
      },
    }
  );

  // Wait for router to be ready and params to be available
  useEffect(() => {
    if (router.isReady) {
      if (id && token) {
        console.log("Running email verification");
        verifyEmailReq();
      } else if (email) {
        console.log("Invalid token or ID, redirecting...");
        router.push(`/register/email-expired?email=${email}`);
      }
    }
  }, [router.query]);

  return (
    <Container>
      <Wrapper>
        {loading && <p>Verifying Email...</p>}
        {!loading && success && (
          <NotifyCard
            imgSrc="/message-verify.svg"
            header="Email Verified"
            link="/login"
            linkDisplay="Login Here"
            body={
              <p>
                Your email has been verified successfully. Kindly login with
                your username and password to continue.
              </p>
            }
          />
        )}
        {!loading && !success && (
          <NotifyCard
            imgSrc="/error-verify.svg"
            header="Verification Failed"
            link="/login"
            linkDisplay="Try to Login Again"
            body={
              <p>
                We couldn't verify your email. The token may have expired or is invalid.
                Please try registering again or contact support.
              </p>
            }
          />
        )}
      </Wrapper>
    </Container>
  );
};

EmailVerify.getLayout = (page) => <LandingLayout>{page}</LandingLayout>;

export default EmailVerify;
