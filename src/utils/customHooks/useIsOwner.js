import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../store/slices/authenticationSlice';

export const useIsOwner = (userId) => {

    const currentUser = useSelector(selectCurrentUser);

    if(currentUser.id === userId){
        return true
    } else {
        return false
    }

    
}
