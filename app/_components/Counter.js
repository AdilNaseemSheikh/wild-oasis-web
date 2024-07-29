"use client"

import React, { useState } from 'react'

function Counter({ users }) {

    const [count, setCount] = useState(0)
    return <>
        <p>
           There are {users.length} users.
        </p>
        <button onClick={() => setCount(prev => ++prev)}>{count}</button>
    </>

}

export default Counter