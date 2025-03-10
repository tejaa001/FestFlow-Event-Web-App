import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const Eventcards = ({
  image,
  name,
  event,
  homeId,
  onCardClick,
  onLikePost,
  onAddComment,
  onReplyComment,
  liked,
}) => {
  return (
    <div className="cards-container" onClick={() => onCardClick(homeId)}>
      <div className="image-container">
        <img src={image} alt={event} />
      </div>
      <div className="details-container">
        <span>Venue: {name}</span>
        <span>Title: {event}</span>
      </div>
      <div className="actions-container">
        <button
          className={`like-button ${liked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onLikePost(homeId);
          }}
        >
          <FaHeart /> Like
        </button>
        <button
          className="comment-button"
          onClick={(e) => {
            e.stopPropagation();
            onAddComment(homeId);
          }}
        >
          <FaComment /> Comment
        </button>
        <button className="share-button">
          <FaShare /> Share
        </button>
      </div>
    </div>
  );
};

export default Eventcards;
