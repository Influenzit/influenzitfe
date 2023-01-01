import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const getSocketInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    window.Pusher = Pusher;



    let options = {}
    if(process.env.SOCKET_SERVER === 'echo'){
      options = {
        broadcaster: "pusher",
        key: process.env.NEXT_PUBLIC_ECHO_SOCKET_KEY,
        wsHost: process.env.NEXT_PUBLIC_ECHO_SOCKET_HOST,
        forceTLS: false,
        encrypted: false,
        wsPort: process.env.NEXT_PUBLIC_ECHO_SOCKET_PORT,
        wssPort: process.env.NEXT_PUBLIC_ECHO_SOCKET_SSL_PORT,
        cluster: process.env.NEXT_PUBLIC_ECHO_SOCKET_CLUSTER,
        
      }
    }else{
      options = {
        broadcaster: "pusher",
        key: process.env.NEXT_PUBLIC_PUSHER_SOCKET_KEY,
        cluster: process.env.NEXT_PUBLIC_PUSHER_SOCKET_CLUSTER,
        encrypted: true,
        forceTLS: true,
      }
    }

    const socketInstance = new Echo({
      ...options, 
      authEndpoint: process.env.NEXT_PUBLIC_SOCKET_AUTH_ENDPOINT,
      disableStats: process.env.NEXT_PUBLIC_SOCKET_DISABLE_STAT,
      enabledTransports: process.env.NEXT_PUBLIC_SOCKET_ENABLED_TRANSPORT.split(','),
      auth: {
        headers: {
          authorization: !!token ? `Bearer ${token}` : "",
        },
      }
    })

    if(process.env.NEXT_PUBLIC_SOCKET_ENABLE_LOG){

      socketInstance.channel('testchannel').listen(".Test", (e) => {
        console.log('.TestEvent', e)
      })

      // The connection to Channels is open and authenticated with your app
      socketInstance.connector.pusher.connection.bind('connected', (payload) => {
          console.log('connected!', payload);
      });

      // PING FROM SERVER
      socketInstance.connector.pusher.connection.bind('message', (payload) => {
          console.log('message', payload);
      });


    }

    return socketInstance
}
