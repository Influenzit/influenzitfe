import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { setError, setLoading, setLogoutModal } from '../../app/reducers/status'
import { WelcomeModal } from '../../styles/connect-pages.style'
import { UpdateModal } from '../../styles/view.style'
import { useRouter } from 'next/router'
import { clearUser } from "../../app/reducers/user";
import { clearBusiness } from "../../app/reducers/business";
import { useMutation } from '@tanstack/react-query'
import { logoutUser } from 'api/auth'

const LogoutModal = ({message}) => {
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const router = useRouter();
  const logoutMutation = useMutation(
    () => {
      return logoutUser();
    },
    {
      onSuccess(successRes) {
        dispatch(setLoading(false));
        localStorage.clear();
        dispatch(clearUser());
        dispatch(clearBusiness());
        router.replace("/login");
        dispatch(setLogoutModal(false));
      },
      onError(error) {
        const res = error.response.data;
        dispatch(setLoading(false));
      },
    }
  );
  const logout = () => {
    dispatch(setLoading(true));
    logoutMutation.mutate();
  }
  const handleClose = () => {
    dispatch(setLogoutModal(false));
  }
  const countdown = () => {
    setTimeRemaining((prevTime) => {
      if(prevTime > 0) {
        return prevTime - 1;
      } else {
        logout();
        return 0;
      }
    })
  }
  let countdownID;
  useEffect(() => {
    countdownID = setInterval(countdown, 1000);
    return () => {
      clearInterval(countdownID);
    }
  }, [])
  
  return (
    <UpdateModal>
      <WelcomeModal>
          <div>
              <button onClick={() => handleClose()}><Image src="/cancel.svg" alt="" height={14} width={14} /></button>
          </div>
          <p>You will be logged out because of inactivity in ...</p>
          <h2>{timeRemaining} secs</h2>
          <div>
              <button onClick={() => setTimeRemaining(0)}>Logout</button>
          </div>
      </WelcomeModal>
    </UpdateModal>
  )
}

export default LogoutModal;