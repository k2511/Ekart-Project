
import FillterSidebar from "@/components/FillterSidebar";
import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCart from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "@/redux/productSlice";

const Products = () => {
  const { products } = useSelector((store) => store.product);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 999999]);
  const [sortOrder, setSortOrder] = useState("");

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8000/api/v1/products/getallproudcts`
      );
      if (res.data.success) {
        setAllProducts(res.data.products);
        dispatch(setProducts(res.data.products));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (allProducts.length === 0) return;

    let filtered = [...allProducts];

    if (search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      filtered = filtered.filter((p) => p.category === category);
    }

    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    filtered = filtered.filter(
      (p) => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    );

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice);
    }
    
    dispatch(setProducts(filtered));
  }, [search, category, brand, sortOrder, priceRange, allProducts, dispatch]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="pt-20 sm:pt-24 pb-8 sm:pb-16 bg-gray-50 min-h-screen px-3 sm:px-6 lg:px-8 w-full overflow-x-hidden">
      {/* Responsive Flex Container: Column on Mobile, Row on Desktop */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-5 lg:gap-8 items-start w-full">
        
        {/* Sidebar wrapper - Takes full width on mobile, fixed width on desktop */}
        <div className="w-full lg:w-1/4 xl:w-1/5 shrink-0 lg:sticky lg:top-24 z-10">
          <FillterSidebar
            search={search}
            setSearch={setSearch}
            bran={brand} // Note: Keeping your original prop name 'bran' so it doesn't break
            setBrand={setBrand}
            category={category}
            setCategory={setCategory}
            setPriceRange={setPriceRange}
            allProducts={allProducts}
            priceRange={priceRange}
          />
        </div>

        {/* Main Product Section */}
        <div className="flex flex-col flex-1 w-full">
          
          {/* Top Control Bar (Results Count & Sort) */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100 w-full">
            <h2 className="text-gray-600 font-medium text-sm sm:text-base">
              Showing <span className="text-gray-900 font-bold">{products?.length || 0}</span> products
            </h2>
            
            <Select onValueChange={(value) => setSortOrder(value)}>
              <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-200 text-sm">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product grid - Responsive columns */}
          {products?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 w-full">
              {products.map((product) => {
                return (
                  <ProductCart
                    key={product._id}
                    product={product}
                    loading={loading}
                  />
                );
              })}
            </div>
          ) : (
            /* Empty State if no products match the filter */
            <div className="flex flex-col items-center justify-center py-12 sm:py-20 px-4 text-center bg-white rounded-lg shadow-sm border border-gray-100 w-full">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">No products found</h3>
              <p className="text-sm sm:text-base text-gray-500 mt-2">Try adjusting your filters or searching for something else.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;