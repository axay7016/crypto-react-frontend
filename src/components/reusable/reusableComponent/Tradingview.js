import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';

const Tradingview = ({ handleModalClose, symbol }) => {

    useEffect(() => {
        new window.TradingView.widget(
            {
                // ETHUSDT  BTCUSDT

                "symbol": `BINANCE:${symbol == 2 ? 'BTCUSDT'
                    : symbol == 5 ? 'ETHUSDT'
                        : symbol == 10 ? 'BNBUSDT'
                            : symbol == 11 ? 'DOGEUSDT'
                                : symbol == 12 ? 'MATICUSDT'
                                    : symbol == 16 && 'SOLUSDT'
                    }`,
                "interval": "D",
                "timezone": "Asia/Kolkata",
                "theme": "dark",
                "style": "1",
                "locale": "in",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "withdateranges": true,
                "hide_side_toolbar": true,
                "save_image": false,
                "container_id": "tradingview_51b61"
            });
    }, [])
    return (

        <Modal
            show={true}
            onHide={handleModalClose}
            dialogClassName="tw-dialog"
            contentClassName="tw-content"
        >
            <button type="button" className="btn-close  tw-close-btn" id="close-modal" aria-label="Close" onClick={handleModalClose}></button>
            <div id="tradingview_51b61" className='tw-class'></div>
        </Modal>

    )
}

export default Tradingview

