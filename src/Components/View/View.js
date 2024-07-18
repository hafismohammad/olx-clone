  import React, { useContext, useEffect, useState } from 'react';
  import './View.css';
  import { postContext } from '../../store/postContext';
  import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
  import { collection, query, where, getDocs, deleteDoc, doc  } from "firebase/firestore"; 
  import {  useNavigate } from 'react-router-dom';

  function View() {
    const [userDetails, setUserDetails] = useState(null);
    const { postDetails, setPostDetails } = useContext(postContext);
    const { firestore } = useContext(FirebaseContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

   
    const handleDelete = async () => {
      if (user.displayName === userDetails.username) {
        try {
          const postDocRef = doc(firestore, "products", postDetails.id); 
          await deleteDoc(postDocRef);
          window.alert("Are you sure")
          navigate('/')
          console.log("Post deleted successfully");

        } catch (error) {
          console.error("Error deleting post:", error);
        }
      }
    }  

    useEffect(() => {

      if (!postDetails) {
        const savedPostDetails = JSON.parse(localStorage.getItem('postDetails'));
        if (savedPostDetails) {
          setPostDetails(savedPostDetails);
        } else {
          console.error("Post details are missing.");
          return;
        }
      } else {
        // Save postDetails to local storage
        localStorage.setItem('postDetails', JSON.stringify(postDetails));
      }

      async function getUser() {
        if (!postDetails) {
          console.error("Post details are missing.");
          return;
        }

        const selectedPost = postDetails;
        console.log(selectedPost.userId);
        if (!selectedPost.userId) {
          console.error("User ID is missing.");
          return;
        }

        try {
          const usersCollection = collection(firestore, "users");
          const q = query(usersCollection, where('id', '==', selectedPost.userId));
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserDetails(doc.data());
            });
          } else {
            console.error("No user found with the given userId.");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      getUser();
    }, [postDetails, firestore, setPostDetails]);

    if (!postDetails) {
      return <div>Loading post details...</div>;
    }

    return (
      <div className="viewParentDiv">
        <div className='w-[100%] md:w-[60%]'>
          <img  className='w-[100%]'
            src={postDetails.image}
            alt={postDetails.name}
          />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {postDetails.price} </p>
            <span>Product Name: {postDetails.name}</span>
            <p>Product Category: {postDetails.category}</p>
            <p>Description: {postDetails.description}</p>
            <p>Location: {postDetails.location}</p>
            <span>{postDetails.date}</span>
          </div>
          {userDetails && <div className="contactDetails">
            <p>Seller details</p>
            <p><span className="lessBold">{userDetails.username}</span></p>
            <p><span className="lessBold">{userDetails.phone}</span></p>
          </div>}
          <div className='mt-4'>
         { user && userDetails && user.displayName === userDetails.username ? <button onClick={handleDelete}  className="text-red-500 border border-red-500 bg-white font-semibold py-2 px-4 rounded">
         Delete Post
         </button> : ''}
        </div>
        </div>
       
      </div>

      
    );
  }

  export default View;
