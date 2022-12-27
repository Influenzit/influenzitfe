import '../styles/globals.css'
import { Provider } from "react-redux"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>
      <Script src="https://cdn.tiny.cloud/1/uxnau7otzh0wddqctwllaa833wa4bmzw0cn6hu84u7mx5uiv/tinymce/5/tinymce.min.js" referrerpolicy="origin"></Script>

      <QueryClientProvider client={queryClient}>
      {
       getLayout(
            <Component {...pageProps} />
       )
      }
      <ToastContainer />
      </QueryClientProvider>
    </Provider>
    )
}

export default MyApp
