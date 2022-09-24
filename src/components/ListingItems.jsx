import React from "react";
import { FaBath, FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../index.css";
import { TbToolsKitchen } from "react-icons/tb";
// {FaBath}
export default function ListingItems({ listing, id }) {
  return (
    <>
      <div className="d-flex align-content-center justify-content-center">
        <div className="card category-link" style={{ width: "800px" }}>
          <Link to={`/category/${listing.type}/${id}`}>
            <div className="row container p-2">
              <div className="col-md-5">
                <img
                  src={listing.imgUrls[0]}
                  alt={listing.name}
                  height={200}
                  width={300}
                />
              </div>
              <div className="col-md-5">
                <p>{listing.location}</p>
                <h2>{listing.name}</h2>
                <p>
                  {listing.offer ? listing.discountPrice : listing.regularPrice}{" "}
                  {listing.type === "rent" && "/ Month"}
                </p>
                <p>
                  <FaBed />{" "}
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} Bedrooms`
                    : "1 Bedroom"}
                </p>
                <p>
                  <TbToolsKitchen />{" "}
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} Kitchen`
                    : "1 Kitchen"}
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
