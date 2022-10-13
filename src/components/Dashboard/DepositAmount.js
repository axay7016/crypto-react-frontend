import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setErrorMessage } from "../../redux/globalSlice";
import { setDepositFields } from "../../redux/loginSignupSlice";
import Loader from "../reusable/reusableComponent/Loader";
import { useDepositeMoneyMutation } from "../../servicesRtkQuery/dashboardApi";

const DepositAmount = () => {
  //redux state
  const dispatch = useDispatch();
  const successMessages = useSelector(
    (state) => state.globalReducer.successMessages
  );
  const errorMessages = useSelector(
    (state) => state.globalReducer.errorMessages
  );
  let { order_currency, order_amount, coin, type } = useSelector(
    (state) => state.loginSignupReducer.depositFields
  );
  const [Url, setUrl] = useState("");
  const [PaymentForm, setPaymentForm] = useState(false);
  const [Network, setNetwork] = useState(false);
  const typeRef = useRef();
  const coinRef = useRef();

  // handle functions
  function handleChange(event) {
    const value = event.target.value;
    if(coinRef.current.value == 'USDT' || coinRef.current.value == 'USDC'){
      if(!Network){
        setNetwork(true)
      }
    }else{
      if(Network){
        setNetwork(false)
      }
    }

    dispatch(
      setDepositFields({
        ...{
          order_currency,
          order_amount,
          coin,
          type,
        },
        [event.target.name]: value,
      })
    );
  }

  
  function handleOnFocus() {
    dispatch(setErrorMessage({}));
  }
  const [depositeMoney, { data, isSuccess, isError, isLoading, error }] =
    useDepositeMoneyMutation();

  const handleSubmitBtn = (e) => {
    e.preventDefault();
    let typedata = typeRef.current?.value == undefined ? 'ERC20' : typeRef.current.value;
    let data = { order_currency, order_amount:Number(order_amount), coin, type: typedata};
    depositeMoney(data);
  };
  useEffect(() => {
    if (isSuccess && !isLoading) {
      setPaymentForm(true);
      setUrl(data.results.hosted_url);
    }
    if (isError && !isLoading) {
      // amountRef.current.value = ''
      // setShowError(true)
    }
  }, [isSuccess, isError, isLoading]);

  const Back = () => {
    setPaymentForm(false);
    
  };

  useEffect(() => {
    if(coinRef?.current?.value == 'USDT' || coinRef?.current?.value == 'USDC'){
      if(!Network){
        setNetwork(true)
      }
    }else{
      if(Network){
        setNetwork(false)
      }
    }
    let data = { order_currency, order_amount, coin, type };
    console.log(data,'*-*----');
    // console.log(typeRef?.current?.value,coinRef?.current?.value,'------------------------------------------------------')
  }, [!PaymentForm]);

  return (
    <>
      <div className="deposit-with-tab withdraw">
        <div className="row">
          <div className="col-xxl-8 col-xl-7">
            <div className="right-area">
              <p className="para-area">Deposit your amount</p>

              <div className="address-bar">
                {PaymentForm ? (
                  <>
                    <button className="cmn-btn" onClick={Back}>
                      <i className="fa fa-arrow-left" aria-hidden="true"></i>
                    </button>
                    <iframe src={Url} width="540" height="650"></iframe>{" "}
                  </>
                ) : (
                  <form action="#">
                    <div className="col-6">
                      <div className="input-single">
                        <label>Coin</label>
                        <div className="input-area ">
                          <select
                            className="withdraw-select"
                            onChange={handleChange}
                            name="coin"
                            ref={coinRef}
                            value={coin}
                          >
                            <option value="BTC">BTC</option>
                            <option value="ETH">ETH</option>
                            <option value="USDC">USDC</option>
                            <option value="USDT">USDT</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {Network ? <div className="col-6">
                      <div className="input-single">
                        <label>Network Type</label>
                        <div className="input-area ">
                          <select
                            className="withdraw-select"
                            onChange={handleChange}
                            onFocus={handleOnFocus}
                            ref={typeRef}
                            name="type"
                            value={type}
                          >
                            <option value="ERC20">ERC20</option>
                            <option value="TRC20">TRC20</option>
                          </select>
                          <input
                            type="hidden"
                            value="USD"
                            name="order_currency"
                          />
                        </div>
                      </div>
                    </div> : ''}
                    
                    <div className="col-6">
                      <div className="input-single">
                        <label>Amount In USD</label>
                        <div className="input-area">
                          <input
                            type="number"
                            placeholder="Enter Amount"
                            value={order_amount}
                            labelName="Deposit Amount"
                            onChange={handleChange}
                            onFocus={handleOnFocus}
                            name="order_amount"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="btn-border">
                      {isLoading ? (
                        <Loader />
                      ) : (
                        <button
                          className="cmn-btn"
                          disabled={order_amount < 1}
                          onClick={(e) => handleSubmitBtn(e)}
                        >
                          Deposit Now
                        </button>
                      )}
                    </span>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepositAmount;
