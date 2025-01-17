import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";

export const AppLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};
