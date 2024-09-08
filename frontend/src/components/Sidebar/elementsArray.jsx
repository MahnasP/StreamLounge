import { TbHome } from "react-icons/tb";
import { MdSearch } from "react-icons/md";
import { GrFavorite } from "react-icons/gr";
import { SlCloudUpload } from "react-icons/sl";
import { TbLogout2 } from "react-icons/tb";


export const elements = [
    {
        link: "/",
        icon: <TbHome className=" mx-2" size={"2em"}/>,
        name: "Dashboard",
    },
    {
        link: "/search",
        icon: <MdSearch className=" mx-2" size={"2em"}/>,
        name: "Search",
    },
    {
        link: "/favorites",
        icon: <GrFavorite className=" mx-2" size={"2em"}/>,
        name: "Favorites",
    },
];

export const buttons = [
    {
        fun: ()=>document.getElementById('upload_modal').showModal(),
        icon: <SlCloudUpload className=" mx-2" size={"2em"}/>,
        name: "Upload",
    },
    
    
];


