import { useLocation } from "react-router-dom";

export const useQueryParams = () => {

    const location = useLocation()
    const locationSearch = location.search;
    const queryParams = new URLSearchParams(locationSearch); 
    
    return queryParams;
    
}