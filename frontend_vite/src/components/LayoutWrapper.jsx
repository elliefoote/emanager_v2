import { Footer } from "./Footer";
import Navbar from "./Navbar";

const LayoutWrapper = ({ children }) => {
  return (
    <div>
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
