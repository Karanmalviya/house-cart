import React from "react";
import Layout from "../components/Layout/Layout";
import { getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase.config";
import {
  doc,
  // updateDoc,
  // serverTimestamp,
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  where,
} from "firebase/firestore";
import { useEffect } from "react";
import ListingItem from "../components/ListingItems";
import EmptyBox from "../components/EmptyBox";
import Spinner from "../components/Spinner";
import { AiOutlinePlus } from "react-icons/ai";

export default function Ads() {
  const navigate = useNavigate();
  const [listings, setListings] = useState("");
  const auth = getAuth();
  const [loading, setLoading] = useState(true);
  //delete handler
  const onDelete = async (listingId) => {
    if (window.confirm("Are You Sure  want to delete ?")) {
      // await deleteDoc(doc, (db, "listings", listingId));
      await deleteDoc(doc(db, "listings", listingId));
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListings(updatedListings);
      toast.success("Listing Deleted Successfully");
    }
  };

  //edit handler
  const onEdit = (listingId) => {
    navigate(`/editlisting/${listingId}`);
  };

  //useeffect for getting data
  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("useRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      console.log(querySnap);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      console.log(listings);
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();

  }, [auth.currentUser.uid]);
  return (
    <Layout>
      <div>
        {loading ? (
          <Spinner />
        ) : listings && listings.length > 0 ? (
          <>
            <div className="mt-3">
              <div className="container">
                <span className="post-btn">
                  <button className="btn-de btn btn-primary">
                    <Link to="/create-listing" className="link-logo">
                      <AiOutlinePlus />
                      New
                    </Link>
                  </button>
                </span>
                {listings && listings?.length > 0 && (
                  <>
                    <div>
                      {listings.map((listing) => (
                        <ListingItem
                          key={listing.id}
                          listing={listing.data}
                          id={listing.id}
                          onDelete={() => onDelete(listing.id)}
                          onEdit={() => onEdit(listing.id)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <EmptyBox />
        )}
      </div>
    </Layout>
  );
}


