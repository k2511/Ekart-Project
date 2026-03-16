import { LayoutDashboard, PackagePlus, PackageSearch, Users } from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="hidden fixed md:block border-r bg-pink-50 border-pink-200 x-10 w-[300px] p-10 space-y-2 h-screen">
      <div className="text-center p-10 px-3 space-y-2">
        <NavLink
          to="/dashbord/sales"
          className={({ isActive }) =>
            `text-xl flex items-center p-3 rounded-2xl w-full gap-3 ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"}`
          }
        >
          <LayoutDashboard />
          <span>Dashboard</span>
        </NavLink>{" "}


          <NavLink
          to="/dashbord/add-products"
          className={({ isActive }) =>
            `text-xl flex items-center p-3 rounded-2xl w-full gap-3 ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"}`
          }
        >
          <PackagePlus />
            <span>Add Product</span>
        </NavLink>



          <NavLink
          to="/dashbord/products"
          className={({ isActive }) =>
            `text-xl flex items-center p-3 rounded-2xl w-full gap-3 ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"}`
          }
        >
          <PackageSearch />
          <span>Products</span>
        </NavLink>


          <NavLink
          to="/dashbord/users"
          className={({ isActive }) =>
            `text-xl flex items-center p-3 rounded-2xl w-full gap-3 ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"}`
          }
        >
          <Users />
          <span>Users</span>
        </NavLink>


          <NavLink
          to="/dashbord/orders"
          className={({ isActive }) =>
            `text-xl flex items-center p-3 rounded-2xl w-full gap-3 ${isActive ? "bg-pink-600 text-gray-200" : "bg-transparent"}`
          }
        >
          <FaRegEdit />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
