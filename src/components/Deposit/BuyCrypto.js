import React, { useEffect, useRef, useState } from "react";
import Loader from "../reusable/reusableComponent/Loader";
import { useDepositeOnMetMoneyMutation,useGarbaseOnMetMoneyMutation } from "../../servicesRtkQuery/dashboardApi";
import { getUserDetailFromLocalSorage } from "../../utils/localStorage";
import onMetaWidget from "./Onmeta";
import Error from '../reusable/reusableComponent/Error';
import { useDispatch, useSelector } from 'react-redux';
import { setErrorMessage, setSuccessMessage } from '../../redux/globalSlice';
const BuyCrypto = () => {

  const dispatch = useDispatch()
  const { email } = getUserDetailFromLocalSorage();
  const errorMessages = useSelector((state) => state.globalReducer.errorMessages)
  const successMessages = useSelector((state) => state.globalReducer.successMessages)


  useEffect(() => {
    dispatch(setErrorMessage(''))
        dispatch(setSuccessMessage(''))
return ()=>{
  let createWidget = new onMetaWidget({
    elementId: "widget",
    apiKey: "73d7057e-b970-4188-9081-f942e36bfcd1",
    userEmail: email,
    walletAddress: "0x925b5e3f5226e11dfabf9e321b53ea81ad0bd512",
  });
  createWidget.init();
  // createWidget.on("ORDER_COMPLETED_EVENTS", (data) => Depositamount(data));
  createWidget.on("ORDER_EVENTS", (data) => GarbaseData(data));
}
    // createWidget.on("ORDER_EVENTS", (data) => Depositamount(data));
    // 0x925b5e3f5226e11dfabf9e321b53ea81ad0bd512

    // ALL_EVENTS : this will listen to all the events of the widget and notify the callback function once event is triggered.
    // SUCCESS: this will listen to the success event of the widget.
    // FAILED: this will listen to the failed event of the widget.
    // ORDER_EVENTS: this will listen to the order related events.
    // ORDER_COMPLETED_EVENTS: this will listen to order completed events.
    // ACTION_EVENTS: this will listen to action events.

    // API KEY

    // 73d7057e-b970-4188-9081-f942e36bfcd1

    // 748893d6-443a-4b52-958a-a6520ffc7f53

    // API SECRET

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6IjYzNDU1MDYzM2ViMjg0ODEyZGU4MWQ2YyIsImFwaUtleSI6Ijc0ODg5M2Q2LTQ0M2EtNGI1Mi05NThhLWE2NTIwZmZjN2Y1MyIsInVzZXJJZCI6IiIsImV4cCI6MTY5NzAyMjk0NywiaWF0IjoxNjY1NDg2OTQ3fQ.Xd3sRSu4aMyCbxk-KfrKsedNzyTR-t5L_iHvgqxiEf0
  },[]);

  const [depositeOnMetMoney, { data, isSuccess, isError, isLoading, error }] = useDepositeOnMetMoneyMutation();
  const [garbaseOnMetMoney, { data:garbaseData, isSuccess:garbaseSuccess, isError:garbaseIsError, isLoading:garbaseLoading, error:garbaseError }] = useGarbaseOnMetMoneyMutation();

  // const Depositamount = (depositData) => {
  //   console.log(depositData,'*-*-*-**-*-*-*-')

  //   if (
  //     depositData.cryptoSwap == "success" &&
  //     depositData.paymentStatus == "success"
  //   ) {
  //     let onMetaData = {
  //       orderId: depositData?.orderId,
  //       cryptoSwap: depositData?.cryptoSwap,
  //       paymentStatus: depositData?.paymentStatus,
  //       email: depositData?.order?.customer?.email,
  //       eventCategory: depositData?.eventCategory,
  //       eventType: depositData?.eventType,
  //       buyTokenAddress: depositData?.order?.buyTokenAddress,
  //       buyTokenSymbol: depositData?.order?.buyTokenSymbol,
  //       chainId: depositData?.order?.chainId,
  //       createdAt: depositData?.order?.createdAt,
  //       currency: depositData?.order?.currency,
  //       fiat: depositData?.order?.fiat,
  //       receiverWalletAddress: depositData?.order?.receiverWalletAddress,
  //       utr: depositData?.order?.utr,
  //       paymentType: depositData?.paymentType,
  //       crypto_amount: depositData?.paymentType,
  //     };
  //     depositeOnMetMoney(onMetaData);
  //   }
  // };

  const GarbaseData = (paymentGarbaseData) => {
    dispatch(setErrorMessage(''))
    let onMetaData = {
      orderId: paymentGarbaseData?.orderId,
      cryptoSwap: paymentGarbaseData?.cryptoSwap,
      paymentStatus: paymentGarbaseData?.paymentStatus,
      email: paymentGarbaseData?.order?.customer?.email,
      eventCategory: paymentGarbaseData?.eventCategory,
      eventType: paymentGarbaseData?.eventType,
      buyTokenAddress: paymentGarbaseData?.order?.buyTokenAddress,
      buyTokenSymbol: paymentGarbaseData?.order?.buyTokenSymbol,
      chainId: paymentGarbaseData?.order?.chainId,
      createdAt: paymentGarbaseData?.order?.createdAt,
      currency: paymentGarbaseData?.order?.currency,
      fiat: paymentGarbaseData?.order?.fiat,
      receiverWalletAddress: paymentGarbaseData?.order?.receiverWalletAddress,
      utr: paymentGarbaseData?.order?.utr,
      paymentType: paymentGarbaseData?.paymentType,
    };
    garbaseOnMetMoney(onMetaData);
  }
  useEffect(() => {
    if (isSuccess && !isLoading) {
      console.log('true');
    }
    if (isError && !isLoading) {
     console.log('false');
    }
  }, [isSuccess, isError, isLoading]);

  useEffect(() => {
    if (garbaseSuccess && !garbaseLoading) {
      console.log('true');
    }
    if (garbaseIsError && !garbaseLoading) {
     console.log(garbaseError?.data?.message);
     dispatch(setErrorMessage(garbaseError?.data?.message))
  //    setTimeout(() => {
  //     dispatch(setErrorMessage(''))
  // }, 3000)
    }
  }, [garbaseSuccess, garbaseIsError, garbaseLoading]);
  

  return (
    <>
    {console.log(errorMessages,'-*-*--------')}
     {
                                            errorMessages.length > 0  ?
                                                <Error errorMessage={errorMessages} /> : null
                                        }
      <div id="widget"></div>
    </>
  );
};

export default BuyCrypto;
