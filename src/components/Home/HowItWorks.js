import React from 'react'
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
const HowItWorks = () => {
    const { t } = useTranslation(["common"]);
    const navigate = useNavigate();

    
  const redirect = () => {
    navigate('/crypto-games');
  }
    return (
        <section className="how-it-works">
            <div className="overlay pt-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-header text-center">
                                <h5 className="sub-title">{t("getToKnow")}</h5>
                                <h2 className="title">{t("howPredict888Works")}</h2>
                                <p>{t("ourPlatformHasBeenDesigned")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className="row justify-content-between align-items-center">
                            <div className="col-lg-5">
                                <ul className="nav" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <h5 className="nav-link active" id="sport-tab" data-bs-toggle="tab"
                                            data-bs-target="#sport" role="tab" aria-controls="sport" aria-selected="true">
                                            <span className="image-area">
                                                <img src="assets/images/icon/how-works-icon-1.png" alt="icon" />
                                            </span>
                                            {t("chooseCryptoAsset")}
                                        </h5>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <h5 className="nav-link" id="match-tab" data-bs-toggle="tab" data-bs-target="#match"
                                            role="tab" aria-controls="match" aria-selected="false">
                                            <span className="image-area">
                                                <img src="assets/images/icon/how-works-icon-2.png" alt="icon" />
                                            </span>
                                            {t("choosePredictionSide")}
                                        </h5>
                                    </li>

                                    <li className="nav-item" role="presentation">
                                        <h5 className="nav-link" id="amount-tab" data-bs-toggle="tab" data-bs-target="#amount"
                                            role="tab" aria-controls="amount" aria-selected="false">
                                            <span className="image-area">
                                                <img src="assets/images/icon/how-works-icon-3.png" alt="icon" />
                                            </span>
                                            {t("makeBid")}
                                        </h5>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-lg-6">
                                <div className="tab-content">
                                    <div className="tab-pane fade show active" id="sport" role="tabpanel"
                                        aria-labelledby="sport-tab">
                                        <h4>{t("selectSport")}</h4>
                                        <div className="img-area game-screen" onClick={redirect}>
                                            <img src="assets/images/process-img-1.webp" alt="image" />
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="match" role="tabpanel" aria-labelledby="match-tab">
                                        <h4>{t("selectMatch")}</h4>
                                        <div className="img-area">
                                            <img src="assets/images/process-img-2.png" alt="image" />
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="amount" role="tabpanel" aria-labelledby="amount-tab">
                                        <h4>{t("selectAmount")} </h4>
                                        <div className="img-area">
                                            <img src="assets/images/process-img-5.png" alt="image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks