import React from 'react'
import Timer from '../reusable/reusableComponent/Timer';

const ResultPending = ({ games }) => {
    const coins = games.map(game => game.coin_name);
    const uniqueCoins = [...new Set(coins)];
    return (
        <>
            <div className="single-area" >
                {
                    uniqueCoins.map(coin => {
                        return (
                            <div key={coin}>
                                <div className="head-area d-flex justify-content-around">
                                    <div className=" cmn-btn d-flex">{coin}</div>
                                </div>
                                <div className="d-flex justify-content-start gap-2" >
                                    {
                                        games?.map((game) => {
                                            return ((game.coin_name === coin) && (Math.sign(game.hours) != -1)) &&
                                                (

                                                    <div className="alert alert-primary  mt-2" role="alert" key={game.id}>
                                                        <strong >{game.coin_name} </strong>
                                                        <strong >{game.game_unique_id} </strong>will be ended in
                                                        <strong className='bg-success'>
                                                            <Timer
                                                                hours={game.hours}
                                                                minutes={game.minutes}
                                                                seconds={game.seconds}
                                                            />
                                                        </strong>
                                                    </div>
                                                )


                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default ResultPending

// [
//     {
//         "id": 463,
//         "game_unique_id": "G463",
//         "coin_id": 5,
//         "coin_name": "ETH/USDT",
//         "price_at_time_of_game_start": "1681.24000000",
//         "start_time": "11:26:41",
//         "end_time": "13:26:41",
//         "full_start_time": "2022-08-10 11:26:41",
//         "full_end_time": "2022-08-10 13:26:41",
//         "coin": "ETHUSDT",
//         "icon": "ethereum_icon.png",
//         "high_odd": "2.34",
//         "mid_odd": "1.84",
//         "low_odd": "1.66",
//         "high_range": 1686,
//         "mid_range": "1676-1686",
//         "mid_range_avg": 1684,
//         "low_range": 1676,
//         "duration": 2,
//         "hours": 1,
//         "minutes": 35,
//         "seconds": 15
//     },
//     {
//         "id": 462,
//         "game_unique_id": "G462",
//         "coin_id": 2,
//         "coin_name": "BTC/USDT",
//         "price_at_time_of_game_start": "22906.42000000",
//         "start_time": "11:26:31",
//         "end_time": "13:26:31",
//         "full_start_time": "2022-08-10 11:26:31",
//         "full_end_time": "2022-08-10 13:26:31",
//         "coin": "BTCUSDT",
//         "icon": "bitcoin_icon.png",
//         "high_odd": "2.27",
//         "mid_odd": "1.77",
//         "low_odd": "1.73",
//         "high_range": 22951,
//         "mid_range": "22861-22951",
//         "mid_range_avg": 22936,
//         "low_range": 22861,
//         "duration": 2,
//         "hours": 1,
//         "minutes": 35,
//         "seconds": 5
//     },
//     {
//         "id": 459,
//         "game_unique_id": "G459",
//         "coin_id": 2,
//         "coin_name": "BTC/USDT",
//         "price_at_time_of_game_start": "22917.84000000",
//         "start_time": "10:01:03",
//         "end_time": "16:01:03",
//         "full_start_time": "2022-08-10 10:01:03",
//         "full_end_time": "2022-08-10 16:01:03",
//         "coin": "BTCUSDT",
//         "icon": "bitcoin_icon.png",
//         "high_odd": "2.09",
//         "mid_odd": "1.59",
//         "low_odd": "1.91",
//         "high_range": 23094,
//         "mid_range": "22740-23094",
//         "mid_range_avg": 23035,
//         "low_range": 22740,
//         "duration": 6,
//         "hours": 4,
//         "minutes": 9,
//         "seconds": 37
//     },
//     {
//         "id": 452,
//         "game_unique_id": "G452",
//         "coin_id": 5,
//         "coin_name": "ETH/USDT",
//         "price_at_time_of_game_start": "1687.96000000",
//         "start_time": "07:00:56",
//         "end_time": "13:00:56",
//         "full_start_time": "2022-08-10 07:00:56",
//         "full_end_time": "2022-08-10 13:00:56",
//         "coin": "ETHUSDT",
//         "icon": "ethereum_icon.png",
//         "high_odd": "2.19",
//         "mid_odd": "1.69",
//         "low_odd": "1.81",
//         "high_range": 1705,
//         "mid_range": "1670-1705",
//         "mid_range_avg": 1699,
//         "low_range": 1670,
//         "duration": 6,
//         "hours": 1,
//         "minutes": 9,
//         "seconds": 30
//     }
// ]