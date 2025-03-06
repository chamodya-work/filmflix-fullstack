import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import '../MovieTrailer/movieTrailer.css';
import docImages from '../../assets/documentry/docImages';
import { useParams } from "react-router-dom";

const DocTrailer = () => {
  const { doc_id } = useParams();
  const [doc, setDoc] = useState({});
  const [reviews, setReviews] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [loggedUser, setLoggedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `http://localhost:8081/getDocById/${doc_id}`
        );
        const docData = await result.json();
        setDoc(docData);
      } catch (error) {
        console.log("Error fetching movie data:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const result = await fetch(
          `http://localhost:8081/getReviewByContent/${doc_id}`
        );
        const reviewResult = await result.json();
        setReviews(reviewResult);

        const userFetches = reviewResult.map(async (review) => {
          try {
            const userResult = await fetch(
              `http://localhost:8081/getGUserById/${review.user_id}`
            );
            const fetchedUser = await userResult.json();
            return { [review.user_id]: fetchedUser };
          } catch (error) {
            console.log(`Error fetching user ${review.user_id}:`, error);
            return { [review.user_id]: null };
          }
        });

        const userResults = await Promise.all(userFetches);
        const userMap = userResults.reduce(
          (acc, user) => ({ ...acc, ...user }),
          {}
        );
        setUserMap(userMap);
      } catch (error) {
        console.log("Error fetching reviews:", error);
      }
    };

    fetchData();
    fetchReviews();

    setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));
  }, [doc_id]);

  const saveReview = () => {
    const reviewInput = document.getElementById("reviewInput").value;

    if (reviewInput === null) {
      alert("Please enter a review first...!");
    } else {
      fetch("http://localhost:8081/addReview", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentId: doc_id,
          user_id: loggedUser.guser_id,
          reviewText: reviewInput,
        }),
      });
      window.location.reload();
    }
  };

  const deleteReview = (reviewId) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (confirmDelete) {
        fetch(`http://localhost:8081/deleteReview/${reviewId}`, {
          method: "DELETE",
        })
          .then(() => window.location.reload())
          .catch((error) => console.log("Error deleting review:", error));
      }
    }; 

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="wrapper__trailer">
      <Navbar />
      <div className="trailer-box">
        <div className="trailer-box_firstSection">
          <div className="firstSection-left">
            <iframe
              width="550"
              height="320"
              src={doc.trailer}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="firstSection-middle"></div>
          <div className="firstSection-right">
            <img src={docImages[doc.backdrop_path]} alt="Back Drop" />
            <div>
              <p className="firstSection-right-topic">{doc.name}</p>
              <p className="firstSection-right-overview">{doc.overview}</p>
            </div>
          </div>
        </div>
        <div className="trailer-box_secondSection">
          <h1 className="secondSection-reviews">Reviews</h1>
          <div className="secondSection-reviews-box">
            {reviews.map((review) => (
              <div key={review.id}>
                <h2>{userMap[review.user_id]?.name || "Unknown User"}</h2>
                <p>"{review.reviewText}"</p>
                <h4>{formatDate(review.timeStamp)}</h4>

                {loggedUser?.guser_id === review.user_id && (
                  <button
                    className="delete-review-button"
                    onClick={() => deleteReview(review.review_id)}
                  >
                    Delete
                  </button>
                )}
                  

              </div>
            ))}
          </div>
          <h2 className="secondSection-addReview secondSection-reviews">
            Add a Review
          </h2>
          <form>
            <textarea
              className="secondSection-addReview-textArea"
              id="reviewInput"
            ></textarea>
            <input
              className="secondSection-addReview-button"
              type="button"
              value="Review"
              onClick={saveReview}
            ></input>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DocTrailer;