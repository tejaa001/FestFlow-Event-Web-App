import { useEffect, useState } from "react"

const useOnlineStaus = () => {
    const [onlineStatus,setonlineStatus] = useState(true)

    useEffect(()=>{
        window.addEventListener("online",(event)=>{
            setonlineStatus(true)
        });

        window.addEventListener("offline",(event)=>{
            setonlineStatus(false)
        });
    },[])
    return onlineStatus
}

export default useOnlineStaus