import Footer from "./Footer";
import NavBar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main style={{ minHeight: "75vh" }}>{children}</main>
      <Footer />
    </>
  );
}
