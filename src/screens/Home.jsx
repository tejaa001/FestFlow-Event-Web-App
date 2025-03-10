import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { BASE_URL, RawURL } from "../data";
import Eventcards from "../components/EventCard";
import useOnlineStaus from "../hooks/onlineStaus";
import { NetworkContext } from "../contex/ConnectionContex";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../contex/AuthContext";


const Home = () => {
  const [data, setData] = useState([]);
  let [filterDataEvent, setFilterDataEvent] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const navigate = useNavigate();
  const { searchtext } = useOutletContext();
  const { setMediaData } = useOutletContext();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const RawData = await fetch(`${RawURL}/get-feed`);
    const result = await RawData.json();
    setData(result.data.data);
    setMediaData(result.data.data);
    setFilterDataEvent(result.data.data);
  };

  useEffect(() => {
    HSeachItem(searchtext);
  }, [searchtext]);

  const HSeachItem = (text) => {
    const filterData = data.filter((item) => {
      return item.restaurantName.toLowerCase().includes(text.toLowerCase());
    });
    setFilterDataEvent(filterData);
  };

  const ShowHomeDetails = (homeId) => {
    navigate(`/home-detail/${homeId}`);
  };
  // console.log("accessToken", accessToken);

  const handleLikePost = async (postId) => {
    try {
      const response = await fetch(`http://108.174.58.176:4000/post/like?postId=${postId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (response.ok) {
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [postId]: true
        }));
        // alert('Post liked successfully');
      } else {
        // alert('Failed to like post');
        navigate("/login")
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  const handleAddComment = async (postId) => {
    const comment = prompt("Enter your comment:");
    if (comment) {
      try {
        const response = await fetch('http://108.174.58.176:4000/comment/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ postId, comment })
        });
        if (response.ok) {
          alert('Comment added successfully');
        } else {
          alert('Failed to add comment');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    }
  };

  const handleReplyComment = async (commentId) => {
    const reply = prompt("Enter your reply:");
    if (reply) {
      try {
        const response = await fetch('http://108.174.58.176:4000/comment/reply', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          },
          body: JSON.stringify({ commentId, comment: reply })
        });
        if (response.ok) {
          alert('Reply added successfully');
        } else {
          alert('Failed to add reply');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    }
  };
  let isAccess = false;
  if (accessToken != " ") {
    isAccess = true;
  }

  return (
    <div>
      <div className="card-page">
        {filterDataEvent.length === 0 ? (
          <div className="loader"></div>
        ) : (
          filterDataEvent.map((item) => (
            <Eventcards
              key={item.id}
              image={item.profilePicture}
              name={item.restaurantName}
              event={item.title}
              homeId={item.id}
              onCardClick={ShowHomeDetails}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
              onReplyComment={handleReplyComment}
              liked={likedPosts[item.id] || false}
              isAccess={isAccess}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;