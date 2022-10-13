import React, { useEffect, useState } from 'react'

const Timer = ({ hours, minutes, seconds, gameDuration }) => {

    const [h, setH] = useState(hours)
    const [m, setM] = useState(minutes)
    const [s, setS] = useState(seconds)


    useEffect(() => {
        const interval = setInterval(() => {
            if (s > 0) {
                setS(s - 1)
            } else if (m > 0) {
                setM(m - 1)
                setS(59)
            } else if (h > 0) {
                setH(h - 1)
                setM(59)
                setS(59)
            }
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [h, m, s])

    return (
        <>

            <div className={`countdown d-flex align-items-center justify-content-center
           
                ${(gameDuration == 30 && h == 0 && m == 15) ? 'one-minute-countdown' : (gameDuration >= 2 && h == 1 && m <= 1) && 'one-minute-countdown'}`}
            >
                <div className="timer-item">
                    <div className="timer-item-inner">
                        <span className="timer-item-number hour" id='hour'>

                            {h.toString().length == 1 ? `0${h}` : `${h}`}h:
                        </span>
                    </div>
                </div>

                <div className="timer-item">
                    <div className="timer-item-inner">
                        <span className="timer-item-number minute " id='minute'>
                            {m.toString().length == 1 ? `0${m}` : `${m}`}m:

                        </span>
                    </div>
                </div>
                <div className="timer-item">
                    <div className="timer-item-inner">
                        <span className="timer-item-number second" id='second'>
                            {s.toString().length == 1 ? `0${s}` : `${s}`}s
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Timer

 //  ${(m <= 1 && h < 1) && 'one-minute-countdown'}`}