// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { ArrowLeft } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import userLogo from "../../assets/userLogo.png";
// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { toast } from "sonner";
// import { setUser } from "@/redux/userSlice";

// const UserInfo = () => {
//   const [file, setFile] = useState(null);
//   const dispatch = useDispatch();
//   const params = useParams();
//   const navigate = useNavigate();
//   const userId = params.id;

//   const [updateUser, setUpdateUser] = useState({});

//   const handleChange = (e) => {
//     setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     const selectFile = e.target.files[0];
//     setFile(selectFile);
//     setUpdateUser({
//       ...updateUser,
//       profilePic: URL.createObjectURL(selectFile),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const accessToken = localStorage.getItem("accessToken");
//     try {
//       const formData = new FormData();
//       formData.append("firstName", updateUser.firstName || "");
//       formData.append("lastName", updateUser.lastName || "");
//       formData.append("email", updateUser.email || "");
//       formData.append("phoneNo", updateUser.phoneNo || "");
//       formData.append("address", updateUser.address || "");
//       formData.append("city", updateUser.city || "");
//       formData.append("zipCode", updateUser.zipCode || "");
//       if (updateUser.role) formData.append("role", updateUser.role);

//       if (file) {
//         formData.append("file", file);
//       }
//       const res = await axios.put(
//         `http://localhost:8000/api/v1/user/update/${userId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "multipart/form-data",
//           },
//         },
//       );
//       if (res.data.success) {
//         toast.success(res.data.message);
//         dispatch(setUser(res.data.user));
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to update profile");
//     }
//   };

//   const getUserData = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/api/v1/user/all-user/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`
//           }
//         }
//       );
//       if (res.data.success) {
//         setUpdateUser(res.data.user);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to fetch user data");
//     }
//   };

//   useEffect(() => {
//     getUserData();
//   }, [userId]);

//   return (
//     <div className="pt-5 min-h-screen bg-gray-100 px-4 sm:px-6">
//       <div className="max-w-3xl mx-auto">
//         <div className="flex flex-col min-h-screen bg-gray-100 pt-6 sm:pt-10">
//           <div className="flex items-center gap-4 mb-6 sm:mb-8">
//             <Button onClick={() => navigate(-1)} className="shrink-0">
//               <ArrowLeft />
//             </Button>
//             <h1 className="font-bold text-xl sm:text-2xl m-0">
//               Update Profile
//             </h1>
//           </div>

//           <div className="flex flex-col items-center w-full">
//             <form
//               onSubmit={handleSubmit}
//               className="space-y-5 shadow-lg p-5 sm:p-8 rounded-lg bg-white w-full"
//             >
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//                 <div className="flex flex-col items-center">
//                   <img
//                     src={updateUser?.profilePic || userLogo}
//                     alt="User Profile"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
//                   />
//                   <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors text-sm text-center">
//                     Change Picture
//                     <input
//                       onChange={handleFileChange}
//                       type="file"
//                       accept="image/*"
//                       className="hidden"
//                     />
//                   </Label>
//                 </div>
//                 <div>
//                   <Label className="block text-sm font-medium mb-1">
//                     First Name
//                   </Label>
//                   <Input
//                     type="text"
//                     name="firstName"
//                     placeholder="John"
//                     className="w-full"
//                     value={updateUser?.firstName || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium mb-1">
//                     Last Name
//                   </Label>
//                   <Input
//                     type="text"
//                     name="lastName"
//                     placeholder="Doe"
//                     className="w-full"
//                     value={updateUser?.lastName || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <Label className="block text-sm font-medium mb-1">
//                     Email
//                   </Label>
//                   <Input
//                     type="email"
//                     disabled
//                     name="email"
//                     placeholder="john.doe@example.com"
//                     className="w-full cursor-not-allowed bg-gray-50"
//                     value={updateUser?.email || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium mb-1">
//                     Phone No
//                   </Label>
//                   <Input
//                     type="tel"
//                     name="phoneNo"
//                     placeholder="Enter your contact number"
//                     className="w-full"
//                     value={updateUser?.phoneNo || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <Label className="block text-sm font-medium mb-1">
//                     Address
//                   </Label>
//                   <Input
//                     type="text"
//                     name="address"
//                     placeholder="Enter your address"
//                     className="w-full"
//                     value={updateUser?.address || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium mb-1">City</Label>
//                   <Input
//                     type="text"
//                     name="city"
//                     placeholder="Enter your city"
//                     className="w-full"
//                     value={updateUser?.city || ""}
//                     onChange={handleChange}
//                   />
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium mb-1">
//                     Zip Code
//                   </Label>
//                   <Input
//                     type="text"
//                     name="zipCode"
//                     placeholder="Enter your zip code"
//                     className="w-full"
//                     value={updateUser?.zipCode || ""}
//                     onChange={handleChange}
//                   />
//                 </div>
//               </div>
              
