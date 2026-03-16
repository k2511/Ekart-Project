import { Input } from "@/components/ui/input";
import axios from "axios";
import { Edit, Eye, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import userLogo from "../../assets/userLogo.png";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searTerm.toLowerCase())
  );

  const getAllUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/user/all-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.data.success) {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.log(error);
     
    }
  };
  
  useEffect(() => {
    getAllUsers();
  }, []);

  console.log(users);

  return (
    <div className="py-10 lg:py-20 px-4 lg:pr-20 lg:pl-[350px] mx-auto w-full">
      {/* Container padding fixed for mobile (lg:pl-[350px] apply only on PC) */}
      <h1 className="font-bold text-2xl">User Management</h1>
      <p>View and manage registered Users</p>
      
      {/* Search Bar width made responsive */}
      <div className="flex relative w-full sm:w-[300px] mt-6">
        <Search className="absolute left-2 top-2.5 w-5 h-5 text-gray-600" />
        <Input 
          value={searTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}  
          className="pl-10 w-full" 
          placeholder="Search Users..." 
        />
      </div>
      
      {/* Grid made responsive (1 col on mobile, 2 on tablet, 3 on PC) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7 mt-7">
        {filteredUsers.map((user, index) => {
          return (
            <div key={index} className="bg-pink-100 p-4 md:p-5 rounded-lg flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user?.profilePic || userLogo}
                  alt=""
                  className="rounded-full w-14 md:w-16 aspect-square object-cover border border-pink-400 shrink-0"
                />
                <div className="overflow-hidden">
                  <h1 className="font-semibold text-sm md:text-base truncate">
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <h3 className="text-xs md:text-sm text-gray-700 truncate">
                    {user?.email}
                  </h3>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 flex items-center justify-center"
                  onClick={() => navigate(`/dashbord/users/${user._id}`)}  
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Button>
                <Button onClick={() => navigate(`/dashbord/users/orders/${user._id}`)} size="sm" className="flex-1 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-1" /> Show  Orders
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminUsers;



