import MenuItem from "./MenuItem";
import Socials from "./Socials";
import SponsorBtn from "./SponsorBtn";

function Menu(){
    return (
      <div className="w-52 h-71 rounded-xl bg-gradient-to-r from-slate-900 to-slate-700 absolute left-52 top-8 rounded-lg shadow-xl">
        <MenuItem feat="Start Collaboration"></MenuItem>
        <MenuItem feat="Start Chat"></MenuItem>
        <MenuItem feat="Save as pdf"></MenuItem>
        <MenuItem feat="Save as png"></MenuItem>
        <SponsorBtn></SponsorBtn>
        <Socials></Socials>
      </div>
    );
}

export default Menu;