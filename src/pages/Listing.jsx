import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
// import { getAuth } from "firebase/auth";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/Listing.css";

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

export default function Listing() {
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  // const navigate = useNavigate();
  const params = useParams();
  // const auth = getAuth();

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Layout>
      <div
        className='container d-flex align-items-center justify-content-center'
        style={{ marginTop: "6rem" }}>
        <div className='card' style={{ width: "600px" }}>
          <div className='card-header'>
            {listing.imgUrls === undefined ? (
              <Spinner />
            ) : (
              <>
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
                  className='mySwiper'>
                  {listing.imgUrls.map((url, index) => (
                    <SwiperSlide>
                      <img
                        src={listing.imgUrls[index]}
                        height={400}
                        width={800}
                        alt={listing.name}
                        key={index}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            )}
          </div>
          <div className='card-body'>
            <h3>{listing.name}</h3>
            <h6>
              Price : ₹
              {listing.offer ? listing.discountedPrice : listing.regularPrice}
            </h6>
            <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
            <p>
              {listing.offer && (
                <span>
                  {listing.regularPrice - listing.discountedPrice} Discount
                </span>
              )}
            </p>
            <p>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <p>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 Kitchen"}
            </p>
            <p>{listing.parking ? `Parking spot` : "no spot for parking"}</p>
            <p>{listing.furnished ? `furnished house` : "not furnished"}</p>
            <Link
              className='btn btn-success'
              to={`/contact/${listing.useRef}?listingName=${listing.name}`}>
              Contact Landlord
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
