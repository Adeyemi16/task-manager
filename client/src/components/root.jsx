import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Root = () => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "100vh", height: "auto" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Root;
