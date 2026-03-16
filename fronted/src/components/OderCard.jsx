import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderCard = ({ userOrders }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pl-[350px] bg-gray-50 pb-10">
      <div className="max-w-5xl mx-auto p-4 md:p-6">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">My Orders</h1>
        </div>

        {/* Empty State */}
        {userOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border shadow-sm">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">No Orders Found</h2>
            <p className="text-gray-400 mt-2">Looks like you haven't ordered anything yet.</p>
            <Button className="mt-6 bg-pink-600" onClick={() => navigate("/")}>
              Shop Now
            </Button>
          </div>
        ) : (
          /* Orders List */
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-sm rounded-2xl p-4 md:p-6 border border-gray-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="flex flex-col md:flex-row justify-between pb-4 mb-4 gap-2 border-b">
                  <div>
                    <h2 className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Order ID
                    </h2>
                    <p className="text-gray-800 font-mono text-xs md:text-sm">{order._id}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="text-xs md:text-sm font-semibold text-gray-400 uppercase tracking-wider">
                      Total Amount
                    </p>
                    <p className="text-lg font-bold text-pink-600">
                      {order.currency} {order.amount?.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : order.status === "Failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-xs text-gray-500">
                    Email: <span className="text-gray-700">{order.user?.email || "N/A"}</span>
                  </p>
                </div>

                {/* Products List */}
                <div className="space-y-4">
                  {order.products.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100"
                    >
                      <img
                        onClick={() => navigate(`/product/${item.productId?._id}`)} // Fixed: item.productId?._id
                        className="w-20 h-20 object-cover rounded-lg border bg-white cursor-pointer hover:opacity-80 transition"
                        src={item.productId?.productImg?.[0] || "https://via.placeholder.com/150"}
                        alt="product"
                      />
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-semibold text-gray-800 line-clamp-1">
                          {item.productId?.productName}
                        </h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-gray-800 font-bold">
                        ₹{item.productId?.productPrice?.toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderCard;