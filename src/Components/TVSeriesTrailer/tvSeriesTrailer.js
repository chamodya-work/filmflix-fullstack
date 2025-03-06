import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import './tvSeriesTrailer.css';
import { useParams } from "react-router-dom";

const TVSeriesTrailer = () => {
    const {series_id } = useParams();
    const [series, setSeries] = useState({});
    const [reviews, setReviews] = useState([]);
    const [userMap, setUserMap] = useState({});
    const [loggedUser, setLoggedUser] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch(`http://localhost:8081/getSeriesById/${series_id}`);
                const seriesData = await result.json();
                setSeries(seriesData);
            } catch (error) {
                console.log('Error fetching movie data:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const result = await fetch(`http://localhost:8081/getReviewByContent/${series_id}`);
                const reviewResult = await result.json();
                setReviews(reviewResult);

                const userFetches = reviewResult.map(async (review) => {
                    try {
                        const userResult = await fetch(`http://localhost:8081/getGUserById/${review.user_id}`);
                        const fetchedUser = await userResult.json();
                        return { [review.user_id]: fetchedUser };
                    } catch (error) {
                        console.log(`Error fetching user ${review.user_id}:`, error);
                        return { [review.user_id]: null };
                    }
                });

                const userResults = await Promise.all(userFetches);
                const userMap = userResults.reduce((acc, user) => ({ ...acc, ...user }), {});
                setUserMap(userMap);
            } catch (error) {
                console.log('Error fetching reviews:', error);
            }
        };

        fetchData();
        fetchReviews();

        setLoggedUser(JSON.parse(localStorage.getItem("loggedUser")));

    }, [series_id]);

    const saveReview = () => {
        const reviewInput = document.getElementById("reviewInput").value;

        if(reviewInput === null){
            alert("Please enter a review first...!");
        }
        else{
            fetch('http://localhost:8081/addReview',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  contentId: series_id,
                  user_id: loggedUser?.guser_id,
                  reviewText: reviewInput,
                })
              })
              window.location.reload();
        }
    }


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
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    return (
      <div className="wrapper__trailer">
        <Navbar />
        <div className="trailer-box">
          <div className="trailer-box_firstSection">
            <div className="firstSection-left">
              <iframe
                width="800"
                height="450"
                src={series.trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            <div className="firstSection-middle"></div>
            <div className="firstSection-right">
              <img src={series.backdrop_path} alt="Back Drop" />
              <div>
                <p className="firstSection-right-topic">{series.name}</p>
                <p className="firstSection-right-overview">{series.overview}</p>
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

export default TVSeriesTrailer;