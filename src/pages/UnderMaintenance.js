import React from 'react'

const UnderMaintenance = () => {


    return (

        <section className="error-section ">
            <div className="overlay  ">
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <h4 className='text-white mt-5'>Sorry, we are down for maintenance right now. We will be back soon.</h4>
                        <div classNameName="img-area">
                            <img src="/assets/images/maintenance.jpg" alt="imageaa" width="100%" />
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default UnderMaintenance