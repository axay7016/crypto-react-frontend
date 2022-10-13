import React, { useState, useEffect } from "react";
import { data } from "../../utils/bidData";

const TableStatic = () => {
  const [bidRandomData, setbidRandomData] = useState([]);
  const [dataBackColor, setdataBackColor] = useState();
  const a = data;

  useEffect(() => {
    const interval = setInterval(() => {
      a.unshift(a.pop());
      setbidRandomData([...a]);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setdataBackColor(!dataBackColor);
  }, [bidRandomData]);

  return (
    <>
      <div className="table-responsive table-static ">
        <table className="table text-white">
          <thead>
            <tr>
              <th scope="col" className="t-1">
                Game
              </th>
              <th scope="col" className="t-2">
                User
              </th>
              <th scope="col" className="t-3">
                Time
              </th>
              <th scope="col" className="t-4">
                Bet Amount
              </th>
              <th scope="col" className="t-5">
                Returns
              </th>
              <th scope="col" className="t-6">
                Payout
              </th>
            </tr>
          </thead>
          <tbody>
            {bidRandomData?.slice(0, 10)?.map((item, index) => {
              return (
                // randomDataEven
                <tr
                  className={
                    dataBackColor ? "randomDataOdd t-7" : "randomDataEven t-7"
                  }
                  key={index}
                >
                  <td className="t-8">{item.game}</td>
                  <td className="t-9">{item.user}</td>
                  <td className="t-10">{item.time}</td>
                  <td className="t-11">
                    {item.bet_amount === 0 ? (
                      <span className="betAmount bet-zero">{` ${item.bet_amount}`}</span>
                    ) : (
                      <span className="betAmount">{` ${item.bet_amount}`}</span>
                    )}

                    <img
                      src={
                        item.coin === "BTC"
                          ? "assets/images/bitcoin_icon.png"
                          : item.coin === "ETH"
                          ? "assets/images/ethereum_icon.png"
                          : item.coin === "MATIC"
                          ? "assets/images/matic_icon.png"
                          : item.coin === "DOGE"
                          ? "assets/images/dogecoin.png"
                          : item.coin === "USDC"
                          ? "assets/images/usdc.png"
                          : item.coin === "USDT"
                          ? "assets/images/usdt.png"
                          : ""
                      }
                      style={{ width: "25px" }}
                      alt="icon"
                    />
                  </td>
                  <td className="t-12">{item.returns}x</td>
                  <td className="t-13">
                    {item.payout === 0 ? (
                      <span className="betRandomAmount payout-zero">
                        {" "}
                        {` ${item.payout}`}
                      </span>
                    ) : (
                      <span className="betRandomAmount">
                        {" "}
                        {` +${item.payout}`}
                      </span>
                    )}

                    <img
                      src={
                        item.coin === "BTC"
                          ? "assets/images/bitcoin_icon.png"
                          : item.coin === "ETH"
                          ? "assets/images/ethereum_icon.png"
                          : item.coin === "MATIC"
                          ? "assets/images/matic_icon.png"
                          : item.coin === "DOGE"
                          ? "assets/images/dogecoin.png"
                          : item.coin === "USDC"
                          ? "assets/images/usdc.png"
                          : item.coin === "USDT"
                          ? "assets/images/usdt.png"
                          : ""
                      }
                      style={{ width: "25px" }}
                      alt="icon"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableStatic;
