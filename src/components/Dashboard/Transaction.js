import React, { useEffect, useRef, useState } from 'react'
import { useLazyGetTransactionQuery } from '../../servicesRtkQuery/dashboardApi'
import { filterTableData } from '../../utils/filterTableData'
import Error from '../reusable/reusableComponent/Error'
import Loader from '../reusable/reusableComponent/Loader'

import PaginatedItems from '../reusable/reusableComponent/PaginatedItems'

import FromDatePicker from './FromDatePicker'

const _ = require('lodash');

const Transaction = () => {

    const [startDateTime, setStartDateTime] = useState(null);
    const from_date = useRef(null);
    const typeRef = useRef(null);
    const [filterColumns, setFilterColumns] = useState({
        type: '',
        from_date: '',
    })
    const [trigger, result] = useLazyGetTransactionQuery()
    const { isSuccess, isLoading, isFetching, isError, error } = result

    let transactions = []
    if (isSuccess) {
        transactions = result.data.results.response
    }

    if (isError) {
    }

    const handleFilter = (e) => {
        let fDate = ""
        let typeOfTr = ""
        if (from_date.current.value.length > 0) {
            fDate = from_date.current.value
        }
        if (typeRef.current.value.length > 0) {
            typeOfTr = typeRef.current.value;
        }
        setFilterColumns({
            type: typeOfTr,
            from_date: fDate,
        })
    }
    useEffect(() => {
        let fDate = ""
        let typeOfTr = ""
        if (from_date.current.value.length === 9) {
            fDate = from_date.current.value.substring(0, 8) + "0" + from_date.current.value.substring(8, from_date.current.value.length);
        } else {
            fDate = from_date.current.value
        }
        if (typeRef.current.value.length > 0) {
            typeOfTr = typeRef.current.value;
        }
        setFilterColumns({
            type: typeOfTr,
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
                    <strong className='text-white text-date'>From Date : </strong>&nbsp;
                </div>
                <FromDatePicker
                    handleFilter={handleFilter}
                    setStartDateTime={setStartDateTime}
                    startDateTime={startDateTime}
                    from_date={from_date}
                />
                <div className="single-input ms-2">
                    <select ref={typeRef} className="my-bets-coin-select" onChange={handleFilter} >
                        <option value={''}>Select type</option>
                        <option value={'Deposit'}>Deposit</option>
                        <option value={'Withdraw'}>Withdraw</option>
                        <option value={'Rake'}>Rake</option>
                        <option value={'Bonus'}>Bonus</option>
                    </select>
                </div>
            </div>
            {
                (isLoading || isFetching) ? <span className='mt-2'><Loader /></span>
                    : isError ? <Error errorMessage={`${error?.data?.message?.auth}`} />
                        : isSuccess &&
                        <div className="table-responsive tabel-mobile-respnsive dashboard-table">
                            <table className="table ">
                                <thead>
                                    <tr>
                                        <th scope="col" className="date">Date</th>
                                        <th scope="col" className="pay-id">Pay ID</th>
                                        <th scope="col" className="description">Description</th>
                                        <th scope="col" className="type">Type</th>
                                        <th scope="col" className="amount">Amount</th>

                                    </tr>
                                </thead>
                                <tbody className=' overflow-auto'>
                                    {
                                        transactions?.data?.length > 0 ?
                                            transactions?.data.map((transaction, index) => {
                                                return (
                                                    <tr key={index} >
                                                        <td className="date-2">{transaction.created_at}</td>
                                                        <td className="pay-id-2">{transaction.pay_id}</td>
                                                        <td className="description-2">{transaction.description}</td>
                                                        <td className="type-2">{transaction.type}</td>
                                                        <td className="amount-2">
                                                            {transaction.amount} &nbsp;
                                                            <img src={`assets/images/${transaction.icon}`} alt="imageof" width={24} height={24} />
                                                        </td>
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
                transactions?.data?.length > 0 &&
                <PaginatedItems
                    total={transactions.total}
                    items={transactions.data}
                    itemsPerPage={30}
                    handlePageClick={handlePageClick}

                />
            }

        </div>
    )
}

export default Transaction