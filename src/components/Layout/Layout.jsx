import Footer from "./Footer";
import NavBar from "./Navbar";
export default function Layout({ children, home }) {
  // console.log(children);
  return (
    <>
      {home ? <NavBar home={home} /> : <NavBar home={false} />}
      <main style={{ minHeight: "75vh" }}>{children}</main>
      {home ? <div></div> : <Footer />}
    </>
  );
}
