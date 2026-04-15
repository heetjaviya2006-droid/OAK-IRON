import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ id, image, title, category, price, isNew }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart({ id, name: title, price, image });
    alert('Added to cart!');
  };

  return (
    <div className="product-card">
      <div className="product-image-container mb-3">
        {isNew && <div className="badge-new">New Arrival</div>}
        <Link to={`/product/${id}`}>
          <img
            src={image}
            alt={title}
            className="product-image"
            loading="lazy"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
          />
        </Link>
        <div className="quick-add" onClick={handleAddToCart}>Quick Add</div>
        <button
          className="btn btn-light position-absolute top-0 end-0 m-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
          style={{ width: '38px', height: '38px', padding: 0 }}
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="px-1 text-center">
        <p className="text-muted small text-uppercase mb-1" style={{ letterSpacing: '1.5px', fontSize: '0.7rem', fontWeight: 600 }}>{category}</p>
        <Link to={`/product/${id}`} className="text-dark text-decoration-none">
          <h6 className="mb-2" style={{ fontWeight: 600, fontSize: '1rem' }}>{title}</h6>
        </Link>
        <p className="mb-0 fw-bold" style={{ color: '#1A1A1A' }}>₹{price?.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ProductCard;
