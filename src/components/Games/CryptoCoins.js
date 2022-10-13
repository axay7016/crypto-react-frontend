
const CryptoCoins = ({ coins, handleCheckBox }) => {
    let coinsReverse = []
    if (coins) {
        coinsReverse = [...coins]?.reverse()?.map(element => {
            return element;
        });
    }

    return (
        <>
            <div className="single-item" name="coins">
                <>
                    {
                        coinsReverse?.map((coin, index) => {
                            return (
                                <label className="checkbox-single d-flex align-items-center" key={index}>
                                    <span className="left-area">
                                        <span className="checkbox-area d-flex">
                                            <input
                                                name="coins"
                                                type="checkbox"
                                                id={coin.id}
                                                onChange={handleCheckBox}
                                            />
                                            <span className="checkmark"></span>
                                        </span>
                                    </span>
                                    <span className="item-title d-flex align-items-center"
                                        name={coin.name}
                                        onClick={handleCheckBox}
                                    >
                                            <img src={`assets/images/${coin.icon}`} alt="icon" />
                                        <span>{coin.coin_name}</span>
                                    </span>
                                </label>
                            )
                        })
                    }
                </>
            </div>
        </>
    )
}

export default CryptoCoins