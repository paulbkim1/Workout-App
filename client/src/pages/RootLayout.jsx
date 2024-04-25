import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "../util/auth";
import Footer from "../components/Footer";
import LandingNavigation from "../components/LandingNavigation";

const RootLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleTokenCheck = async () => {
      const token = getAuthToken();
      if (!token) {
        navigate("/");
        return;
      }
    };

    handleTokenCheck();

    const interval = setInterval(() => {
      handleTokenCheck();
    }, 60000);

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <LandingNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
