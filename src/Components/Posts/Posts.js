import React, { useEffect, useContext, useState } from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/FirebaseContext';
import { collection, getDocs } from 'firebase/firestore';
import { postContext } from '../../store/postContext';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../store/SearchContext';

function Posts(props) {
  const { firestore } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const { searchTerm } = useContext(SearchContext);
  const { setPostDetails } = useContext(postContext);
  const navigate = useNavigate();
console.log("pops",props.category);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [firestore]);

  const handleViewPost = (product) => {
    setPostDetails(product);
    navigate('/view');
  };

  // Filter products based on searchTerm
  const filteredData = products.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = item.category.toLowerCase().includes(searchTerm.toLowerCase());
    return nameMatch || categoryMatch;
  });
  

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>

        <div className="cards">
          {filteredData.map(product => (
            <div onClick={() => handleViewPost(product)} className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.image} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{product.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
