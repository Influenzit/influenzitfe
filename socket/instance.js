import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const getSocketInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    window.Pusher = Pusher;

    const socketInstance = new Echo({
      broadcaster: "pusher",
      key: process.env.NEXT_PUBLIC_SOCKET_KEY,
      wsHost: process.env.NEXT_PUBLIC_SOCKET_HOST,
      authEndpoint: process.env.NEXT_PUBLIC_SOCKET_AUTH_ENDPOINT,
      encrypted: true,
      forceTLS: false,
      wsPort: process.env.NEXT_PUBLIC_SOCKET_PORT,
      wssPort: process.env.NEXT_PUBLIC_SOCKET_SSL_PORT,
      disableStats: process.env.NEXT_PUBLIC_SOCKET_DISABLE_STAT,
      cluster: "mt1",
      enabledTransports: process.env.NEXT_PUBLIC_SOCKET_ENABLED_TRANSPORT.split(','),
      auth: {
        headers: {
          authorization: !!token ? `Bearer ${token}` : "",
        },
      },
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