//               <div className="flex gap-3 items-center">
//                 <Label className="block text-sm font-medium">Role : </Label>
//                 <RadioGroup 
//                   onValueChange={(value) => setUpdateUser({...updateUser, role: value})}
//                   value={updateUser?.role} 
//                   className="flex gap-3"
//                 >
//                   <div className="flex items-center gap-3">
//                     <RadioGroupItem value="user" id="user" />
//                     <Label htmlFor="user">User</Label>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <RadioGroupItem value="admin" id="admin" />
//                     <Label htmlFor="admin">Admin</Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <Button
//                 className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 sm:py-6"
//                 type="submit"
//               >
//                 Update Profile
//               </Button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInfo;
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userLogo from "../../assets/userLogo.png";
import { useDispatch } from "react-redux";
import axios from "axios";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;

  const [updateUser, setUpdateUser] = useState({});

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectFile = e.target.files[0];
    setFile(selectFile);
    setUpdateUser({
      ...updateUser,
      profilePic: URL.createObjectURL(selectFile),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName || "");
      formData.append("lastName", updateUser.lastName || "");
      formData.append("email", updateUser.email || "");
      formData.append("phoneNo", updateUser.phoneNo || "");
      formData.append("address", updateUser.address || "");
      formData.append("city", updateUser.city || "");
      formData.append("zipCode", updateUser.zipCode || "");
      if (updateUser.role) formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file);
      }
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/all-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      if (res.data.success) {
        setUpdateUser(res.data.user);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    getUserData();
  }, [userId]);

  return (
    <div className="py-5 min-h-screen bg-gray-100 px-3 sm:px-6 w-full overflow-x-hidden">
      <div className="max-w-3xl mx-auto w-full">
        <div className="flex flex-col bg-gray-100 pt-4 sm:pt-10 w-full">
          
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Button onClick={() => navigate(-1)} className="shrink-0 px-3 sm:px-4">
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <h1 className="font-bold text-lg sm:text-xl md:text-2xl m-0 truncate">
              Update Profile
            </h1>
          </div>

          <div className="flex flex-col items-center w-full">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6 shadow-lg p-4 sm:p-6 md:p-8 rounded-lg bg-white w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
                
                {/* Profile Picture (Centered for both mobile and PC) */}
                <div className="flex flex-col items-center col-span-1 md:col-span-2 mb-2 sm:mb-4">
                  <img
                    src={updateUser?.profilePic || userLogo}
                    alt="User Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-pink-800"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors text-xs sm:text-sm text-center">
                    Change Picture
                    <input
                      onChange={handleFileChange}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </Label>
                </div>

                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">
                    First Name
                  </Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full"
                    value={updateUser?.firstName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">
                    Last Name
                  </Label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full"
                    value={updateUser?.lastName || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 w-full">
                  <Label className="block text-sm font-medium mb-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    disabled
                    name="email"
                    placeholder="john.doe@example.com"
                    className="w-full cursor-not-allowed bg-gray-50 text-sm sm:text-base"
                    value={updateUser?.email || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">
                    Phone No
                  </Label>
                  <Input
                    type="tel"
                    name="phoneNo"
                    placeholder="Enter your contact number"
                    className="w-full"
                    value={updateUser?.phoneNo || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-1 md:col-span-2 w-full">
                  <Label className="block text-sm font-medium mb-1">
                    Address
                  </Label>
                  <Input
                    type="text"
                    name="address"
                    placeholder="Enter your address"
                    className="w-full"
                    value={updateUser?.address || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">City</Label>
                  <Input
                    type="text"
                    name="city"
                    placeholder="Enter your city"
                    className="w-full"
                    value={updateUser?.city || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">
                    Zip Code
                  </Label>
                  <Input
                    type="text"
                    name="zipCode"
                    placeholder="Enter your zip code"
                    className="w-full"
                    value={updateUser?.zipCode || ""}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Role Selection - Adjusted for mobile screens */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
                <Label className="block text-sm font-medium">Role : </Label>
                <RadioGroup 
                  onValueChange={(value) => setUpdateUser({...updateUser, role: value})}
                  value={updateUser?.role} 
                  className="flex flex-row flex-wrap gap-4 sm:gap-5"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="user" id="user" />
                    <Label htmlFor="user" className="cursor-pointer">User</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 sm:py-4 text-sm sm:text-base"
                type="submit"
              >
                Update Profile
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;