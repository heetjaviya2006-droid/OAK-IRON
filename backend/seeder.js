import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/heet_project_db';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error(err));

const products = [
  {
    name: 'Sleek Minimalist Dining Chair',
    image: '/uploads/chair.png',
    description: 'A beautiful sleek minimalist dining chair made of oak wood and black leather seat. Perfect for modern dining rooms.',
    brand: 'Oak & Iron',
    category: 'Chairs',
    price: 199.99,
    countInStock: 10,
    numReviews: 4,
  },
  {
    name: 'Modern Oak Coffee Table',
    image: '/uploads/table.png',
    description: 'Modern minimalist oak wood coffee table with a premium glass top. Elegance redefined.',
    brand: 'Oak & Iron',
    category: 'Tables',
    price: 349.99,
    countInStock: 5,
    numReviews: 2,
  },
  {
    name: 'Luxury Leather Sofa',
    image: '/uploads/sofa.png',
    description: 'Luxury 3-seater sofa draped in premium tan leather. The centerpiece of any living space.',
    brand: 'Oak & Iron',
    category: 'Sofas',
    price: 1299.99,
    countInStock: 2,
    numReviews: 8,
  },
  {
    name: 'Modern Minimalist Bed Frame',
    image: '/uploads/bed.png',
    description: 'A beautiful sleek minimalist wooden bed frame perfect for any premium bedroom setup.',
    brand: 'Oak & Iron',
    category: 'Beds',
    price: 899.99,
    countInStock: 8,
    numReviews: 12,
  },
  {
    name: 'Sleek Matte Desk Lamp',
    image: '/uploads/lamp.png',
    description: 'Provide perfect lighting to your workspace with this matte black modern desk lamp.',
    brand: 'Lumina',
    category: 'Lighting',
    price: 129.99,
    countInStock: 25,
    numReviews: 6,
  },
  {
    name: 'Premium Solid Oak Desk',
    image: '/uploads/desk.png',
    description: 'Elevate your home office with our premium solid oak desk, built for productivity and elegance.',
    brand: 'Oak & Iron',
    category: 'Tables',
    price: 599.99,
    countInStock: 4,
    numReviews: 15,
  },
  {
    name: 'Modern Iron Frame Bookshelf',
    image: '/uploads/bookshelf.png',
    description: 'A tall minimalist bookshelf featuring a wooden build and a sleek iron frame.',
    brand: 'Oak & Iron',
    category: 'Storage',
    price: 449.99,
    countInStock: 6,
    numReviews: 9,
  }
];

import User from './models/User.js';

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    const adminUser = await User.findOne({ role: 'admin' });
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser ? adminUser._id : null };
    });
    
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
