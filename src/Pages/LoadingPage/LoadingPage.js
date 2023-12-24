import React from 'react'
import { ThreeDots } from 'react-loader-spinner'

const LoadingPage = () => {
    return (
        <div className='LoadingPage'>
            <h3>Loading</h3>
            <ThreeDots
                style={{ position: "absolute" }}
                height="40"
                width="30"
                radius="9"
                color="#1da1f2"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}

export default LoadingPage