import React from "react";
import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom"; // ✅ 1. useNavigate import kiya

const AllProducts = () => {
  const { products } = useSelector((store) => store.product);
  
  // ✅ 2. Navigate function banaya
  const navigate = useNavigate(); 

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-6 sm:px-6 md:px-8 lg:px-16 sm:py-8 overflow-x-hidden">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-5 sm:mb-6">
        Our Latest Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {products?.length === 0 && (
          <p className="text-gray-500 col-span-full text-center py-10 text-sm sm:text-base">
            No products available right now.
          </p>
        )}

        {products?.map((product) => (
          <Card 
            key={product._id} 
            className="overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-300 bg-white w-full mx-auto max-w-[380px] sm:max-w-none"
          >
            
            {/* ✅ Image par bhi onClick laga diya taaki image par click karne se bhi page khule */}
            <div 
              onClick={() => navigate(`/products/${product._id}`)} 
              className="w-full h-48 sm:h-52 md:h-48 bg-gray-200 overflow-hidden relative cursor-pointer shrink-0"
            >
              <img
                src={product?.productImg?.[0]?.url || "https://placehold.co/400x400?text=No+Image"}
                alt={product?.productName}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <CardContent className="p-3 sm:p-4 flex flex-col flex-1 gap-1.5 sm:gap-2">
              <span className="text-[10px] sm:text-xs font-semibold text-pink-600 uppercase tracking-wider">
                {product?.category}
              </span>
              
              <h3 className="font-bold text-gray-800 text-base sm:text-lg line-clamp-2 leading-tight">
                {product?.productName}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 flex-1">
                {product?.productDesc}
              </p>
              
              <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
                <span className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                  ₹{product?.productPrice}
                </span>
                
                {/* ✅ 3. Yahan Button par onClick lagaya aur Link ko hata diya */}
                <Button 
                  onClick={() => navigate(`/products/${product._id}`)} 
                  className="bg-gray-900 text-white hover:bg-gray-800 text-xs sm:text-sm h-8 sm:h-10 px-3 sm:px-4"
                >
                  View
                </Button>
              </div>
            </CardContent>

          </Card>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;