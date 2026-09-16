import { Outlet } from "react-router-dom";
import PageMetadata from "../seo/PageMetadata";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function PublicLayout() {
  return (
    <>
      <PageMetadata />
      <NavBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
