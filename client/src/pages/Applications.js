import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Apps from '../components/Apps';

export default function Applications() {
    const [backendData, setBackendData] = useState([{}]);
    useEffect(() => {
        fetch("/api/apps").then(
            response => response.json()
        ).then(data => {
            setBackendData(data);
        }
        )
    }, [])
    if (backendData) {
        return (
            <>
                <Navbar />
                <div>
                    {backendData.map(data => (
                        <Apps key={data.id} name={data.name} status={data.status} description={data.description} id={data.id} />
                    ))}
                </div>

            </>
        )
    }
}
