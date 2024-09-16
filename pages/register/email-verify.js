import React, { useEffect, useState } from "react";
import NotifyCard from "../../components/notify-card";
import LandingLayout from "../../layouts/landing.layout";
import { Container, Wrapper } from "../../styles/notify.style";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { verifyEmail } from "api/auth";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const router = useRouter();
  const { id, token, email } = router.query; // Updated to use token instead of hash
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Query to verify the email with the new URL parameters
  const { refetch: verifyEmailReq } = useQuery(
    ['verify-email'],
    async () => verifyEmail(`/${id}?token=${token}&email=${email}`), // Updated URL structure
    {
      enabled: false,
      staleTime: Infinity,
      retry: false,
      onSuccess() {
        setLoading(false);
        setSuccess(true);
        toast.success('Email verified successfully!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      onError(res) {
        setLoading(false);
        setSuccess(false);
        toast.error(`An error occurred: ${res.response?.data?.message || 'Unknown error'}`, {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    }
  );

  // Verify email when id and token are present
  useEffect(() => {
    if (id && token) {
      verifyEmailReq();
    } else if (email) {
      router.push(`/register/email-expired?email=${email}`); // Fallback for expired/invalid tokens
    }
  }, [id, token, email, verifyEmailReq, router]);

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
                We couldn&apos;t verify your email. The token may have expired or is invalid.
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
