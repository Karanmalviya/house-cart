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
import styled from "styled-components";

//
const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  overflow: hidden;
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #${(props) => props.bg};
`;
const ImgContainer = styled.div`
  height: 94%;
  width: 200%;
  flex: 1;
`;
const Image = styled.img`
  height: 40rem;
  width: 50rem;
  margin-left:4rem;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;
const Title = styled.h1`
  font-size: 70px;
`;
const Description = styled.p`
  margin: 10px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
`;

//
const Slider = () => {
  // Slider
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 3);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  //
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
      <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
          <BsFillArrowLeftCircleFill />
        </Arrow>
        {listings === null ? (
          <Spinner />
        ) : (
          <Wrapper slideIndex={slideIndex}>
            {listings.map(({ data, id }) => (
              <Slide
                // bg={item.bg}
                key={id}>
                <ImgContainer>
                  <Image src={data.imgUrls[0]} alt={data.name} />
                </ImgContainer>
                <InfoContainer>
                  <Title>{data.name}</Title>
                  <Description>{data.address}</Description>
                  <Button
                    onClick={() => {
                      navigate(`/category/${data.type}/${id}`);
                    }}>
                    SHOW NOW
                  </Button>
                </InfoContainer>
              </Slide>
            ))}
          </Wrapper>
        )}
        <Arrow direction="right" onClick={() => handleClick("right")}>
          <BsFillArrowRightCircleFill />
        </Arrow>
      </Container>

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
