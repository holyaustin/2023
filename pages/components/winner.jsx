import React from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

const Winner = () => {
    //const { width, height } = useWindowSize()
    return (
        <Confetti
            width={300}
            height={800}
        />
    )
};
export default Winner;