// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import userLogo from "../assets/userLogo.png";
// import { Button } from "@/components/ui/button";
// import { ShoppingCart, Trash2 } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { Input } from "@/components/ui/input";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { setCart } from "@/redux/productSlice";
// import { toast } from "sonner";

// const Cart = () => {
//   const { cart } = useSelector((store) => store.product);
  
//   const subtotal = cart?.totalPrice;
//   const shipping = subtotal > 299 ? 0 : 10;
//   const tax = subtotal * 0.05; // 5%
//   const total = subtotal + shipping + tax;
  
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const API = "http://localhost:8000/api/v1/cart";
//   const accessToken = localStorage.getItem("accessToken");

//   const loadCart = async () => {
//     try {
//       const res = await axios.get(API, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleUpdateQuantity = async (productId, type) => {
//     try {
//       const res = await axios.put(
//         `${API}/update`,
//         { productId, type },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRemove = async (productId) => {
//     try {
//       const res = await axios.delete(`${API}/remove`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//         data: { productId },
//       });
//       if (res.data.success) {
//         dispatch(setCart(res.data.cart));
//         toast.success("Product removed from cart");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadCart();
//   }, [dispatch]);

//   return (
//     <div className="pt-24 pb-12 bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-8">
//       {cart?.items?.length > 0 ? (
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
//             Shopping Cart
//           </h1>
          
//           {/* Main Grid/Flex Container for Responsive Layout */}
//           <div className="flex flex-col lg:flex-row gap-8 items-start">
            
//             {/* Left Side: Cart Items List */}
//             <div className="flex flex-col gap-4 sm:gap-5 flex-1 w-full">
//               {cart?.items?.map((product, index) => {
//                 return (
//                   <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
//                     <CardContent className="p-4 sm:p-6">
//                       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
                        
//                         {/* Image & Title */}
//                         <div className="flex items-center gap-4 w-full sm:w-auto flex-1">
//                           <img
//                             src={product?.productId?.productImg?.[0]?.url || userLogo}
//                             alt={product?.productId?.productName || "Product"}
//                             className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-100"
//                           />
//                           <div className="flex-1 min-w-0">
//                             <h1 className="font-semibold text-base sm:text-lg text-gray-800 truncate">
//                               {product?.productId?.productName}
//                             </h1>
//                             <p className="text-gray-500 text-sm mt-1">
//                               ₹{product?.productId?.productPrice?.toLocaleString("en-IN")}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Controls, Total Price & Remove Button */}
//                         <div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full sm:w-auto gap-4 sm:gap-8 mt-2 sm:mt-0">
                          
//                           {/* Plus/Minus Quantity */}
//                           <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-md border border-gray-200">
//                             <Button
//                               onClick={() => handleUpdateQuantity(product.productId._id, "decrease")}
//                               variant="ghost"
//                               className="h-8 w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-200"
//                             >
//                               -
//                             </Button>
//                             <span className="w-4 text-center font-medium text-sm">
//                               {product.qunatity}
//                             </span>
//                             <Button
//                               onClick={() => handleUpdateQuantity(product.productId._id, "increase")}
//                               variant="ghost"
//                               className="h-8 w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-200"
//                             >
//                               +
//                             </Button>
//                           </div>

//                           {/* Item Total */}
//                           <p className="font-semibold text-gray-800 hidden sm:block">
//                             ₹{(product?.productId?.productPrice * product?.qunatity || 0)?.toLocaleString("en-IN")}
//                           </p>
                          
//                           {/* Remove Button */}
//                           <div 
//                             onClick={() => handleRemove(product?.productId?._id)} 
//                             className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-700 transition-colors p-2 rounded-md hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
//                             <span className="text-sm font-medium sm:hidden">Remove</span>
//                           </div>

//                         </div>
//                       </div>
                      
//                       {/* Mobile Item Total (Only visible on very small screens) */}
//                       <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center sm:hidden">
//                          <span className="text-gray-500 text-sm">Item Total</span>
//                          <span className="font-bold text-gray-800">
//                            ₹{(product?.productId?.productPrice * product?.qunatity || 0)?.toLocaleString("en-IN")}
//                          </span>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Right Side: Order Summary */}
//             <div className="w-full lg:w-[400px] lg:sticky lg:top-24">
//               <Card className="shadow-sm">
//                 <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-4">
//                   <CardTitle className="text-lg text-gray-800">Order Summary</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4 pt-6">
                  
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal ({cart?.items?.length} items)</span>
//                     <span className="font-medium text-gray-800">₹{subtotal?.toLocaleString("en-IN")}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-gray-600">
//                     <span>Shipping</span>
//                     <span className="font-medium text-gray-800">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
//                   </div>
                  
