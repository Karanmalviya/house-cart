import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import {
  collection,
  getDoc,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slider = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userPic =
    "https://openclipart.org/download/247319/abstract-user-flat-3.svg";

  useEffect(() => {
    const fetchListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setLoading(false);
      setListings(listings);
    };
    fetchListings();
    console.log(listings === null ? "loading" : listings);
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <div>
        {" "}
        {listings === null ? (
          <Spinner />
        ) : (
          <div>
              {listings.map(({ data, id }) => (
            <div className="slide-container">
                <Fade scale={0.4}>
                  <img
                    key={id}
                    style={{ width: "100%", height: "43rem" }}
                    src={data.imgUrls[0]}
                    alt={data.name}
                  />
                </Fade>
            </div>
              ))}
          </div>
        )}
      </div>
      {/* <div>
        {listings === null ? (
          <Spinner />
        ) : (
          <div>
            {listings.map(({ data, id }) => (
              <SimpleImageSlider
                width={896}
                height={504}
                // images={images}
                showBullets={true}
                showNavs={true}
                src={data.imgUrls[0]}
                alt={data.name}
              />
            ))}
          </div>
        )}
      </div> */}

      {/* <div className="container-fluid">
        {listings === null ? (
          <Spinner />
        ) : (
          <div>
            {listings.map(({ data, id }) => (
              <div
                key={id}
                onClick={() => {
                  navigat(`/category/${data.type}/${id}`);
                }}>
                <h6 className="bg-info text-light p-2 m-0 ">
                  <img alt="user pic" src={userPic} height={35} width={35} />
                  <span className="ms-2"> {data.name}</span>
                </h6>
                <img
                  src={data.imgUrls[0]}
                  height={400}
                  width={800}
                  alt={data.name}
                />
              </div>
            ))}
          </div>
        )}
      </div> */}
    </>
  );
};

export default Slider;
