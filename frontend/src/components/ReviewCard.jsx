import React, { Fragment, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { SelectUsername } from "../redux/loginSlice";
import { NavLink } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import shrimp from "../images/hero-shrimp.jpg";
import { Dialog, Transition } from "@headlessui/react";
import ImageUploading from "react-images-uploading";
import S3 from 'react-aws-s3';
window.Buffer = window.Buffer || require("buffer").Buffer;

const ReviewCard = ({ props, restID }) => {
  const [showForm, setShowForm] = useState(true);
  const [userRated, setUserRated] = useState(0);
  const [foodReviews, setFoodReviews] = useState(props.Reviews);
  const userReview = useRef(null);
  const username = useSelector(SelectUsername);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const cancelButtonRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [showReviews, setShowReviews] = useState(true);
  const [starsArray, setStarsArray] = useState(
    foodReviews.map((review) => {
      return review.UserRating;
    })
  );
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS,
    secretAccessKey: process.env.REACT_APP_SECRET,
}

const handleFileInput = (e) => {
  setSelectedFile(e.target.files[0]);
}

const uploadFile = async (file) => {
  const ReactS3Client = new S3(config);
  ReactS3Client
  .uploadFile(file, file.name)
  .then(data => console.log(data.location))
  .catch(err => console.error(err))
}
  const onChange = (e, imageList, addUpdateIndex) => {
    let files = e.target.files;
    setImages({ 'selectedFiles': files });
  };


  // const upload = (e) => {
  //   console.log(e.target);
  // }

  const toggleForm = () => {
    setShowForm(!showForm);
  };
  const ratingChanged = (newRating) => {
    setUserRated(newRating);
  };

  const newReview = () => {
    if (username === null) {
      alert("You must be logged in to leave a review!");
    } else {
      let newRating;
      // console.log(starsArray)
      if (starsArray.length===0){
        newRating=userRated;
      } else{
        newRating = ([...starsArray, userRated].reduce((a,b)=>a+b,0)/(starsArray.length+1)).toFixed(1);
      }    
      // console.log(newRating);
      const payload = {
        ID: restID,
        FoodID: props.FoodID,
        reviewData: {
          Username: username,
          UserRating: userRated,
          Description: userReview.current.value,
        },
        newAverageRating: Number(newRating),
      };
      fetch("/newReview", {
        method: "post",
        body: JSON.stringify(payload),
        headers: {
          "content-Type": "application/json",
        },
      }); 
      setFoodReviews([
        ...foodReviews,
        {
          Username: username,
          UserRating: userRated,
          Description: userReview.current.value,
          Date: "Just now",
        },
      ]);
      setStarsArray([...starsArray, userRated]);
      // toggleForm();
      userReview.current.value = "";
      setUserRated(0);
      setOpen2(false)
    }
  };

  return (
    <div className="card bg-gray-100 border rounded-md shadow-xl mx-2 md:mx-0 mb-2 mt-2 p-2 min-h-64 md:card-side transform transition duration-500 hover:scale-105">
      <div className="flex flex-col">
        {/* <div className="flex justify-center py-1 w-2/5">
       <img
         src={props.props.image_url}
           className="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"        
           alt="restaurant"
         />
       </div> */}
        <div className="text-xs text-center sm:text-sm lg:text-lg">
          <h2 className="card-title pt-2 font-bold text-center">
            {props.FoodName}!
          </h2>
          <hr></hr>
          <div className="flex flex-col items-center">
            <img className="h-32" src={shrimp} alt=""></img>
          </div>

          <h3
            className={
              starsArray.length === 0
                ? "h-12 lg:h-16 flex flex-col justify-center"
                : ""
            }
          >
            {starsArray.length === 0 && "No reviews yet..."}
            {starsArray.length !== 0 &&
              (starsArray.reduce((a, b) => a + b, 0) / starsArray.length).toFixed(1)}
            {starsArray.length !== 0 && "/5 Stars"}
          </h3>
          <div className="flex flex-col">
            <button
              onClick={() => setOpen(true)}
              id={props.FoodID}
              hidden={starsArray.length === 0}
              className="bg-blue-500 hover:bg-blue-600 text-white m-1  px-10 border text-sm border-blue-700 rounded"
            >
              User Reviews
            </button>
            {/* modal */}

            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                initialFocus={cancelButtonRef}
                onClose={setOpen}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                          <div className="sm:items-start md:text-left">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <Dialog.Title
                                as="h3"
                                className="text-lg font-medium leading-6 text-gray-900 text-center"
                              >
                                Reviews
                              </Dialog.Title>
                              <div className="mt-2 flex flex-col">
                                {foodReviews.map((review, index) => {
                                  return (
                                    <>
                                      <div key={index} className="border flex flex-row m-1 rounded bg-gray-100 shadow-lg">
                                        <div className="flex justify-center py-1 w-2/5 ">
                                          <img
                                            src={shrimp}
                                            className="restaurant_icon w-4/5 md:w-5/5 md:w-5/6 p-1 pt-2 mb-6 md:mb-0"
                                            alt="restaurant"
                                          />
                                        </div>
                                        <div className="card-body mt-1 w-3/5 text-xs text-left sm:text-sm lg:text-lg">
                                          <h2 className="card-title pt-2 text-sm font-bold">
                                            {review.Username}, gave it{" "}
                                            {review.UserRating}/5 Stars
                                          </h2>
                                          <p className="text-xs">
                                            "{review.Description}"
                                          </p>
                                          <p className="text-xs">
                                            {review.Date.slice(0, 10)}
                                          </p>
                                        </div>
                                      </div>
                                    </>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Cancel
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>

            {/* modal */}
          </div>
        </div>
        <NavLink
          onClick={() => setOpen2(true)}
          disabled={username == null}
          className={
            username != null
              ? "bg-green-500 hover:bg-green-600 text-white m-1 px-10 border border-blue-700 rounded text-sm text-center"
              : "bg-red-500 hover:bg-red-600 text-white m-1 px-10 border border-blue-700 rounded text-sm"
          }
          to={username === null ? "/login" : ""}
        >
          {username == null && "Log in to review"}
          {username != null && "Leave a Review"}
        </NavLink>

        {/* modal2 */}

        <Transition.Root show={open2} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen2}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                      <div className="sm:items-start md:text-left">
                        {/* <div className="sm:flex sm:items-start md:text-left"> */}
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-medium leading-6 text-gray-900 text-center"
                          >
                            {/* Leave A Review Title */}
                            Write Your Review
                          </Dialog.Title>
                          <div className="mt-2 flex flex-col">
                                <>
                                  <div>
                                    <div>
                                      <div className="flex justify-center p-2 m-1">
                                        <ReactStars
                                          count={5}
                                          onChange={ratingChanged}
                                          size={18}
                                          activeColor="#ffd700"
                                        />
                                      </div>
                                      {/* image uploader  */}
                                      {/* <div>
                                        <div className="App">
                                          <ImageUploading
                                            multiple
                                            value={images}
                                            onChange={onChange}
                                            maxNumber={maxNumber}
                                            dataURLKey="data_url"
                                          >
                                            {({
                                              imageList,
                                              onImageUpload,
                                              onImageRemoveAll,
                                              onImageUpdate,
                                              onImageRemove,
                                              isDragging,
                                              dragProps,
                                            }) => (
                                              <div className="upload__image-wrapper flex flex-col items-center">
                                                <button
                                                  style={
                                                    isDragging
                                                      ? { color: "red" }
                                                      : undefined
                                                  }
                                                  onClick={onImageUpload}
                                                  className='"m-1 px-10 border w-1/2 border-gray-700 rounded text-sm text-center'
                                                  {...dragProps}
                                                >
                                                  Click or Drop here
                                                </button>
                                                &nbsp;
                                                <button
                                                  className="-mt-5 mb-2 px-10 border w-1/2 border-gray-700 rounded text-sm text-center"
                                                  onClick={onImageRemoveAll}
                                                >
                                                  Remove all images
                                                </button>
                                                {imageList.map(
                                                  (image, index) => (
                                                    <div
                                                      key={index}
                                                      className="image-item"
                                                    >
                                                      <img
                                                        src={image["data_url"]}
                                                        alt=""
                                                        width="100"
                                                      />
                                                      <div className="image-item__btn-wrapper">
                                                        <button
                                                          className="m-1 px-5 border border-gray-700 rounded text-sm text-center"
                                                          onClick={() =>
                                                            onImageUpdate(index)
                                                          }
                                                        >
                                                          Update
                                                        </button>
                                                        <button
                                                          className="m-1 px-5 border border-gray-700 rounded text-sm text-center"
                                                          onClick={() =>
                                                            onImageRemove(index)
                                                          }
                                                        >
                                                          Remove
                                                        </button>
                                                      </div>
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </ImageUploading>
                                        </div>
                                      </div> */}
                                      {/* image uploader */}
                                      <div className = 'flex flex-col items-center'>
                                        <input
                                          ref={userReview}
                                          className="text-lg m-2 border w-full"
                                          placeholder="Write a review..."
                                        ></input>
                                        <button
                                          className="bg-green-500 hover:bg-green-700 text-white text-xs py-2 px-3 mx-2 mt-5 -mb-3 rounded w-1/2"
                                          onClick={newReview}
                                          disabled={userRated === 0}
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 items-center sm:flex sm:flex-col sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setOpen2(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* modal2 */}
      </div>
    </div>
  );
};

export default ReviewCard;
