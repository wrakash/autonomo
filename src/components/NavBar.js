import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function NavBar({ children }) {
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

  const toggleAction = () => {
    setToggle((prev) => !prev);
  };

  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && wrapperRef.current.contains(event.target)) {
        setToggle(() => true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  window.onscroll = function (e) {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var header = document.querySelector(".scroll");

    scrollY <= this.lastScroll
      ? (header.style.visibility = "visible")
      : (header.style.visibility = "hidden");

    this.lastScroll = scrollY;

    setToggle(() => true);
  };

  const lock = async () => {
    //lock
    localStorage.clear();
    history.push("/lock");
    await axios.post(
      process.env.REACT_APP_LOCK_URL,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      {
        machineId: `${localStorage.getItem("unlock-token")}-machine`,
      }
    );

   
  };

  return (
    <div className="relative min-h-screen md:flex">
      <div className="w-full h-16 bg-gray-900 text-gray-100 flex justify-between md:hidden scroll fixed top-0 select-none">
        <Link to="/" className="block p-4 text-white font-bold">
          Autonomo
        </Link>

        <button
          onClick={toggleAction}
          className="m-2 p-3 focus:outline-none focus:bg-gray-700 focus:rounded-lg"
        >
          <svg
            className="h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div
        className={`bg-gray-900 select-none fixed top-0 text-blue-100  w-64 space-y-6 py-3 lg:py-7 px-2  inset-y-0 left-0 transform ${
          toggle ? "-translate-x-full" : null
        } md:relative md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <Link
          to="/"
          className="text-white flex items-center space-x-2 px-4 select-none"
        >
          <svg
            className="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span className="text-2xl font-extrabold ">Autonomo</span>
        </Link>

        <nav>
          <Link to="/" className="link">
            Heart Beat
          </Link>

          <Link to="/machine/measurement" className="link">
            Measurement
          </Link>

          <Link to="/machine/user/cart" className="link">
            User Cart
          </Link>

          <Link onClick={lock} className="link">
            Lock
          </Link>
        </nav>
      </div>

      <div className="flex-1" ref={wrapperRef}>
        {children}
      </div>
    </div>
  );
}

export default NavBar;
