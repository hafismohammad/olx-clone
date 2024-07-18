import React, { useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cars');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { firestore, storage } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!name || !category || !price || !image || !description || !location) {
      setError('Please fill all the fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    if (/^-/.test(name) || /^-/.test(price) || parseInt(price, 10) < 0) {
      setError('Negative numbers are not allowed in name or price fields');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }

    setLoading(true);
    const currDate = Date.now();

    try {
      const storageRef = ref(storage, `productimages/${currDate + image.name}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);

      console.log('File available at:', url);

      const docRef = await addDoc(collection(firestore, 'products'), {
        name,
        category,
        price,
        image: url,
        description,
        location,
        userId: user.uid,
        date: new Date().toDateString(),
      });
      window.alert('Your Product added');
      console.log('Document written with ID: ', docRef.id);

      setLoading(false);
      navigate('/');
    } catch (error) {
      console.error('Error uploading image:', error);
      setError('Error uploading image');
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className='flex min-h-[100vh] h-[100%] w-[100%] items-center justify-center py-32'>
        <div className='border-2 border-black h-[75%] w-[70%] p-8'>
          <div className='pt-2 flex items-center justify-start'>
            <h3 className='text-3xl font-semibold'>CREATE POST</h3>
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your product name'
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            />
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            >
              <option key='1' value="Cars">Cars</option>
              <option key='2' value="Bikes">Bikes</option>
              <option key='3' value="Home Appliances">Home Appliances</option>
              <option key='4' value="Electronics">Electronics</option>
              <option key='5' value="Mobile Phones">Mobile Phones</option>
              <option key='6' value="Others">Others</option>
            </select>
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Description</label>
            <textarea
              cols={'20'}
              rows={'5'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            />
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder='Enter your location'
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            />
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Price</label>
            <input
              type="number"
              placeholder='₹100'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            />
          </div>
          <div className='flex flex-col my-3 w-[50%]'>
            <label>Photos</label>
            <img src={image ? URL.createObjectURL(image) : ''} alt="" className='w-[200px] my-8' />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className='border-2 border-[#002F34] rounded-md text-xs py-2 ps-3'
            />
          </div>
          {error && <p className='text-xs text-[#ff4646]'>{error}</p>}
          <div className='flex flex-col my-3'>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`border-2 my-2 bg-[#002f34] text-white py-2 font-bold tracking-widest transition ease-in-out delay-350 ${!loading && 'hover:bg-white hover:text-[#002F34] hover:border-2 hover:border-[#002F34]'} ${loading && 'bg-[#002F34]/50 '}`}
            >
              POST
            </button>
            {loading && <p className='text-center text-sm tracking-widest font-semibold text-[#002F34]'>Posting...</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
