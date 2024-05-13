import MenuItem from "./MenuItem";
import Socials from "./Socials";

function Menu(){
    return (
      <div className="w-20 h-auto bg-white z-100">
        <MenuItem feat="Start Collaboration"></MenuItem>
        <MenuItem feat="Start Chat"></MenuItem>
        <MenuItem feat="Save as pdf"></MenuItem>
        <MenuItem feat="Save as png"></MenuItem>
        <Socials></Socials>
      </div>
    );
}

export default Menu;