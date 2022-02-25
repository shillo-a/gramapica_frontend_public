import axios from "axios";
import { baseURL } from "./apiUrls";

export default axios.create({
    baseURL: baseURL, headers: {
        "Content-type": "application/json"
    }
});