//                   <div className="flex justify-between text-gray-600">
//                     <span>Tax (5%)</span>
//                     <span className="font-medium text-gray-800">₹{tax?.toLocaleString("en-IN")}</span>
//                   </div>
                  
//                   <Separator className="my-4" />
                  
//                   <div className="flex justify-between font-bold text-xl text-gray-800 pb-2">
//                     <span>Total</span>
//                     <span>₹{total?.toLocaleString("en-IN")}</span>
//                   </div>
                  
//                   {/* Action Buttons Section */}
//                   <div className="space-y-4 pt-2">
//                     <div className="flex gap-2">
//                       <Input placeholder="Promo Code" className="bg-gray-50" />
//                       <Button variant="outline" className="shrink-0">Apply</Button>
//                     </div>
                    
//                     <Button onClick={()=>navigate('/address')} className="w-full bg-pink-600 hover:bg-pink-700 text-white shadow-md transition-all py-6 text-lg">
//                       PLACE ORDER
//                     </Button>
                    
//                     <Button
//                       variant="outline"
//                       className="w-full bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50 py-6"
//                       asChild
//                     >
//                       <Link to="/products">Continue Shopping</Link>
//                     </Button>
//                   </div>
                  
//                   <div className="text-xs text-gray-400 pt-4 space-y-2">
//                     <p className="flex items-center gap-2">• Free shipping on orders over ₹299</p>
//                     <p className="flex items-center gap-2">• 30-days return policy</p>
//                     <p className="flex items-center gap-2">• Secure checkout with SSL encryption</p>
//                   </div>
                  
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Empty Cart State */
//         <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center max-w-md mx-auto">
//           <div className="bg-pink-50 p-6 rounded-full mb-6 border border-pink-100">
//             <ShoppingCart className="w-16 h-16 text-pink-600" />
//           </div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
//             Your Cart is empty
//           </h2>
//           <p className="mt-3 text-gray-500 leading-relaxed">
//             Looks like you haven't added anything to your cart yet. Discover our latest products and find something you love!
//           </p>
//           <Button
//             onClick={() => navigate("/products")}
//             className="mt-8 bg-pink-600 text-white py-6 px-8 hover:bg-pink-700 shadow-lg hover:shadow-xl transition-all rounded-full text-lg"
//           >
//             Start Shopping
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import userLogo from "../assets/userLogo.png";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setCart } from "@/redux/productSlice";
import { toast } from "sonner";

