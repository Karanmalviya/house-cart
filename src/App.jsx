import React from "react";
import HomePages from "./pages/HomePages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Offers from "./pages/Offers";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Category from "./pages/Category";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";
// import HomePagePrivateRoute from "./components/HomePagePrivateRoute";
import ContactUs from "./pages/ContactUs";
import Ads from "./pages/Ads";
import Explore from "./pages/Explore";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />

      <Routes>
        <Route path='/' element={<PrivateRoute />}>
          <Route path='/' element={<HomePages />} />
        </Route>
        <Route path='/home' element={<PrivateRoute />}>
          <Route path='/home' element={<HomePages />} />
        </Route>
        <Route path='/offers' element={<PrivateRoute />}>
          <Route path='/offers' element={<Offers />} />
        </Route>
        <Route path='/explore' element={<PrivateRoute />}>
          <Route path='/explore' element={<Explore />} />
        </Route>
        {/* <Route path="/" element={<HomePages />} /> */}
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/category/:categoryName' element={<Category />} />
        <Route path='/editlisting/:listingId' element={<EditListing />} />
        {/* <Route path="/offers" element={<Offers />} /> */}
        <Route path='/ads' element={<Ads />} />

        <Route path='/signin' element={<SignIn />} />
        <Route path='/profile' element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgetpassword' element={<ForgotPassword />} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route
          path='/category/:categoryName/:listingId'
          element={<Listing />}></Route>
        <Route path='/contact/:landlordId' element={<Contact />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
