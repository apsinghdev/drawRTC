/* eslint-disable react/prop-types */
import Header from "./Header";
import Toolbar from "./Toolbar";
import LoginAndLogout from "./LoginAndLogout";

function Sidebar(props){
    return (
      <div
        className="flex flex-col w-64 bg-gradient-to-r from-slate-900 to-slate-700 relative"
        ref={props.ref}
      >
        <Header toggleMenu={props.toggleMenu}></Header>
        <Toolbar
          clearOnClick={props.clearOnClick}
          id={props.id}
          addLineWidth={props.addLineWidth}
          addStroke={props.addStroke}
        ></Toolbar>
        <LoginAndLogout></LoginAndLogout>
      </div>
    );
}

export default Sidebar;