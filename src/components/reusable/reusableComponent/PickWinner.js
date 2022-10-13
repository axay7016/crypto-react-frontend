import React from 'react'

const PickWinner = ({ teamA, teamB, teamALogo, teamBLogo, division }) => {
    return (
        <div className="single-area">
            <div className="head-area d-flex align-items-center">
                <span className="mdr cmn-btn">Pick Winner</span>
                <p>Mar 23, 2022,3:45PM EDT</p>
            </div>
            <div className="main-content">
                <div className="team-single">
                    <h4>{teamA}</h4>
                    <span className="mdr">Home</span>
                    <div className="img-area">
                        <img src={teamALogo} alt="teamALogo" />
                    </div>
                </div>
                <div className="mid-area text-center">
                    <div className="countdown d-flex align-items-center justify-content-center">
                        <h4>
                            <span className="hours">00</span><span className="ref">h</span><span
                                className="seperator">:</span>
                        </h4>
                        <h4>
                            <span className="minutes">00</span><span className="ref">m</span><span
                                className="seperator">:</span>
                        </h4>
                        <h4>
                            <span className="seconds">00</span><span className="ref">s</span>
                        </h4>
                    </div>
                    <h6>Division- {division}</h6>
                </div>
                <div className="team-single">
                    <h4>{teamB}</h4>
                    <span className="mdr">Away</span>
                    <div className="img-area">
                        <img src={teamBLogo} alt="teamBLogo" />
                    </div>
                </div>
            </div>
            <div className="bottom-item">
                <button type="button" className="cmn-btn firstTeam" data-bs-toggle="modal"
                    data-bs-target="#betpop-up">Eagle will win</button>
                <button type="button" className="cmn-btn draw" data-bs-toggle="modal"
                    data-bs-target="#betpop-up">Draw</button>
                <button type="button" className="cmn-btn lastTeam" data-bs-toggle="modal"
                    data-bs-target="#betpop-up">Paeek will win</button>
            </div>
        </div>
    )
}

export default PickWinner