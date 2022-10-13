import React from 'react'
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';

const CounterSection = () => {
    const { t } = useTranslation(["common"]);
    return (
        <div className="counter-section mt-3 mb-3">
            <div className="container">
                <div className="row cus-mar">
                    <div className="col-xl-4 col-md-6">
                        <div className="single-area d-flex align-items-center">
                            <div className="img-area">
                                <img src="assets/images/icon/counter-icon-1.png" alt="image" />
                            </div>
                            <div className="text-area">
                                <h3 className="m-none"><span className="counter">€<CountUp separator="," start={0} end={104941} /></span></h3>
                                <p>{t("paidOutPrizeinTotal")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="single-area d-flex align-items-center">
                            <div className="img-area">
                                <img src="assets/images/icon/counter-icon-2.png" alt="image" />
                            </div>
                            <div className="text-area">
                                <h3 className="m-none"><span className="counter"><CountUp separator="," start={0} end={76752} /></span></h3>
                                <p>{t("winners")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-md-6">
                        <div className="single-area d-flex align-items-center">
                            <div className="img-area">
                                <img src="assets/images/icon/counter-icon-3.png" alt="image" />
                            </div>
                            <div className="text-area">
                                <h3 className="m-none"><span className="counter"><CountUp separator="," start={0} end={4392} /></span></h3>
                                <p>{t("playersOnline")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CounterSection