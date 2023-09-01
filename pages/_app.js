import '../styles/globals.css'
import { Provider } from "react-redux"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import { GoogleOAuthProvider } from '@react-oauth/google';
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId='255905093138-rfiq30619vahja9b14jk00vbg2u3q92m'>
          {
            getLayout(
                  <Component {...pageProps} />
            )
          }
        </GoogleOAuthProvider>
      <ToastContainer style={{ zIndex: "9999999999"}}/>
      </QueryClientProvider>
    </Provider>
    )
}

export default MyApp
