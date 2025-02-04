import { useOutletContext, useParams } from "react-router-dom";

const HomeDetails =()=>{

    const {mediaData} = useOutletContext();
     const { homeId } = useParams();
    // console.log(mediaData);
     
    return(
        <>
        <div className="card-page">
           <div style={{width:"500px"} }>
               {mediaData.length==0?<div class="loader"></div> : mediaData.map((item) =>{                
                return(
                    <>
                    {item.id==homeId? item.media.map((url)=><img src={url} style={{width:"500px"}} alt="" />) : ""
                    }
                
                    </>
                )
            })}
            </div>
        </div>
        </>
    )
}

export default HomeDetails