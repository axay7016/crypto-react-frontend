import React from 'react'
import { useTranslation } from 'react-i18next';

const Faq = () => {
    const { t } = useTranslation(["common"]);

    return (
        <section className="faqs-section pt-120">
            <div className="overlay ">
                <div className="container">
                    <div className="row d-flex justify-content-center">
                        <div className="col-lg-7">
                            <div className="section-header text-center">
                                <h5 className="sub-title">{t("faq")}</h5>
                                <h2 className="title">{t("weHaveAnswer")}</h2>
                                <p>{t("faqCommon")}</p>
                            </div>
                        </div>
                    </div>
                    <div className="row faq-bg d-flex justify-content-center">
                        <div className="col-xl-10">
                            <div className="faq-box mt-60 mb-60">
                                <div className="accordion" id="accordionFaqs">
                                    <div className="accordion-item">
                                        <h5 className="accordion-header" id="headingOne">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseOne"
                                                aria-expanded="false" aria-controls="collapseOne">
                                                {t("faq1")}
                                            </button>
                                        </h5>
                                        <div id="collapseOne" className="accordion-collapse collapse"
                                            aria-labelledby="headingOne" data-bs-parent="#accordionFaqs">
                                            <div className="accordion-body">
                                                <p>{t("web3SkillBased")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h5 className="accordion-header" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                                {t("faq2")}
                                            </button>
                                        </h5>
                                        <div id="collapseTwo" className="accordion-collapse collapse"
                                            aria-labelledby="headingTwo" data-bs-parent="#accordionFaqs">
                                            <div className="accordion-body">
                                                <p>{t("faqa2")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h5 className="accordion-header" id="headingThree">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">
                                                {t("faq3")}
                                            </button>
                                        </h5>
                                        <div id="collapseThree" className="accordion-collapse collapse"
                                            aria-labelledby="headingThree" data-bs-parent="#accordionFaqs">
                                            <div className="accordion-body">
                                                <p>{t("faqa3")}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item">
                                        <h5 className="accordion-header" id="headingFour">
                                            <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                                aria-expanded="false" aria-controls="collapseFour">
                                                {t("faq4")}
                                            </button>
                                        </h5>
                                        <div id="collapseFour" className="accordion-collapse collapse"
                                            aria-labelledby="headingFour" data-bs-parent="#accordionFaqs">
                                            <div className="accordion-body">
                                                <p>{t("faqa4")}</p>
                                            </div>
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

export default Faq