import axios from "axios";
import { baseURL } from "./apiUrls";

export default axios.create({
    // baseURL: "http://localhost:3004", //testing on json server
    baseURL: baseURL, headers: {
        // "Content-type": "multipart/form-data"
    }
});