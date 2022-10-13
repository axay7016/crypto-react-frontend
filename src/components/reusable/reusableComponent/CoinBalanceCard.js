import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setTab } from '../../../redux/dashboardSlice'

const CoinBalanceCard = () => {
    const allCoins = useSelector((state) => state.gameReducer.allCoins)
    const dispatch = useDispatch();

    return (
        <div className="balance">
            <div className="single-item single-item-games-balance">
                <img src="/assets/images/icon/dashboard-sidebar-icon-1.png" alt="images" />
                {
                    allCoins?.map((coin) => {
                        return (
                            <div key={coin.coin_id}>
                                <h6 className='h5-games-balance'>
                                    <img src={`/assets/images/${coin.icon}`} alt="imageof" width={32} height={32} /> &nbsp;
                                    {coin.name} : {coin.balance}
                                </h6>
                            </div>
                        )
                    })
                }
                <p>Available Balance</p>
            </div>
            <div className="bottom-area d-flex align-items-center justify-content-between bottom-area-games-balance">
                <Link to="/dashboardContainer" className="mdr withdraw-btn text-white"
                    onClick={() => {
                        dispatch(setTab('showWithdrawTab'))
                    }}
                >Withdraw</Link>
                <Link to="/dashboardContainer" className="mdr deposit-btn text-white"
                    onClick={() => {
                        dispatch(setTab('showDepositeTab'))
                    }}
                >Deposit</Link>
            </div>
        </div>
    )
}

export default CoinBalanceCard