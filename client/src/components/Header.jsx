/* eslint-disable react/prop-types */
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function Header(props) {
  const toggleMenu = () => props.setShowMenu((prev) => !prev);

  return (
    <div className="flex py-5 justify-around bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full items-center">
      <h1 className="font-sans text-2xl antialiased font-extrabold text-white">
        drawRTC
      </h1>
      <div className="cursor-pointer" id="options">

        {/* conditionally show hamburger or Xmark */}
        {props.showMenu ? (
          <FaXmark className="hover:text-neutral-600" size={25} onClick={toggleMenu} />
        ) : (
          <FaBars className="hover:text-neutral-600" size={25} onClick={toggleMenu} />
        )}
      </div>
    </div>
  );
}

export default Header;
