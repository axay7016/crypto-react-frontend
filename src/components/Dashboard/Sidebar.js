import React from 'react'
import { getUserDetailFromLocalSorage } from '../../utils/localStorage'
import CoinBalanceCard from '../reusable/reusableComponent/CoinBalanceCard'

const Sidebar = () => {
    const { name, unique_id } = getUserDetailFromLocalSorage()

    return (
        <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="dashboard-sidebar mobile-sidebar">
                <div className="single-item">
                    <img src="/assets/images/profile-img-1.png" alt="images" />
                    <h5 className=''>{name}</h5>
                    <p>ID : {unique_id}</p>
                </div>
                <CoinBalanceCard />
                <div className="single-item">
                    <img src="/assets/images/icon/dashboard-sidebar-icon-2.png" alt="images" />
                    <h5>Need Help?</h5>
                    <p className="mdr">Have questions? Our experts are here to help!.</p>
                    <span className="btn-border">
                        <a href="/contact" className="cmn-btn">Get Start Now</a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar