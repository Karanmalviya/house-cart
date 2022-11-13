// import React, { useState, useEffect, useRef } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { useNavigate } from "react-router-dom";
// import Layout from "../components/Layout/Layout";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import Spinner from "../components/Spinner";
// import { AiOutlineFileAdd } from "react-icons/ai";
// import { toast } from "react-toastify";
// import {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } from "firebase/storage";
// import { db } from "../firebase.config";
// import { addDoc, collection, serverTimestamp } from "firebase/firestore";
// import "../index.css";

// function index() {
//   const [loading, setLoading] = useState(false);
//   const [geoLoactionEnable, setGeoLocationEnable] = useState(false);
//   const [formData, setFormData] = useState({
//     type: "rent",
//     name: "",
//     bedrooms: 1,
//     bathrooms: 1,
//     parking: false,
//     furnished: false,
//     address: "",
//     offer: false,
//     regularPrice: 0,
//     discountedPrice: 0,
//     images: {},
//     latitude: 0,
//     longitude: 0,
//   });

//   const {
//     type,
//     name,
//     bedrooms,
//     bathrooms,
//     parking,
//     furnished,
//     address,
//     offer,
//     regularPrice,
//     discountedPrice,
//     images,
//     latitude,
//     longitude,
//   } = formData;

//   const auth = getAuth();
//   const navigate = useNavigate();
//   const isMounted = useRef(true);

//   useEffect(() => {
//     if (isMounted) {
//       onAuthStateChanged(auth, (user) => {
//         setFormData({
//           ...formData,
//           useRef: user.uid,
//         });
//       });
//     } else {
//       navigate("/signin");
//     }

//     // eslint-disable-next-line
//   }, []);

//   if (loading) {
//     return <Spinner />;
//   }

//   //mutate func
//   const onChangeHandler = (e) => {
//     let boolean = null;
//     if (e.target.value === "true") {
//       boolean = true;
//     }
//     if (e.target.value === "false") {
//       boolean = false;
//     }
//     //files
//     if (e.target.files) {
//       setFormData((prevState) => ({
//         ...prevState,
//         images: e.target.files,
//       }));
//     }
//     //text/booleans/number
//     if (!e.target.files) {
//       setFormData((prevState) => ({
//         ...prevState,
//         [e.target.id]: boolean ?? e.target.value,
//       }));
//     }
//   };

//   //form submit
//   const onSubmit = async (e) => {
//     e.preventDefault();
//     // console.log(formData);
//     if (discountedPrice >= regularPrice) {
//       setLoading(false);
//       toast.error("Discount Price should be less than Regular Price");
//       return;
//     }
//     if (images > 6) {
//       setLoading(false);
//       toast.error("Max 6 Images can be selected");
//       return;
//     }
//     let geoLocation = {};
//     let location;
//     if (geoLoactionEnable) {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBTBqsvDapmpMjrJDDp0F34jIpNcIeWwhk`
//       );
//       const data = await response.json();
//       console.log(data);
//     } else {
//       geoLocation.lat = latitude;
//       geoLocation.lng = longitude;
//       // location = address;
//     }

//     //store images to firebase storage
//     const storeImage = async (image) => {
//       return new Promise((resolve, reject) => {
//         const storage = getStorage();
//         const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
//         const storageRef = ref(storage, "images/" + fileName);
//         const uploadTask = uploadBytesResumable(storageRef, image);
//         uploadTask.on(
//           "state_changed",
//           (snapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             console.log("uplloas is" + progress + "% done");
//             switch (snapshot.state) {
//               case "paused":
//                 console.log("upload is paused");
//                 break;
//               case "running":
//                 console.log("upload is runnning");
//             }
//           },
//           (error) => {
//             reject(error);
//           },
//           //success
//           () => {
//             getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//               resolve(downloadURL);
//             });
//           }
//         );
//       });
//     };
//     const imgUrls = await Promise.all(
//       [...images].map((image) => storeImage(image))
//     ).catch(() => {
//       setLoading(false);
//       toast.error("Images not uploaded");
//       return;
//     });
//     console.log(imgUrls);

