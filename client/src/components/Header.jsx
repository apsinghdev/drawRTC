/* eslint-disable react/prop-types */
function Header(props) {
  return (
    <div className="flex py-5 justify-around bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full items-center">
      <h1 className="font-sans text-2xl antialiased font-extrabold text-white">
        drawRTC
      </h1>
      <div className="cursor-pointer" id="options">
        <span className="text-white hover:text-emerald-300 text-2xl" onClick={props.toggleMenu}>≡</span>
      </div>
    </div>
  );
}

export default Header;
