import React, { useEffect, useState } from "react";
import NotifyCard from "../../components/notify-card";
import LandingLayout from "../../layouts/landing.layout";
import { Container, Wrapper } from "../../styles/notify.style";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const EmailVerify = () => {
  const router = useRouter();
  const { id, token, email } = router.query; // Updated to use token instead of hash
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  // Function to verify the email using fetch
  const verifyEmail = async () => {
    try {
      const response = await fetch(`/api/verify-email/${id}?token=${token}&email=${email}`, {
        method: "GET", // or POST if your API expects it
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to verify email");
      }

      const data = await response.json();
      console.log("Email verification successful:", data);
      setLoading(false);
      setSuccess(true);
      toast.success("Email verified successfully!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Email verification error:", error.message);
      setLoading(false);
      setSuccess(false);
      toast.error(`An error occurred: ${error.message || "Unknown error"}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // Verify email when id and token are present
  useEffect(() => {
    if (id && token) {
      console.log("Constructed URL:", `/${id}?token=${token}&email=${email}`);
      verifyEmail(); // Call the fetch function directly
    } else if (email) {
      router.push(`/register/email-expired?email=${email}`); // Fallback for expired/invalid tokens
    }
  }, [id, token, email, router]);

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
