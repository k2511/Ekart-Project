// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
// import axios from "axios";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "sonner";

// const AddressFrom = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     fullName: "",
//     phone: "",
//     email: "",
//     address: "",
//     city: "",
//     state: "",
//     zip: "",
//     country: "",
//   });

//   const { cart, addresses, selectedAddress } = useSelector(
//     (store) => store.product
//   );
  
//   const [showForm, setShowForm] = useState(
//     addresses?.length > 0 ? false : true
//   );

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     dispatch(addAddress(formData));
//     setShowForm(false);
//     // Form clear kar diya taaki naya add karte waqt purana data na dikhe
//     setFormData({
//       fullName: "", phone: "", email: "", address: "",
//       city: "", state: "", zip: "", country: "",
//     });
//   };

//   // Agar cart array hai, toh cart.totalPrice undefined ho sakta hai, isliye fallback (|| 0) diya hai
//   const subtotal = cart?.totalPrice || 0; 
//   const shipping = subtotal > 50 ? 0 : 10;
//   const tax = parseFloat((subtotal * 0.5).toFixed(2));
//   const total = subtotal + shipping + tax;


//   const handlePayment = async() => {
//   const accessToken = localStorage.get("accessToken");

//     try {
//       const {data} = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/create-order`, {
//         products:cart?.items?.map(item=>({
//           productId:item.productId._id,
//           quantity:item.quantity
//         })),
//         tax,
//         shipping,
//         amount:total,
//         currency:"INR"
//       }, {
//         headers:{
//           Authorization:`Bearer ${accessToken}`
//         }
//       })

//       if(!data.success) return toast.error("Something went wrong")

//         const options = {
//           key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//           amount:data.order.amount,
//           oder_id:data.order.id, 
//           name:"Ekart",
//           description:"Order Payment",
//           handler:async function (response) {
//             try {
//               const verifyRes = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, response,{
//                 headers:{
//                   Authorization:`Bearer ${accessToken}`
//                 }
//               })
//                 if(verifyRes.data.sucess){
//                   toast.success("✅ Payment Successfully")
//                   dispatch(setCart({items:[], totalPrice:0}))
//                   navigate("/order-success")
//                 }else{
//                   toast.error("❌ Payment Veriication Failed")
//                 }
//             } catch (error) {
//               toast.error("Error Verifying payment")
              
//             }
            
//           },
//           modal:{
//             ondismiss: async function ()  {
//               //Handler user close
//               await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, {
//                 razorpay_order_id:data.order.id,
//                 paymentFailed:true
//               }, {
//                 headers:{
//                   Authorization:`Bearer ${accessToken}`
//                 }
//               })
//               toast.error("Payment Cancelled or Failed")
//             }
//           },
//           prefill:{
//             name:formData.fullName,
//             email:formData.email,
//             contact:formData.phone
//           },
//           theme:{color:"#f47286"}
//         };

//         const rzp = new window.Razorpay(options)
//         // Listen for payment faailure

//         rzp.on("payment.failed", async function (response) {
//           await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`,{
//             razorpay_order_id:data.order.id,
//             paymentFailed:true
//           }, {
//             headers:{
//               Authorization:`Bearer ${accessToken
//               }`
//             }
//           })
//           toast.error("Payment Failed. Please try again")
//           rzp.open()
//         })catch(error){
//           console.log(error);
          
//         toast.error("Something went wrong while processing payment")
//         }


//     } catch (error) {
      
//     }

//   }

//   return (
//     // Responsive container (px-4 mobile me space ke liye)
//     <div className="max-w-7xl mx-auto px-4 mb-10">
//       {/* Mobile me 1 column, large screens me 2 columns */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 mt-10 w-full">
        
//         {/* Left Side: Address Form / List */}
//         <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
//           {showForm ? (
//             <>
//               <div>
//                 <Label htmlFor="fullName">Full Name</Label>
//                 <Input
//                   id="fullName"
//                   name="fullName"
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input
//                   id="phone"
//                   name="phone"
//                   placeholder="Phone Number"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   name="email"
//                   placeholder="john@example.com"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <Label htmlFor="address">Address</Label>
//                 <Input
//                   id="address"
//                   name="address"
//                   placeholder="Enter Address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="city">City</Label>
//                   <Input
//                     id="city"
//                     name="city"
//                     placeholder="Pune"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="state">State</Label>
//                   <Input
//                     id="state"
//                     name="state"
//                     placeholder="Maharashtra"
//                     value={formData.state}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="zip">Zip Code</Label>
//                   <Input
//                     id="zip"
//                     name="zip"
//                     placeholder="411011"
//                     value={formData.zip}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="country">Country</Label>
//                   <Input
//                     name="country"
//                     id="country"
//                     placeholder="India"
//                     value={formData.country}
//                     onChange={handleChange}
//                     required
//                   />
//                 </div>
//               </div>
              
