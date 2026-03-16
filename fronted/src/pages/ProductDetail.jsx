import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProductDetail = () => {
  // 1. URL se product ki ID nikalna
  const { id } = useParams();

  // 2. Redux store se saare products lana
  const { products } = useSelector((store) => store.product);

  // 3. Us ID wale single product ko dhundhna
  const singleProduct = products?.find((p) => p._id === id);

  // Agar product na mile toh
  if (!singleProduct) {
    return <div className="text-center py-20 text-2xl">Product not found!</div>;
  }

  return (
    <div className="p-10 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md flex gap-10">
        {/* Left: Image */}
        <div className="w-1/2">
          <img 
            src={singleProduct?.productImg?.[0]?.url || "https://placehold.co/400x400"} 
            alt={singleProduct?.productName} 
            className="w-full h-auto rounded-lg"
          />
        </div>
        
        {/* Right: Details */}
        <div className="w-1/2 flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{singleProduct.productName}</h1>
          <p className="text-gray-500 font-semibold">{singleProduct.brand} | {singleProduct.category}</p>
          <p className="text-2xl font-bold text-gray-800">₹{singleProduct.productPrice}</p>
          <p className="text-gray-600 mt-4">{singleProduct.productDesc}</p>
          
          <button className="mt-6 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 font-bold">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;