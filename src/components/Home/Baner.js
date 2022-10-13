import React from 'react'
import { useTranslation } from 'react-i18next';

const Baner = () => {
    const { t } = useTranslation(["common"]);

    return (
        <section className="banner-section home">

            <div className="overlay">

                <div className="shape-area">
                    <img src="assets/images/coin-2.png" className="obj-1" alt="image" />
                    <img src="assets/images/winner-cup.webp" className="obj-2" alt="image" />
                </div>
                <div className="banner-content">
                    <div className="container">
                        <div className="content-shape">
                            <img src="assets/images/coin-1.png" className="obj-1" alt="image" />
                            <img src="assets/images/coin-3.png" className="obj-2" alt="image" />
                            <img src="assets/images/coin-3.png" className="obj-3" alt="image" />
                            <img src="assets/images/coin-4.png" className="obj-4" alt="image" />
                        </div>
                        <div className="row">
                            <div className="col-lg-6 col-md-10">
                                <div className="main-content">
                                    <div className="top-area section-text">
                                        <h4 className="sub-title">{t("predictAndWin")}</h4>
                                        <h1 className="title">{t("makePredictionOnBitcoin")}</h1>
                                        <p className="xlr">{t("web3SkillBased")}</p>
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

export default Baner