//     //save form data
//     const formDataCopy = {
//       ...formData,
//       imgUrls,
//       geoLocation,
//       timestamp: serverTimestamp(),
//     };
//     formData.location = address;
//     delete formDataCopy.images;
//     // delete formDataCopy.address;
//     !formDataCopy.offer && delete formDataCopy.discountedPrice;
//     const docRef = await addDoc(collection(db, "listings"), formDataCopy);
//     setLoading(false);
//     toast.success("Listing Created!");
//     navigate(`/category/${formDataCopy.type}/${docRef.id}`);
//   };

//   return (
//     <div>
//       <div className='container'>
//         <div
//           className='row d-flex justify-content-center align-items-center'
//           style={{ height: "100vh" }}>
//           <div className='col-lg-5'>
//             <h4 className='text-center mb-4 border-bottom pb-3'>
//               Registration Form
//             </h4>
//             <div className='form'>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <label>House Name</label>
//                   <input
//                     id='charId'
//                     onkeyup='validFirstname()'
//                     className='form-control border-dark'
//                   />
//                   <p id='char-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-6'>
//                   <label>Bedroom</label>
//                   <input
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                     className='form-control border-dark'
//                   />
//                   <p id='Lastname-err' />
//                 </div>
//                 <div className='col-lg-6'>
//                   <label>Bathroom</label>
//                   <input
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                     className='form-control border-dark'
//                   />
//                   <p id='Lastname-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-6'>
//                   <label>Parking</label>
//                   <input
//                     type='radio'
//                     name='parking'
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                   />
//                   <input
//                     type='radio'
//                     name='parking'
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                   />
//                   <p id='Lastname-err' />
//                 </div>
//                 <div className='col-lg-6'>
//                   <label>Furnished</label>
//                   <input
//                     type='radio'
//                     name='Furnishd'
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                   />
//                   <input
//                     type='radio'
//                     name='Furnishd'
//                     id='LastnameId'
//                     onkeyup='validLastname()'
//                   />
//                   <p id='Lastname-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <label>Address</label>
//                   <input
//                     type='messege'
//                     id='mobileId'
//                     onchange='validmobile()'
//                     className='form-control border-dark'
//                   />
//                   <p id='mobile-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-6'>
//                   <label>Latitude</label>
//                   <input
//                     id='aadhharno'
//                     name='aadhhar'
//                     onchange='validateAadhaar()'
//                     className='form-control border-dark'
//                   />
//                   <p id='aadhhar-err' />
//                 </div>
//                 <div className='col-lg-6'>
//                   <label>Logitude</label>
//                   <input
//                     id='aadhharno'
//                     name='aadhhar'
//                     onchange='validateAadhaar()'
//                     className='form-control border-dark'
//                   />
//                   <p id='aadhhar-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-6'>
//                   <label htmlfor='offer'>Offer :</label>
//                   <input
//                     type='radio'
//                     defaultValue='{true}'
//                     onchange='{onChangeHandler}'
//                     name='offer'
//                     id='offer'
//                     onkeyup='validLastname()'
//                   />
//                   <input
//                     type='radio'
//                     name='offer'
//                     defaultValue='{false}'
//                     defaultchecked
//                     id='offer'
//                     onchange='{onChangeHandler}'
//                     onkeyup='validLastname()'
//                   />
//                   <p id='Lastname-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <label>Regular Price</label>
//                   <input
//                     id='aadhharno'
//                     name='aadhhar'
//                     onchange='validateAadhaar()'
//                     className='form-control border-dark'
//                   />
//                   <p id='aadhhar-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <label>Discounted Price</label>
//                   <input
//                     id='aadhharno'
//                     name='aadhhar'
//                     onchange='validateAadhaar()'
//                     className='form-control border-dark'
//                   />
//                   <p id='aadhhar-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <label htmlfor='formFile'>Select Images</label>
//                   <input
//                     type='file'
//                     id='images'
//                     name='images'
//                     onchange='{onChangeHandler}'
//                     max={6}
//                     accept='.jpg,.png,.jpeg'
//                     multiple
//                     required
//                     className='form-control border-dark'
//                   />
//                   <p id='aadhhar-err' />
//                 </div>
//               </div>
//               <div className='row mb-1'>
//                 <div className='col-lg-12'>
//                   <input
//                     className='btn btn-dark w-100'
//                     type='submit'
//                     defaultValue='Save'
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default index;
