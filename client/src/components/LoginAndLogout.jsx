import UserDP from "../assets/user-dp.jpg";

function LoginAndLogout() {
  return (
    <div className="flex py-3 rounded-lg justify-around mt-55 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full items-center bottom-0 absolute">
      <h1 className="font-sans text-lg antialiased font-semibold text-white">
        Ajeet
      </h1>
      <img
        src={UserDP}
        className="rounded-full object-cover h-8 w-8 ml-4"
      ></img>
    </div>
  );
}

export default LoginAndLogout;
