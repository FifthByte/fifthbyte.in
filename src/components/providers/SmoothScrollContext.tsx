import { createContext, useContext } from 'react'
import Lenis from 'lenis'

export interface SmoothScrollContextType {
    lenis: Lenis | null
}

export const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null })

export const useLenis = () => useContext(SmoothScrollContext)