import MenuItem from "./MenuItem";
import Socials from "./Socials";

function Menu(){
    return (
      <div className="w-52 h-56 bg-green-500 absolute left-52 top-8 rounded-lg shadow-xl">
        <MenuItem feat="Start Collaboration"></MenuItem>
        <MenuItem feat="Start Chat"></MenuItem>
        <MenuItem feat="Save as pdf"></MenuItem>
        <MenuItem feat="Save as png"></MenuItem>
        <Socials></Socials>
      </div>
    );
}

export default Menu;