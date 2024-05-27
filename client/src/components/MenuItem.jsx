/* eslint-disable react/prop-types */
function MenuItem(props) {
  return (
    <div className="h-11 w-15 border-b border-dotted cursor-pointer content-center">
      <h1
        className="font-sans text-white hover:text-emerald-300 justify-center flex"
        onClick={props.clickHandler}
      >
        {props.feat}
      </h1>
    </div>
  );
}

export default MenuItem;
