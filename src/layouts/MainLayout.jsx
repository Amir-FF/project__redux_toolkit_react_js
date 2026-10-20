import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () => (
  <>
    <Header />
    <div className="container mx-auto mt-15 px-4 sm:px-6 lg:px-8">
      <Outlet />
    </div>
  </>
);

export default MainLayout;
