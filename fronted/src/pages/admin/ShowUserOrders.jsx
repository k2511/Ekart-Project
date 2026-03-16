import OrderCard from "@/components/OderCard"; // Ensure the file name is 'OderCard' or 'OrderCard'
import axios from "axios";
import React, { useState, useEffect } from "react"; // Added useEffect
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ShowUserOrders = () => {
  // 1. Initialize with an empty array
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  // 2. Added 'async' keyword here
  const getUserOrders = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/orders/user/user-order/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.data.success) {
        setUserOrders(res.data.orders);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
      toast.error("Failed to load user orders");
    } finally {
      setLoading(false);
    }
  };

  // 3. Call the function when component mounts or userId changes
  useEffect(() => {
    if (params.userId) {
      getUserOrders();
    }
  }, [params.userId]);

  if (loading)
    return <div className="p-10 text-center">Loading User Orders...</div>;

  return (
    <div>
      {/* userOrders will now always be an array (either empty or with data) */}
      <OrderCard userOrders={userOrders} />
    </div>
  );
};

export default ShowUserOrders;
