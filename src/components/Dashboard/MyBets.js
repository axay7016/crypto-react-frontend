/* eslint-disable no-lone-blocks */

import React, { useEffect, useRef, useState } from 'react'
import { useLazyGetBidsQuery } from '../../servicesRtkQuery/dashboardApi'
import { filterTableData } from '../../utils/filterTableData'
import Error from '../reusable/reusableComponent/Error'
import Loader from '../reusable/reusableComponent/Loader'
import PaginatedItems from '../reusable/reusableComponent/PaginatedItems'
import FromDatePicker from './FromDatePicker'
const _ = require('lodash');

const MyBets = () => {

    //env variables
    const bidIdPrefix = process.env.REACT_APP_BID_NUMBER_PREFIX
    const [startDateTime, setStartDateTime] = useState(null);

    const from_date = useRef(null);
    const coin = useRef(null);
    const [filterColumns, setFilterColumns] = useState({
        coin_id: '',
        from_date: '',
    })
    const [trigger, result] = useLazyGetBidsQuery()
    const { isSuccess, isLoading, isFetching, isError, error } = result

    let bids = []
    if (isSuccess) {
        bids = result.data.results
    }

    const handleFilter = (e) => {
        let fDate = ""
        let coinid = ""
        if (from_date.current.value.length > 0) {
            fDate = from_date.current.value
        }
        if (coin.current.value.length > 0) {
            coinid = coin.current.value;
        }
        setFilterColumns({
            coin_id: coinid,
            from_date: fDate,
        })
    }
    useEffect(() => {
        let fDate = ""
        let coinid = ""
        if (from_date.current.value.length === 9) {
            fDate = from_date.current.value.substring(0, 8) + "0" + from_date.current.value.substring(8, from_date.current.value.length);
        } else {
            fDate = from_date.current.value
        }
        if (coin.current.value.length > 0) {
            coinid = coin.current.value;
        }
        setFilterColumns({
            coin_id: coinid,
            from_date: fDate,
        })

    }, [startDateTime])


    useEffect(() => {
        (async function () {
            await filterTableData(trigger, filterColumns)
        }());
    }, [filterColumns])

    const handlePageClick = (event) => {
        const pageNumber = event.selected + 1;
        const columnWithValue = _.omitBy(filterColumns, _.isEmpty)
        columnWithValue.page = pageNumber
        trigger(columnWithValue)
    };
    return (
        <div className="tab-pane fade show  active   tab-transition" role="tabpanel" >
            <div className='d-flex justify-content-start align-items-center   tra-tab'>
                <div className>
                    <strong className='text-white   text-date'>From Date : </strong>&nbsp;
                </div>
                <FromDatePicker
                    handleFilter={handleFilter}
                    setStartDateTime={setStartDateTime}
                    startDateTime={startDateTime}
                    from_date={from_date}
                />
                <div className="single-input ms-2">
                    <select ref={coin} className="my-bets-coin-select" onChange={handleFilter} >
                        <option value="">Select game</option>
                        <option value="2">BTC/USDT</option>
                        <option value="5">ETH/USDT</option>
                        <option value="10">BNB/USDT</option>
                        <option value="11">DOGE/USDT</option>
                        <option value="12">MATIC/USDT</option>
                        <option value="16">SOL/USDT</option>
                    </select>
                </div>
            </div>
            {
                (isLoading || isFetching) ? <span className='mt-2'><Loader /></span>
                    : isError ? <Error errorMessage={`${error.data.message.auth}`} />
                        : isSuccess &&
                        <div className="table-responsive tabel-mobile-respnsive dashboard-table">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="date-3">Date</th>
                                        <th scope="col" className="pay-id-game">Game</th>
                                        <th scope="col" className="type-3">Type</th>
                                        <th scope="col" className="amount-odd">Odd</th>
                                        <th scope="col" className="stake">Stake</th>
                                        <th scope="col" className="profit">Profit</th>
                                        <th scope="col" className="description-bet">Bet</th>
                                        <th scope="col" className="description-bet">Game</th>


                                    </tr>
                                </thead>
                                <tbody className='  overflow-auto  my bet'>
                                    {
                                        bids?.data?.length > 0 ?
                                            bids?.data?.map((bid, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="date-4" >{bid.created_at}</td>
                                                        <td className="pay-id-4">{bid.game_name}</td>
                                                        <td className="type-4">{bid.high_mid_low == 'high' ? 'above' : bid.high_mid_low == 'low' ? 'below' : 'mid'}</td>
                                                        <td className="type-5">{bid.odd}</td>
                                                        <td className="amount-5">
                                                            {bid.stake}
                                                            &nbsp;
                                                            <img src={`assets/images/${bid.icon}`} alt="imageof" width={24} height={24}
                                                            />

                                                        </td >
                                                        {
                                                            bid.status == 0
                                                                ?
                                                                <td className="balnk-text">
                                                                    To be declared
                                                                </td>
                                                                :
                                                                <td className={`${bid.status === 1 && 'text-success '}`} >{bid.status === 1 ? `+${bid.payout}` : `-${bid.stake}`}&nbsp;
                                                                    <img src={`assets/images/${bid.icon}`} className="profite-img" alt="imageof" width={24} height={24} />
                                                                </td>

                                                        }
                                                        <td className="description-4">{bid.bid_unique_id}</td>
                                                        <td className="description-4">{bid.game_unique_id}</td>

                                                    </tr>
                                                )
                                            }) :
                                            <strong className='text-white '>No Data Found</strong>
                                    }
                                </tbody>
                            </table>
                        </div>
            }
            {
                bids?.data?.length > 0 &&
                <PaginatedItems
                    total={bids.total}
                    items={bids.data}
                    itemsPerPage={30}
                    handlePageClick={handlePageClick}

                />
            }

        </div>

    )
}

export default MyBets