import sponsorImg from "../assets/sponsor.png";
const link = "https://github.com/sponsors/apsinghdev?o=esb";

function clickHandler(){
    window.open(link, '_blank');
}

function SponsorBtn(){
    return (
      <div className="flex items-center justify-center mt-3 cursor-pointer border-b border-dotted pb-2">
        <img src={sponsorImg} className="h-5 w-5 rounded"></img>
        <h1 className="text-white pl-1 cursor-pointer font-sans" onClick={clickHandler}>Sponsor</h1>
      </div>
    );
}

export default SponsorBtn;