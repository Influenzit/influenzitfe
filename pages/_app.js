import '../styles/globals.css'
import { Provider } from "react-redux"; 
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { store } from '../app/store';
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
      </QueryClientProvider>
    </Provider>
    )
}

export default MyApp
