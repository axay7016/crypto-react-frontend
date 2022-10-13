import React from 'react'

const SmallCard = ({ imgSrc, description }) => {
    return (
        <div className="single-item">
            <img src={imgSrc} alt="imagesOf" />
            <h5>{description}</h5>
        </div>
    )
}

export default SmallCard