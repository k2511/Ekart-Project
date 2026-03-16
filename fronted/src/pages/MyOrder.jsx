import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import OrderCard from "@/components/OderCard"; // Fixed: spelling 'OrderCard'

const MyOrder = () => {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setLoading(false);
      return toast.error("Please login to see orders");
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/myorder`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (res.data.success) {
        setUserOrders(res.data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 font-medium">Loading your orders...</div>;
  }

  return <OrderCard userOrders={userOrders} />;
};

export default MyOrder;