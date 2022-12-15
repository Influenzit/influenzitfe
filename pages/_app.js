import '../styles/globals.css'
import { Provider } from "react-redux"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store } from '../app/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <Provider store={store}>

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
