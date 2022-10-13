import { t } from 'i18next'
import React from 'react'

const NotFound = () => {
  return (

    <section class="error-section pt-120 pb-120">
      <div class="overlay pt-120 pb-120">
        <div class="container">
          <div class="row justify-content-between align-items-center">
            <div class="col-lg-6">
              <div class="img-area">
                <img src="/assets/images/error-illus.png" alt="image" />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="section-text">
                <h2 class="title">{t("pageNotFound")}</h2>
                <p>Oops.. Looks like you got lost :(</p>
              </div>
              {/* <div class="btn-border">
                <a href="index.html" class="cmn-btn">Go Back Home</a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotFound