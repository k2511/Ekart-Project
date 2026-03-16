import { CheckCircle } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => { // Fixed typo: OrderSuccess
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        {/* Success Icon */}
        <div className="flex justify-center">
          <CheckCircle className='h-20 w-20 text-green-500 animate-bounce' />
        </div>
        
        {/* Title */}
        <h1 className='text-2xl font-bold mt-6 text-gray-800'>
          Payment Successful! {/* Fixed: Successfully -> Successful */}
        </h1>
               
        {/* Message */}
        <p className='text-gray-600 mt-2'> 
          Thank you for your purchase. Your order has been placed successfully. 
          {/* Fixed: oder -> order */}
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button 
            onClick={() => navigate("/")} 
            className='w-full bg-pink-600 text-white py-3 rounded-xl font-semibold hover:bg-pink-700 transition duration-300'
          >
            Continue Shopping
          </button>

          <button 
            onClick={() => navigate("/orders")} 
            className='w-full border-2 border-pink-600 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition duration-300'
          >
            View My Orders
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;