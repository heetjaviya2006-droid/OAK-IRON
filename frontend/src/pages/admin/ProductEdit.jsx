import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const isEditMode = id !== 'create';

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const { data } = await axios.get('http://localhost:5000/api/products');
          const product = data.find(p => p._id === id);
          if(product) {
            setName(product.name);
            setPrice(product.price);
            setImage(product.image);
            setBrand(product.brand);
            setCategory(product.category);
            setCountInStock(product.countInStock);
            setDescription(product.description);
          }
        } catch (err) {
          setError('Failed to fetch product');
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      setError('Image upload failed');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
    const productData = { name, price, image, brand, category, countInStock, description };

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/products/${id}`, productData, config);
      } else {
        await axios.post('http://localhost:5000/api/products', productData, config);
      }
      navigate('/admin/products');
    } catch (err) {
      setError('Failed to save product');
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <Button variant="light" className="mb-3 border" onClick={() => navigate('/admin/products')}>Go Back</Button>
      <h3 className="fw-bold mb-4">{isEditMode ? 'Edit Product' : 'Create Product'}</h3>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" placeholder="Enter price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image Path or URL</Form.Label>
          <Form.Control type="text" placeholder="Enter image url" value={image} onChange={(e) => setImage(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Local Image (Offline Mode)</Form.Label>
          <Form.Control type="file" onChange={uploadFileHandler} />
          {uploading && <small>Uploading...</small>}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Brand</Form.Label>
          <Form.Control type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control type="number" placeholder="Enter stock" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>

        <Button variant="dark" type="submit">
          {isEditMode ? 'Update' : 'Create'} Product
        </Button>
      </Form>
    </div>
  );
};
export default ProductEdit;
