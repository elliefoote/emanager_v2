import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const copy = {
    authed: {
      heading: "Welcome back!",
      para: "Whether you're in charge of maintenance, repairs, or replacements, this app is your one-stop-shop for all your repair management needs. Streamline your repair tasks and stay organized with our app. ",
      link: {
        text: "My Jobs",
        href: "/myjobs",
      },
    },
    unauthed: {
      heading: "Hi there!",
      para: "Manage your small business clients and tasks all in one place with our easy-to-use app. Stay on top of everything and grow your business. Try it now!",
      link: {
        text: "Get Started",
        href: "/signup",
      },
    },
  };
  const { user } = useContext(AuthContext);
  return (
    <div className="hero h-screen -mt-24">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            {user ? copy.authed.heading : copy.unauthed.heading}
          </h1>
          <p className="py-6">{user ? copy.authed.para : copy.unauthed.para}</p>
          <Link
            className="btn btn-primary"
            to={user ? copy.authed.link.href : copy.unauthed.link.href}
          >
            {user ? copy.authed.link.text : copy.unauthed.link.text}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
