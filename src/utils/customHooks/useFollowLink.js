import { useHistory } from 'react-router-dom'

const useFollowLink = () => {
    const history = useHistory()
    return (pathname, absolute = true) => {
        if(absolute){
            history.push(pathname)
        } else { //relative path
            history.push(history.location.pathname + pathname)
        }
        window.scrollTo(0, 0)
    }
}

export default useFollowLink