import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage, setSuccessMessage } from '../../redux/globalSlice';
import { useCreateBidMutation } from '../../servicesRtkQuery/gamesApi';
import Error from '../reusable/reusableComponent/Error';
import Loader from '../reusable/reusableComponent/Loader';
import Success from '../reusable/reusableComponent/Success';

const BettingModal = () => {
    const dispatch = useDispatch()
    const { game_id, game_unique_id, game_name, game_odd, high_mid_low, game_coin_id } = useSelector((state) => state.gameReducer.gameData)
    const { coin_id: user_coin_id } = useSelector((state) => state.gameReducer.balanceCoinData)
    const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
    const successMessages = useSelector((state) => state.globalReducer.successMessages)

    // console.log(user_coin_id, "user_coin_id betting modal")
    const isDefaultCurrencySet = useSelector((state) => state.gameReducer.isDefaultCurrencySet)


    const currencies = ['USD']
    const [marketPrice, setMarketPrice] = useState(false)
    const [Sound, setSound] = useState(false)
    const [values, setValues] = useState({
        odd: game_odd,
        stake: 0,
        currency: currencies[0]
    });

    useEffect(() => {
        setValues({
            ...values,
            odd: game_odd,
            stake: "",

        })
        dispatch(setErrorMessage(''))
        dispatch(setSuccessMessage(''))
        setMarketPrice(false)
    }, [game_odd])

    const handleChange = (e) => {
        dispatch(setSuccessMessage(''))
        dispatch(setErrorMessage(''))
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'currency') {
            setValues({
                ...values,
                currency: value,
            })
            return
        }
        if (name == 'odd') {
            setValues({
                ...values,
                odd: value,
            })
            return
        }
        let stakeValue = 0;
        if (name === 'stake') {
            stakeValue = +value

            if (stakeValue == 0) {
                stakeValue = ''
            } else {
            }
            setValues({ ...values, stake: stakeValue })
        }

    }

    const [createBid, { isSuccess, isError, isLoading, error }] = useCreateBidMutation()

    const handleSubmit = async () => {
        const data = {
            coin_id: game_coin_id,
            user_coin_id: user_coin_id,
            game_id: game_id,
            high_mid_low: high_mid_low,
            stake: +values.stake,
            odd: +values.odd,
            fiat_amount: +values.stake,
            fiat_currency: values.currency,
            market_price: marketPrice ? "1" : "0"
        }
       await createBid(data)
    }
    useEffect(() => {
        if (isSuccess && !isLoading) {
            setSound(true);
            setValues({
                ...values,
                stake: 0,
            })
            dispatch(setSuccessMessage('Bet successfully created, redirecting to game page'))
            setMarketPrice(false)
            setTimeout(() => {
                document.getElementById("btn-close").click();
            setSound(false);

            }, 2000)

        }
        if (isError && !isLoading) {
            dispatch(setErrorMessage(error?.data?.message))
        }
    }, [isSuccess, isError, isLoading])

    return (
        <div className="betpopmodal" >
             {/* <bgsound src = "/assets/music/coin.mp3"/> */}
             {
                // Sound ? <embed  src="/assets/music/coin.mp3" loop="true" autostart/> : ''
                Sound ? <audio src="/assets/music/coin.wav" autoPlay/> : ''
                
             }
             {/* <embed name="GoodEnough" src="/assets/music/coin.mp3" loop="false" hidden="true" autostart="true"></embed> */}
            <div className="modal fade" id="betpop-up" tabIndex="-1" aria-hidden="true" backdrop="static">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xxl-8 col-xl-9 col-lg-11">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <button type="button" className="btn-close" id='btn-close'
                                            data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => {
                                                setValues({
                                                    ...values,
                                                    odd: game_odd,
                                                    stake: "",

                                                })
                                                dispatch(setErrorMessage(''))
                                                dispatch(setSuccessMessage(''))
                                            }}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        {
                                            errorMessages.length > 0 && values.stake > 0 ?
                                                <Error errorMessage={errorMessages} /> : null
                                        }
                                        {
                                            successMessages.length > 0 ?
                                                <Success successMessage={successMessages} /> : null
                                        }
                                        <div className="mt-2   d-flex justify-content-between ">
                                            <div >
                                                {/* this coin_id actually game name */}

                                                <h6>{game_name} {`(${game_unique_id}) `}
                                                    <span>
                                                        {high_mid_low === 'high' ? 'Above' : high_mid_low === 'mid' ? 'Mid' : 'Below'}
                                                    </span>
                                                </h6>
                                            </div>
                                            <div className='me-3 mb-3 market-price-check' >
                                                <input type="checkbox"
                                                    name='marketPrice'
                                                    onChange={
                                                        (e) => {
                                                            dispatch(setErrorMessage(''))
                                                            setMarketPrice(e.target.checked)
                                                        }

                                                    }
                                                    checked={marketPrice ? 'checked' : ''}
                                                />
                                                <label className='market-price'> Market price</label>
                                                <select className='user-currency' onChange={handleChange} name='currency' value={values.currency}>
                                                    {currencies.map((currency, index) => {
                                                        return (
                                                            <option key={index} >{currency}</option>
                                                        )
                                                    }
                                                    )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className=" d-flex justify-content-start ">
                                            {

                                                <div className='w-50'>
                                                    <h6>Enter Odd</h6>
                                                    <input type="number"
                                                        className='w-75'
                                                        onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                                        value={values.odd}
                                                        name='odd'
                                                        disabled={marketPrice ? true : false}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            }
                                            <div className='w-50 me-5' >
                                                <h6>Enter Stake {`in ${values.currency}`}</h6>
                                                <input type="number"
                                                    onKeyDown={(evt) => evt.key === 'e' && evt.preventDefault()}
                                                    onChange={handleChange}
                                                    value={values.stake}
                                                    name='stake' />
                                                <div>
                                                </div>
                                            </div>
                                            <div className='w-50'>
                                                <h6>Payout</h6>
                                                <input type="number"
                                                    value={(+values.stake) * +values.odd}
                                                    disabled={true}
                                                    name='payout' />
                                            </div>
                                        </div>
                                        <div className="bottom-area d-flex justify-content-center">

                                            <div className="btn-area ">
                                                <button
                                                    className='btn p-3'
                                                    onClick={handleSubmit}
                                                    disabled={
                                                        values.stake <= 0 ||
                                                        values.odd <= 0 ||
                                                        (typeof errorMessages == 'string' && errorMessages?.includes("Bidding")) ||
                                                        (typeof errorMessages == 'string' && errorMessages?.includes("maximum", 6)) ||
                                                        (typeof errorMessages == 'string' && errorMessages?.includes("unmatch", 8) && (!marketPrice)) ||
                                                        isDefaultCurrencySet

                                                    }
                                                >{isLoading ? <Loader /> : `Make Bet`}</button>
                                            </div>
                                            {
                                                isDefaultCurrencySet &&
                                                <div className="btn-area ">
                                                    <button
                                                        className='btn p-3 ms-2'

                                                    >{true && <Loader />}&nbsp; your wallet coin is setting</button>
                                                </div>
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
export default BettingModal

