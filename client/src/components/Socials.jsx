import Xlogo from "../assets/xlogo.png"
const link = "https://twitter.com/ajeetunc"; 

function Socials(){
  function clickHandler(){
      window.open(link, "_blank");
  }
  return (
    <div className="flex items-center justify-center my-3">
      <h1 className="text-white mr-2 cursor-pointer font-sans" onClick={clickHandler}>
        Built By{" "}
        <span className="font-mono text-emerald-300">
          Ajeet
        </span>
      </h1>
      <img
        src={Xlogo}
        className="h-5 w-5 rounded cursor-pointer"
        onClick={clickHandler}
      ></img>
    </div>
  );
}

export default Socials;