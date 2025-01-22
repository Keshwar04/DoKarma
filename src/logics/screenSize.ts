import { useEffect } from 'react'
import { useCommonStore} from '../store/zustand'

export const fecthScreenSize = () => {
    const { setInnerWidth } = useCommonStore()
    useEffect(() => {
        const handleResize = () => setInnerWidth(window.innerWidth)
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])
}
