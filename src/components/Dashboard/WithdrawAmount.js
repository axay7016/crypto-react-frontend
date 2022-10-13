import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useWithdrawMoneyMutation } from '../../servicesRtkQuery/dashboardApi'
import { getUserDetailFromLocalSorage } from '../../utils/localStorage'
import Loader from '../reusable/reusableComponent/Loader'

const WithdrawAmount = () => {
    const coins = useSelector((state) => state.gameReducer.allCoins)
    const { id } = getUserDetailFromLocalSorage()
    const amountRef = useRef()

    const coinRef = useRef()
    const [showError, setShowError] = useState(false)
    const [showAmountError, setShowAmountError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [withdrawMoney, { isSuccess, isError, isLoading, error }] = useWithdrawMoneyMutation()
    const handleWithdraw = (event) => {
        event.preventDefault()
        if ((amountRef.current.value <= 0)) {
            setShowAmountError(true)
            return
        }
        if ((amountRef.current.value > 0) && coinRef.current.value) {
            withdrawMoney({
                "user_id": id,
                "coin_id": coinRef.current.value,
                "amount": amountRef.current.value
            })
        }
    }
    useEffect(() => {
        if (isSuccess && !isLoading) {
            amountRef.current.value = ''
            setShowSuccess(true)
        }
        if (isError && !isLoading) {
            amountRef.current.value = ''
            setShowError(true)
        }
    }, [isSuccess, isError, isLoading])

    return (

        <div className="deposit-with-tab withdraw">
            <div className="row">
                <div className="col-xxl-8 col-xl-7">
                    <div className="right-area">
                        <p className="para-area">
                            Your request will be submitted to the admin of the site for approval
                        </p>
                        <div className="address-bar">
                            <form action="#">
                                {
                                    showSuccess ?
                                        <div className="alert alert-success" role="alert">
                                            You have successfully requested withdrawal. One of our team members will process it.
                                        </div> : showError &&
                                        <div className="alert alert-danger" role="alert">
                                            {error.data.message}
                                        </div>
                                }

                                <div className="col-6">
                                    <div className="input-single">
                                        <label>Amount</label>
                                        <div className="input-area">
                                            <input type="number" placeholder="Enter Amount" ref={amountRef}
                                                onFocus={() => {
                                                    setShowError(false)
                                                    setShowAmountError(false)
                                                    setShowSuccess(false)
                                                }} />
                                        </div>
                                        {
                                            showAmountError && <div className="alert alert-danger mt-2" role="alert">
                                                {'Please enter amount'}
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-single">
                                        <label>Coin</label>
                                        <div className="input-area ">
                                            <select className='withdraw-select' ref={coinRef}>
                                                {
                                                    coins.map((coin) => {
                                                        return (coin.coin_id != 15) && <option value={coin.coin_id}>{coin.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <span className="btn-border">
                                    {
                                        isLoading ? <Loader /> :
                                            <button className="cmn-btn" onClick={handleWithdraw} >
                                                Withdraw Now
                                            </button>
                                    }
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WithdrawAmount