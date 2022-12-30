import Echo from "laravel-echo";
import Pusher from "pusher-js";

export const getSocketInstance = () => {
    const token = typeof window !== "undefined" && localStorage.getItem("token");
    window.Pusher = Pusher;
    console.log({
        broadcaster: "pusher",
        key: process.env.NEXT_PUBLIC_PUSHER_API_KEY,
        wsHost: process.env.NEXT_PUBLIC_SOCKET_API_URI,
        authEndpoint: process.env.NEXT_PUBLIC_SOCKET_API_URI + "/broadcasting/auth",
        encrypted: true,
        forceTLS: false,
        wsPort: 6001,
        wssPort: 6001,
        disableStats: true,
        cluster: "mt1",
        enabledTransports: ["ws", "wss"],
        auth: {
          headers: {
            authorization: !!token ? `Bearer ${token}` : "",
          },
        }})
    return (
        new Echo({
            broadcaster: "pusher",
            key: process.env.NEXT_PUBLIC_PUSHER_API_KEY,
            wsHost: process.env.NEXT_PUBLIC_SOCKET_API_URI,
            authEndpoint: process.env.NEXT_PUBLIC_SOCKET_API_URI + "/broadcasting/auth",
            encrypted: true,
            forceTLS: false,
            wsPort: 6001,
            wssPort: 6001,
            disableStats: true,
            cluster: "mt1",
            enabledTransports: ["ws", "wss"],
            auth: {
              headers: {
                authorization: !!token ? `Bearer ${token}` : "",
              },
            },
          }
    )
    )
}