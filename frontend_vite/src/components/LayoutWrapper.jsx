import { Footer } from "./Footer";
import Navbar from "./Navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default LayoutWrapper;
