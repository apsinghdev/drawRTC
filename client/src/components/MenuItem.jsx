/* eslint-disable react/prop-types */
function MenuItem(props){
    return (
      <div className="h-11 w-15 border-b border-dotted cursor-pointer content-center">
        <h1 className="font-sans text-white justify-center flex">
          {props.feat}
        </h1>
      </div>
    );
}

export default MenuItem;