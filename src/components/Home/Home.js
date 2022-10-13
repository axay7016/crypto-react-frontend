import { useEffect } from 'react'
import Baner from './Baner'
import BetThisGame from './BetThisGame'
import CounterSection from './CounterSection'
import Faq from './Faq'
import HowItWorks from './HowItWorks'
import TableStatic from './TableStatic'

export const Home = () => {
    useEffect(()=>{
        console.info = function () {};
        console.warn = function () {};
        console.error = function () {};
        console.debug = () => {}
    },[])
        
    return (
        <>
            <Baner />
            <BetThisGame />
            <CounterSection />
            <HowItWorks />
            <TableStatic />
            <Faq />
        </>
    )
}

