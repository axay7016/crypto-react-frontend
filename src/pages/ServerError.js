import React from 'react'
const ServerError = () => {
    return (
        <section className="error-section pt-120 pb-120">
            <div className="overlay pt-120 pb-120">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-6">
                            <div classNameName="img-area">
                                <img src="/assets/images/error-illus.png" alt="imageof" />
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="section-text">
                                <h1>Server Error</h1>
                                <p>please contact to developer :(</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServerError