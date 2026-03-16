import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import userLogo from "../assets/userLogo.png";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import MyOrder from "../pages/MyOrder";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const dispatch = useDispatch()
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilePic: user?.profilePic,
    role: user?.role,
  });

  const [file, setFile] = useState(null);

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
      //use formData for text + file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);

      if (file) {
        formData.append("file", file); //image file for backend multer
      }
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type":"multipart/form-data"
          },
        });
      if (res.data.success) {
          toast.success(res.data.message)
          dispatch(setUser(res.data.user))
        }

    } catch (error) {
      console.log(error);
      toast.error("failed to update profile");
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-100">
      {/* FIX: Set defaultValue to match the actual trigger/content value */}
      <Tabs
        defaultValue="profile"
        className="max-w-7xl mx-auto flex flex-col items-center"
      >
        <TabsList>
          {/* FIX: Matched Trigger values with Content values */}
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="w-full mt-6">
          <div className="flex flex-col justify-center items-center bg-gray-100">
            <h1 className="font-bold mb-7 text-2xl text-gray-800">
              Update Profile
            </h1>

            <div className="w-full flex gap-10 justify-center items-start px-7 max-w-4xl">
              {/* Profile Picture */}
              <div className="flex flex-col items-center">
                <img
                  src={updateUser?.profilePic || userLogo}
                  alt="User Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                />
                <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors text-sm text-center">
                  Change Picture
                  <input
                    onChange={handleFileChange}
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                </Label>
              </div>

              {/* Profile form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4 shadow-lg p-6 rounded-lg bg-white flex-1"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      First Name
                    </Label>
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="w-full"
                      value={updateUser.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Last Name
                    </Label>
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="w-full"
                      value={updateUser.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Email
                    </Label>
                    <Input
                      type="email"
                      disabled
                      name="email"
                      placeholder="john.doe@example.com"
                      className="w-full cursor-not-allowed bg-gray-50"
                      value={updateUser.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Phone No
                    </Label>
                    <Input
                      type="tel"
                      name="phoneNo"
                      placeholder="Enter your contact number"
                      className="w-full"
                      value={updateUser.phoneNo}
                      onChange={handleChange}
                    />
                  </div>

                  {/* FIX: Removed cursor-not-allowed from editable fields */}
                  <div className="col-span-2">
                    <Label className="block text-sm font-medium mb-1">
                      Address
                    </Label>
                    <Input
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      className="w-full"
                      value={updateUser.address}
                      onChange={handleChange}
                    />
                  </div>

                  {/* FIX: Corrected input types and names */}
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      City
                    </Label>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Enter your city"
                      className="w-full"
                      value={updateUser.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Zip Code
                    </Label>
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="Enter your zip code"
                      className="w-full"
                      value={updateUser.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* FIX: Added col-span-2 equivalent by placing outside grid or making it span, adjusted padding */}
                <Button
                  className="w-full mt-6 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3"
                  type="submit"
                >
                  Update Profile
                </Button>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders" className="w-full max-w-2xl mt-6">
         <MyOrder/>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
