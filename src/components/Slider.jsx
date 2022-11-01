import React, { useState, useEffect } from "react";
import { db } from "../firebase.config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import SwiperCore, { Autoplay } from "swiper/core";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/less";
import "swiper/less/navigation";
import "swiper/less/pagination";
import "swiper/css/scrollbar";
import "../styles/Slider.css";
import { ImLocation } from "react-icons/im";

export default function Slider() {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  // const myStyle = {
  //   backgroundImage: `url('${listings.map(
  //     ({ data, id }) => data.imageUrl[0]
  //   )}')`,
  //   backgroundSize: "cover",
  //   height: "100vh",
  //   backgroundRepeat: "no-repeat",
  // };
  return (
    <>
      {listings === null ? (
        <Spinner />
      ) : (
        <div>
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            centeredSlides={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={true}
            className="mySwiper">
            {listings.map(({ data, id }) => (
              <SwiperSlide>
                <div className="box">
                  <img
                    className="slider"
                    key={id}
                    src={data.imgUrls[0]}
                    alt={data.name}
                  />
                  <div className="text">
                    <h2 className="text-1">{data.name}</h2>
                    <h6 className="text-1">
                      <ImLocation />
                      {data.address}
                    </h6>
                    <button
                      onClick={() => {
                        navigate(`/category/${data.type}/${id}`);
                      }}
                      className="btn btn-text">
                      SHOW NOW
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
}
