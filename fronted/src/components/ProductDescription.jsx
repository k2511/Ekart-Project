import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCart } from "@/redux/productSlice";

const ProductDescription = ({ product }) => {
  // Bug Fix: useDispatch ko top-level par move kiya hai taaki app crash na ho
  const dispatch = useDispatch();

  const addTOCart = async (productId) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/cart/add`,
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product added to Cart");
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // Mobile ke liye padding (p-4) aur width full (w-full) add ki hai
    <div className="flex flex-col gap-3 sm:gap-4 w-full p-4 sm:p-0">
      
      {/* Title text ko mobile par chota (text-2xl) aur desktop par bada (text-4xl) kiya hai */}
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 break-words">
        {product.productName}
      </h1>
      
      <p className="text-sm sm:text-base text-gray-600">
        {product.category} | {product.brand}
      </p>
      
      {/* Price ka text size bhi responsive banaya hai */}
      <h2 className="text-pink-500 font-bold text-xl sm:text-2xl">
        ₹{product.productPrice}
      </h2>
      
      {/* Description mobile par kam lines aur desktop par zyada lines dikhayega */}
      <p className="line-clamp-6 sm:line-clamp-12 text-sm sm:text-base text-muted-foreground">
        {product.productDesc}
      </p>
      
      {/* Fixed width w-[300px] hata di hai taaki mobile screen se bahar na jaye */}
      <div className="flex gap-3 items-center mt-2 w-full sm:w-auto">
        <p className="text-sm sm:text-base font-medium">Quantity : </p>
        <Input type="number" className="w-16 sm:w-20 text-center" defaultValue={1} min={1} />
      </div>
      
      {/* Button mobile par full width (w-full) hoga, aur desktop par fit (w-max) hoga */}
      <Button
        onClick={() => addTOCart(product._id)}
        className="bg-pink-600 hover:bg-pink-700 text-white w-full sm:w-max mt-2 py-6 sm:py-2 text-lg sm:text-base transition-all"
      >
        Add to Cart
      </Button>

    </div>
  );
};

export default ProductDescription;