//               <Button type="button" onClick={handleSave} className="w-full mt-4">
//                 Save & Continue
//               </Button>
//             </>
//           ) : (
//             <div className="space-y-4">
//               <h2 className="text-lg font-semibold">Saved Addresses</h2>
//               {addresses?.map((addr, index) => {
//                 return (
//                   <div
//                     onClick={() => dispatch(setSelectedAddress(index))}
//                     key={index}
//                     className={`border p-4 rounded-md cursor-pointer relative transition-all ${
//                       selectedAddress === index
//                         ? "border-pink-600 bg-pink-50"
//                         : "border-gray-300 hover:border-pink-300"
//                     }`}
//                   >
//                     <p className="font-medium text-gray-800">{addr.fullName}</p>
//                     <p className="text-sm text-gray-600">{addr.phone}</p>
//                     <p className="text-sm text-gray-600">{addr.email}</p>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {addr.address}, {addr.city}, {addr.state}, {addr.zip}, {addr.country}
//                     </p>
                    
//                     <button
//                       onClick={(e) => {
//                         e.stopPropagation(); // Yeh address ko select hone se rokega jab hum delete dabayenge
//                         dispatch(deleteAddress(index)); // Index bhejna zaroori tha
//                       }}
//                       className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-semibold"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 );
//               })}

//               <Button
//                 variant="outline"
//                 className="w-full"
//                 onClick={() => setShowForm(true)}
//               >
//                 + Add new Address
//               </Button>
//               <Button
//               onClick={handlePayment}
//                 disabled={selectedAddress === null}
//                 className="w-full bg-pink-600 hover:bg-pink-700 text-white"
//               >
//                 Proceed to Checkout
//               </Button>
//             </div>
//           )}
//         </div>

//         {/* Right Side Order Summary (JSX comment sahi format me) */}
//         <div className="w-full">
//           {/* Card ki width w-full ki hai taaki mobile par cut na ho */}
//           <Card className="w-full shadow-sm">
//             <CardHeader>
//               <CardTitle>Order Summary</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex justify-between">
//                 <span>Subtotal ({cart.items.length || 0} items)</span>
//                 <span>₹{subtotal.toLocaleString("en-IN")}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Shipping</span>
//                 <span>{shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}</span>
//               </div>

//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>₹{tax.toLocaleString("en-IN")}</span>
//               </div>
              
//               <Separator />
              
//               <div className="flex justify-between font-bold text-lg">
//                 <span>Total</span>
//                 <span>₹{total.toLocaleString("en-IN")}</span>
//               </div>
              
//               <div className="text-sm text-muted-foreground pt-4 space-y-1">
//                 <p>• Free shipping on orders over ₹50</p>
//                 <p>• 30 days return policy</p>
//                 <p>• Secure Checkout with SSL encryption</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AddressFrom;



import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddressFrom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { cart, addresses, selectedAddress } = useSelector((store) => store.product);
  const [showForm, setShowForm] = useState(addresses?.length > 0 ? false : true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
    setFormData({
      fullName: "", phone: "", email: "", address: "",
      city: "", state: "", zip: "", country: "",
    });
  };

  const subtotal = cart?.totalPrice || 0;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2)); // Generally 5% tax
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    // FIX: localStorage.getItem use karein
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      return toast.error("Please login to proceed");
    }

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/create-order`, {
        products: cart?.items?.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        tax,
        shipping,
        amount: total,
        currency: "INR"
      }, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!data.success) return toast.error("Something went wrong");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        order_id: data.order.id, // FIX: spelling order_id
        name: "Ekart",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, response, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            
            if (verifyRes.data.success) { // FIX: spelling success
              toast.success("✅ Payment Successful");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error("❌ Payment Verification Failed");
            }
          } catch (error) {
            toast.error("Error Verifying payment");
          }
        },
        modal: {
          ondismiss: async function () {
            await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, {
              razorpay_order_id: data.order.id,
              paymentFailed: true
            }, {
              headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.error("Payment Cancelled");
          }
        },
        prefill: {
          name: formData.fullName || "",
          email: formData.email || "",
          contact: formData.phone || ""
        },
        theme: { color: "#f47286" }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        await axios.post(`${import.meta.env.VITE_URL}/api/v1/orders/verify-payment`, {
          razorpay_order_id: data.order.id,
          paymentFailed: true
        }, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });
        toast.error("Payment Failed. Please try again");
      });

      rzp.open();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while processing payment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-10 mt-10 w-full">
        
        {/* Left Side */}
        <div className="space-y-4 p-6 bg-white border rounded-lg shadow-sm">
          {showForm ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Add New Address</h2>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <Input name="state" placeholder="State" value={formData.state} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input name="zip" placeholder="Zip" value={formData.zip} onChange={handleChange} />
                <Input name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
              </div>
              <Button onClick={handleSave} className="w-full">Save & Continue</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Saved Addresses</h2>
              {addresses?.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p className="text-sm">{addr.address}, {addr.city}</p>
                  <button
                    onClick={(e) => { e.stopPropagation(); dispatch(deleteAddress(index)); }}
                    className="absolute top-4 right-4 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <Button variant="outline" className="w-full" onClick={() => setShowForm(true)}>+ Add new Address</Button>
              <Button
                onClick={handlePayment}
                disabled={selectedAddress === null}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>

        {/* Right Side Summary */}
        <div className="w-full">
          <Card className="shadow-sm">
            <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart?.items?.length || 0} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressFrom;