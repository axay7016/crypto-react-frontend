import React from 'react'

const Durations = ({ handleCheckBox }) => {
    return (
        <>
            <div className="single-item duration-mobile" name="coins">
                <>
                    {
                        [30, 2, 6, 24].map((duratonOfGame, index) => {
                            return (

                                <label className="checkbox-single d-flex align-items-center" key={index}>
                                    <span className="left-area">
                                        <span className="checkbox-area d-flex">
                                            <input
                                                name="duration"
                                                type="checkbox"
                                                id={duratonOfGame}
                                                onChange={handleCheckBox}
                                            />
                                            <span className="checkmark"></span>
                                        </span>
                                    </span>
                                    <span className="item-title d-flex align-items-center"
                                        onClick={handleCheckBox}
                                    >
                                        <span>{`${duratonOfGame} ${duratonOfGame == 30 ? 'mins' : 'hours'}`}</span>
                                    </span>
                                </label>
                            )
                        })
                    }
                </>
            </div>
        </>
    )
}

export default Durations