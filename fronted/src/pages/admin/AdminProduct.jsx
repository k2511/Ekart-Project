import { Input } from "@/components/ui/input";
import { Edit, Search, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/ImageUploader";
import axios from "axios";
import { toast } from "sonner";
import { setProducts } from "@/redux/productSlice";

const AdminProduct = () => {
  const { products } = useSelector((store) => store.product);
  const [editProduct, setEditProduct] = useState(null);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setOrder] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  // 1. FIXED: Search Filter Logic with optional chaining for safety
  let filteredProduct =
    products?.filter((product) => {
      if (!searchTerm) return true; // Agar search khali hai toh sab dikhao
      const searchLower = searchTerm.toLowerCase();
      return (
        product?.productName?.toLowerCase().includes(searchLower) ||
        product?.brand?.toLowerCase().includes(searchLower) ||
        product?.category?.toLowerCase().includes(searchLower)
      );
    }) || [];

  // Sort Logic
  if (sortOrder === "lowToHigh") {
    filteredProduct = [...filteredProduct].sort(
      (a, b) => a.productPrice - b.productPrice,
    );
  } else if (sortOrder === "highToLow") {
    filteredProduct = [...filteredProduct].sort(
      (a, b) => b.productPrice - a.productPrice,
    );
  }

  // 2. FIXED: handleChange e.target logic
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editProduct) return;

    const formData = new FormData();
    formData.append("productName", editProduct.productName);
    formData.append("productDesc", editProduct.productDesc);
    formData.append("productPrice", editProduct.productPrice);
    formData.append("category", editProduct.category); // Spelling fixed
    formData.append("brand", editProduct.brand);

    // FIXED: safely handle existing images
    const existingImages =
      editProduct?.productImg
        ?.filter((img) => !(img instanceof File) && img.public_id)
        ?.map((img) => img.public_id) || [];

    formData.append("existingImages", JSON.stringify(existingImages));

    // 3. FIXED: productImg is an array, not a function
    const newFiles =
      editProduct?.productImg?.filter((img) => img instanceof File) || [];
    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.put(
        `http://localhost:8000/api/v1/products/update/${editProduct._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product Updated Successfully");
        const updateProducts = products.map((p) =>
          p._id === editProduct._id ? res.data.product : p,
        );
        dispatch(setProducts(updateProducts));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    }
  };

  const deleteProductHandler = async (productId) => {
    try {
      const remainingProduct = products.filter(
        (product) => product._id !== productId,
      );
      const res = await axios.delete(
        `http://localhost:8000/api/v1/products/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      if (res.data.success) {
        toast.success("Product deleted successfully!");
        dispatch(setProducts(remainingProduct));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
  };

  return (
    // 4. FIXED RESPONSIVENESS: Adjusted padding for mobile vs desktop
    <div className="p-8 md:pl-[350px] md:pr-10 lg:pr-20 py-10 md:py-20 flex flex-col gap-4 min-h-screen bg-gray-100 overflow-x-hidden">
      {/* Search & Sort Header - Flex column on mobile, row on larger screens */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative mt-8 bg-white rounded-lg w-full md:w-[400px]">
          <Input
            type="text"
            placeholder="Search Product by name, brand..."
            className="w-full pr-10" // Full width on mobile
            value={searchTerm} // Fixed from values to value
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-3 top-2 text-gray-400" size={20} />
        </div>

        <Select onValueChange={(value) => setOrder(value)}>
          <SelectTrigger className="w-full md:w-[200px] bg-white">
            <SelectValue placeholder="Sort By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="lowToHigh">Price : Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {filteredProduct?.length === 0 && (
          <p className="text-center text-gray-500 py-10">No products found.</p>
        )}

        {filteredProduct?.map((product, index) => {
          return (
            <Card key={product?._id || index} className="p-4">
              {/* Product Card Layout - Wrap on very small screens */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Image & Title */}
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <img
                    src={
                      product?.productImg?.[0]?.url || "/placeholder-image.jpg"
                    }
                    alt={product?.productName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md border" // Standard tailwind sizes
                  />
                  <h1 className="font-bold text-gray-700 flex-1 sm:w-64 line-clamp-2">
                    {product?.productName}
                  </h1>
                </div>

                {/* Price & Actions container */}
                <div className="flex items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 mt-2 sm:mt-0 border-t sm:border-none pt-2 sm:pt-0">
                  <h1 className="font-semibold text-gray-800 whitespace-nowrap">
                    ₹{product?.productPrice}
                  </h1>

                  <div className="flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon" // Better for mobile icons
                          onClick={() => {
                            setEditProduct(product);
                            setOpen(true);
                          }}
                        >
                          <Edit className="text-green-500 cursor-pointer h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[625px] max-h-[85vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                          <DialogDescription>
                            Make changes to your Product here. Click save when
                            you're done.
                          </DialogDescription>
                        </DialogHeader>

                        <div className="flex flex-col gap-4 py-4">
                          <div className="grid gap-2">
                            <Label>Product Name</Label>
                            <Input
                              type="text"
                              name="productName"
                              placeholder="Ex Iphone"
                              required
                              value={editProduct?.productName || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Price</Label>
                            <Input
                              type="number"
                              name="productPrice"
                              required
                              value={editProduct?.productPrice || ""}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label>Brand</Label>
                              <Input
                                type="text"
                                name="brand"
                                required
                                placeholder="Ex Apple"
                                value={editProduct?.brand || ""}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="grid gap-2">
                              <Label>Category</Label>
                              <Input
                                type="text"
                                name="category"
                                required
                                placeholder="mobile"
                                value={editProduct?.category || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="grid gap-2">
                            <Label>Product Description</Label>
                            <Textarea
                              value={editProduct?.productDesc || ""}
                              onChange={handleChange}
                              name="productDesc"
                              placeholder="Enter Description of product..."
                              className="resize-none"
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label>Images</Label>
                            <ImageUploader
                              productData={editProduct} // Fixed prop name to make it standard
                              setProductData={setEditProduct}
                            />
                          </div>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                          <DialogClose asChild>
                            <Button variant="outline" type="button">
                              Cancel
                            </Button>
                          </DialogClose>
                          <Button onClick={handleSave} type="button">
                            Save changes
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Trash2 className="text-red-500 cursor-pointer h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="w-[90%] sm:w-full rounded-lg">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your product.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => deleteProductHandler(product?._id)}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default AdminProduct;
