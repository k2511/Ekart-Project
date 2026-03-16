import ImageUploader from "@/components/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { setProducts } from "@/redux/productSlice";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddProduct = () => {
  const accessToken = localStorage.getItem("accessToken");
  const { products } = useSelector((store) => store.product);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ERROR FIX: Added `productImg: []` so the length check doesn't crash your app
  const [productData, setProductData] = useState({
    productName: "",
    productPrice: "",
    productDesc: "",
    brand: "",
    category: "",
    productImg: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const fromData = new FormData();
    fromData.append("productName", productData.productName);
    fromData.append("productPrice", productData.productPrice);
    fromData.append("productDesc", productData.productDesc);
    fromData.append("category", productData.category);
    fromData.append("brand", productData.brand);
    if (productData.productImg.length === 0) {
      toast.error("Please select atleast one image");
      return;
    }
    productData.productImg.forEach((img) => {
      fromData.append("files", img);
    });

    try {
      setLoading(true);
      const res = await axios.post(
        `http://localhost:8000/api/v1/products/add`,
        fromData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        dispatch(setProducts([...(products || []), res.data.product]));
        toast.success(res.data.message);
      }
    } catch (error) {
      // Yeh line terminal/console mein poora error print karegi
      console.log("BACKEND KA ASLI ERROR:", error.response?.data);

      // Yeh line aapki screen par error message dikhayegi
      const errorMessage =
        error.response?.data?.message || "Data format galat hai!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    // RESPONSIVE FIX: Removed hardcoded pl-[350px] for mobile, kept it for large screens (lg:pl-[350px])
    <div className="w-full min-h-screen px-4 py-10 mx-auto bg-gray-100 sm:px-8 lg:pl-[350px] lg:pr-20 lg:py-20">
      {/* RESPONSIVE FIX: Adjusted margins so it doesn't take up too much vertical space on mobile */}
      <Card className="w-full max-w-5xl mx-auto my-4 lg:my-10">
        <CardHeader>
          <CardTitle>Add to Products</CardTitle>
          <CardDescription>Enter Products Details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="grid gap-2">
              <Label>Product Name</Label>
              <Input
                type="text"
                name="productName"
                placeholder="Ex-Iphone"
                required
                value={productData.productName}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label>Price</Label>
              <Input
                type="number"
                name="productPrice"
                placeholder="price"
                required
                value={productData.productPrice}
                onChange={handleChange}
              />
            </div>

            {/* RESPONSIVE FIX: 1 column on mobile, 2 columns on tablet/desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Brand</Label>
                <Input
                  type="text"
                  name="brand"
                  placeholder="Ex-apple"
                  required
                  value={productData.brand}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Input
                  type="text"
                  name="category"
                  placeholder="Ex-Mobile"
                  required
                  value={productData.category}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid gap-4">
              {/* RESPONSIVE FIX: Changed to flex-col so Label and Textarea don't squash each other on small screens */}
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  value={productData.productDesc}
                  onChange={handleChange}
                  name="productDesc" // FIX: Changed from productDesc to match your state variable
                  placeholder="enter brief description of products"
                  className="min-h-[100px]"
                />
              </div>

              <ImageUploader
                productData={productData}
                setProductData={setProductData}
              />
            </div>

            <CardFooter className="px-0 pt-4 flex-col gap-2">
              <Button
                disabled={loading}
                onClick={submitHandler}
                className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700"
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center gap-2 justify-center">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Please wait...
                  </span>
                ) : (
                  "Add Product"
                )}
              </Button>
            </CardFooter>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
