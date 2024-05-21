import { getCityCoordinates } from "./combine";

const listener = () => {
    searchBtn.addEventListener("click",getCityCoordinates)
}

export default listener;