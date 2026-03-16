import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import VerifyEmail from "./pages/VerifyEmail";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Dashbord from "./pages/Dashbord";
import AdminSales from "./pages/admin/AdminSales";
import AddProduct from "./pages/admin/AddProduct";
import AdminProduct from "./pages/admin/AdminProduct";
import AdmingOrders from "./pages/admin/AdmingOrders";
import ShowUserOrders from "./pages/admin/ShowUserOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import UserInfo from "./pages/admin/UserInfo";
import ProtectRoute from "./components/ProtectRoute";
import SingleProduct from "./pages/SingleProduct";
import AllProducts from "./pages/AllProducts";
import AddressFrom from "./pages/AddressFrom";
import OrderSuccess from "./pages/OderSuccess";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <AllProducts />
        <Footer />
      </>
    ),
  },
  {
    path: "/signUp",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/verify",
    element: (
      <>
        <Verify />
      </>
    ),
  },
  {
    path: "/verify/:token",
    element: (
      <>
        <VerifyEmail />
      </>
    ),
  },
  {
    path: "/profile/:userId",
    element: (
      <>
        <ProtectRoute>
          <Navbar />
          <Profile />
          <Footer />
        </ProtectRoute>
      </>
    ),
  },

  {
    path: "/products",
    element: (
      <>
        <Navbar />
        <Products />
      </>
    ),
  },

  {
    path: "/products/:id",
    element: (
      <>
        <Navbar />
        <SingleProduct />
      </>
    ),
  },
  {
    path: "/cart",
    element: (
      <>
        <ProtectRoute>
          <Navbar />
          <Cart />
        </ProtectRoute>
      </>
    ),
  },
  {
    path:"order-success",
    element:<ProtectRoute><OrderSuccess/></ProtectRoute>
  },
  {
    path: "/address",
    element: (
      <>
        <ProtectRoute>
         <AddressFrom/>
        </ProtectRoute>
      </>
    ),
  },
  {
    path: "/dashbord",
    element: (
      <ProtectRoute adminOnly={true}>
        {" "}
        <Navbar /> <Dashbord />
      </ProtectRoute>
    ),
    children: [
      {
        path: "sales",
        element: <AdminSales />,
      },
      {
        path: "add-products",
        element: <AddProduct />,
      },
      {
        path: "products",
        element: <AdminProduct />,
      },
      {
        path: "orders",
        element: <AdmingOrders />,
      },
      {
        path: "users/orders/:userId",
        element: <ShowUserOrders />,
      },
      {
        path: "users",
        element: <AdminUsers />,
      },
      {
        path: "users/:id",
        element: <UserInfo />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
