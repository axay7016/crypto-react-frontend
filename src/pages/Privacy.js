import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { asyncCall } from '../utils/reusableFuncVar'

const Privacy = () => {

    // code for scrolling to top and loader
    const [loading, setLoading] = useState(true);
    asyncCall().then((result) => {
        window.scrollTo(0, 0);
        setLoading(result)
    })
    if (loading) return <div className="preloader" id="preloader"></div>

    return (
        <>

            <section class="banner-section inner-banner terms ">
                <div class="overlay">
                    <div class="banner-content d-flex align-items-center">
                        <div class="container">
                            <div class="row justify-content-start">
                                <div class="col-lg-7 col-md-10">
                                    <div class="main-content">
                                        <h1>Privacy Policy</h1>
                                        <div class="breadcrumb-area">
                                            <nav aria-label="breadcrumb">
                                                <ol class="breadcrumb d-flex align-items-center">
                                                    <li className="breadcrumb-item"><Link to="/" >Home</Link></li>
                                                    <li class="breadcrumb-item active" aria-current="page">Privacy Policy</li>
                                                </ol>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="privacy-content">
                <div class="overlay pt-120">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-8">
                                <div class="top-wrapper">
                                    <h4>We're always looking for new ways to provide privacy for our customers.</h4>
                                    <p>Id ipsum mi tempor eget. Pretium consectetur scelerisque blandit habitasse non ullamcorper enim, diam quam id et, tempus massa. Sed nam vulputate pellentesque quis. Varius a, nunc faucibus proin elementum id odio auctor.
                                        Nunc, suspendisse consequat libero, pharetra tellus vulputate auctor venenatis tortor non rhoncus at duis. Pharetra ipsum mauris integer sit feugiat.</p>
                                    <ul>
                                        <li>— Blandit dignissim nulla varius tristique a sed integer ut tempor.</li>
                                        <li>— Augue interdum semper bibendum amet sed.</li>
                                        <li>— Dis in at ultricies tortor sit tellus.</li>
                                        <li>— Habitant ornare aenean maecenas pretium</li>
                                    </ul>
                                    <p>Eget purus aenean sit risus. Arcu, aliquam eget et viverra risus purus. Commodo fames tristique dui pharetra elit aliquet morbi. Eget consectetur risus nunc lorem sit consequat aliquet. Dolor velit consectetur etiam scelerisque. Integer interdum sodales scelerisque diam massa quam sit quis. Sed et dui a nam pulvinar. Tristique justo, donec lectus vitae, cursus ligula ridiculus lacus, tincidunt. Diam dictumst faucibus dui aliquet aenean nascetur feugiat leo. Etiam dignissim orci dignissim vitae.</p>
                                    <div class="safe-data">
                                        <h4>Your data is safe with us, we will not share any information with external sources.</h4>
                                        <p>Blandit dignissim nulla varius tristique a sed integer ut tempor. Augue interdum semper bibendum amet sed. Dis in at ultricies tortor sit tellus. Habitant ornare aenean maecenas pretium, dui ullamcorper quis. Egestas viverra et id aliquet faucibus rhoncus a. Sollicitudin nisl nulla tempor pretium lorem at mauris faucibus pulvinar.</p>
                                        <ul>
                                            <li>Eget purus aenean sit risus. Arcu, aliquam eget et viverra risus purus. Commodo fames tristique dui pharetra elit aliquet morbi.</li>
                                            <li>Eget consectetur risus nunc lorem sit consequat aliquet. Dolor velit consectetur etiam scelerisque.</li>
                                            <li>Integer interdum sodales scelerisque diam massa quam sit quis. Sed et dui a nam pulvinar. Tristique justo, donec lectus vitae, cursus ligula ridiculus lacus, tincidunt.</li>
                                            <li>Diam dictumst faucibus dui aliquet aenean nascetur feugiat leo. Etiam dignissim.</li>
                                            <li> Aliquam eget et viverra risus purus. Commodo fames tristique dui pharetra elit aliquet morbi.</li>
                                        </ul>
                                    </div>
                                    <div class="cookies">
                                        <h4>Cookies and tracking</h4>
                                        <p>Consequat mauris nunc congue nisi. Cursus metus aliquam eleifend mi in nulla. Dignissim cras tincidunt lobortis feugiat vivamus. Blandit aliquam etiam erat velit. Sapien faucibus et molestie ac. Ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Privacy