const Cart = () => {
  const { cart } = useSelector((store) => store.product);
  
  const subtotal = cart?.totalPrice;
  const shipping = subtotal > 299 ? 0 : 10;
  const tax = subtotal * 0.05; // 5%
  const total = subtotal + shipping + tax;
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = "http://localhost:8000/api/v1/cart";
  const accessToken = localStorage.getItem("accessToken");

  const loadCart = async () => {
    try {
      const res = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuantity = async (productId, type) => {
    try {
      const res = await axios.put(
        `${API}/update`,
        { productId, type },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const res = await axios.delete(`${API}/remove`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: { productId },
      });
      if (res.data.success) {
        dispatch(setCart(res.data.cart));
        toast.success("Product removed from cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
  }, [dispatch]);

  return (
    <div className="pt-20 sm:pt-24 pb-8 sm:pb-12 bg-gray-50 min-h-screen px-3 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">
            Shopping Cart
          </h1>
          
          {/* Main Grid/Flex Container for Responsive Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start w-full">
            
            {/* Left Side: Cart Items List */}
            <div className="flex flex-col gap-4 sm:gap-5 flex-1 w-full">
              {cart?.items?.map((product, index) => {
                return (
                  <Card key={index} className="overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 w-full">
                    <CardContent className="p-3 sm:p-6">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 w-full">
                        
                        {/* Image & Title */}
                        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto flex-1">
                          <img
                            src={product?.productId?.productImg?.[0]?.url || userLogo}
                            alt={product?.productId?.productName || "Product"}
                            className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-100 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h1 className="font-semibold text-sm sm:text-lg text-gray-800 line-clamp-2 sm:truncate leading-tight">
                              {product?.productId?.productName}
                            </h1>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1">
                              ₹{product?.productId?.productPrice?.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Controls, Total Price & Remove Button */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full sm:w-auto gap-3 sm:gap-8 mt-2 sm:mt-0">
                          
                          {/* Plus/Minus Quantity */}
                          <div className="flex items-center gap-1 sm:gap-3 bg-gray-50 p-1 rounded-md border border-gray-200">
                            <Button
                              onClick={() => handleUpdateQuantity(product.productId._id, "decrease")}
                              variant="ghost"
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-200"
                            >
                              -
                            </Button>
                            <span className="w-6 sm:w-8 text-center font-medium text-xs sm:text-sm">
                              {product.qunatity}
                            </span>
                            <Button
                              onClick={() => handleUpdateQuantity(product.productId._id, "increase")}
                              variant="ghost"
                              className="h-7 w-7 sm:h-8 sm:w-8 p-0 text-gray-600 hover:text-black hover:bg-gray-200"
                            >
                              +
                            </Button>
                          </div>

                          {/* Item Total (Visible on larger mobile/tablet) */}
                          <p className="font-semibold text-gray-800 hidden sm:block">
                            ₹{(product?.productId?.productPrice * product?.qunatity || 0)?.toLocaleString("en-IN")}
                          </p>
                          
                          {/* Remove Button */}
                          <div 
                            onClick={() => handleRemove(product?.productId?._id)} 
                            className="flex text-red-500 items-center gap-1 cursor-pointer hover:text-red-700 transition-colors p-1 sm:p-2 rounded-md hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm font-medium sm:hidden">Remove</span>
                          </div>

                        </div>
                      </div>
                      
                      {/* Mobile Item Total (Only visible on very small screens) */}
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center sm:hidden">
                         <span className="text-gray-500 text-xs font-medium">Item Total</span>
                         <span className="font-bold text-gray-800 text-sm">
                           ₹{(product?.productId?.productPrice * product?.qunatity || 0)?.toLocaleString("en-IN")}
                         </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Right Side: Order Summary */}
            <div className="w-full lg:w-[400px] lg:sticky lg:top-24 mt-4 lg:mt-0">
              <Card className="shadow-sm w-full">
                <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-3 sm:pb-4">
                  <CardTitle className="text-base sm:text-lg text-gray-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 pt-4 sm:pt-6">
                  
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Subtotal ({cart?.items?.length} items)</span>
                    <span className="font-medium text-gray-800">₹{subtotal?.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-gray-800">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm sm:text-base text-gray-600">
                    <span>Tax (5%)</span>
                    <span className="font-medium text-gray-800">₹{tax?.toLocaleString("en-IN")}</span>
                  </div>
                  
                  <Separator className="my-3 sm:my-4" />
                  
                  <div className="flex justify-between font-bold text-lg sm:text-xl text-gray-800 pb-2">
                    <span>Total</span>
                    <span>₹{total?.toLocaleString("en-IN")}</span>
                  </div>
                  
                  {/* Action Buttons Section */}
                  <div className="space-y-3 sm:space-y-4 pt-2">
                    <div className="flex gap-2 w-full">
                      <Input placeholder="Promo Code" className="bg-gray-50 text-sm h-10 sm:h-auto" />
                      <Button variant="outline" className="shrink-0 h-10 sm:h-auto text-sm">Apply</Button>
                    </div>
                    
                    <Button onClick={()=>navigate('/address')} className="w-full bg-pink-600 hover:bg-pink-700 text-white shadow-md transition-all py-5 sm:py-6 text-base sm:text-lg">
                      PLACE ORDER
                    </Button>
                    
                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-gray-300 text-gray-600 hover:bg-gray-50 py-5 sm:py-6 text-sm sm:text-base"
                      asChild
                    >
                      <Link to="/products">Continue Shopping</Link>
                    </Button>
                  </div>
                  
                  <div className="text-[10px] sm:text-xs text-gray-400 pt-3 sm:pt-4 space-y-1 sm:space-y-2">
                    <p className="flex items-center gap-1 sm:gap-2">• Free shipping on orders over ₹299</p>
                    <p className="flex items-center gap-1 sm:gap-2">• 30-days return policy</p>
                    <p className="flex items-center gap-1 sm:gap-2">• Secure checkout with SSL encryption</p>
                  </div>
                  
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[60vh] p-4 sm:p-6 text-center max-w-md mx-auto w-full">
          <div className="bg-pink-50 p-5 sm:p-6 rounded-full mb-4 sm:mb-6 border border-pink-100">
            <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-pink-600" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
            Your Cart is empty
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-500 leading-relaxed px-2">
            Looks like you haven't added anything to your cart yet. Discover our latest products and find something you love!
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="mt-6 sm:mt-8 bg-pink-600 text-white py-5 sm:py-6 px-6 sm:px-8 hover:bg-pink-700 shadow-lg hover:shadow-xl transition-all rounded-full text-base sm:text-lg"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;