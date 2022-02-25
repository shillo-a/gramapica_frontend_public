import axios from "axios";
import { jsonServerURL } from "./apiUrls";

export default axios.create({
    baseURL: jsonServerURL, headers: {
        "Content-type": "application/json"
    }
});