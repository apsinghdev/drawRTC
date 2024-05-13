/* eslint-disable react/prop-types */
import Header from "./Header";
import Toolbar from "./Toolbar";
import LoginAndLogout from "./LoginAndLogout";

function Sidebar(props){
    return (
      <div className="flex flex-col w-64 bg-zinc-800 relative" ref={props.ref}>
        <Header></Header>
        <Toolbar clearOnClick={props.clearOnClick} id={props.id}></Toolbar>
        <LoginAndLogout></LoginAndLogout>
      </div>
    );
}

export default Sidebar;