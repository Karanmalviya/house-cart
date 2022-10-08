import React from "react";
import { FaBed } from "react-icons/fa";
import { Link } from "react-router-dom";
import { TbToolsKitchen, TbGeometry } from "react-icons/tb";
import "../styles/ListingItem.css";
import "../index.css";

export default function ListingItems({ listing, id, onDelete, onEdit }) {
  return (
    <div className="card-item-parent d-flex align-content-center justify-content-center">
      <div
        className="item-card category-link mb-2 w-75"
        style={{ width: "800px" }}>
        <Link to={`/category/${listing.type}/${id}`}>
          <div className="row p-2">
            <div className="col-md-5 item-card-container1">
              <img
                src={listing.imgUrls[0]}
                alt={listing.name}
                height={200}
                width={300}
              />
            </div>
            <div className="col-md-5 item-card-container2">
              <p>{listing.location}</p>
              <h2>{listing.name}</h2>
              <p>
                {listing.offer ? listing.discountPrice : listing.regularPrice}{" "}
                {listing.type === "rent" && "/Month"}
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
              <p>
                <TbGeometry />
                200 sqft
              </p>
            </div>
          </div>
        </Link>
        <div className="m-2 p-2 btn-space">
          <div>
            {onDelete && (
              <button
                className="btn-de btn btn-danger"
                onClick={() => {
                  onDelete(listing.id, listing.name);
                }}>
                Delete
              </button>
            )}
          </div>
          &nbsp;
          <div>
            {onEdit && (
              <button
                className="btn-de btn btn-info"
                onClick={() => {
                  onEdit(listing.id, listing.name);
                }}>
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
