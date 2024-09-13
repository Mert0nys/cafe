import React, { useEffect, useState } from 'react'
import axios from 'axios'

const HomeL = () => {
    const [message, setMessage] = useState('')
    useEffect(() => {
        if(localStorage.getItem('access_token')===null){
            window.location.href = '/login'
        }
        else{
            (async ()=> {
                try {
                    const config = {
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        withCredentials: true
                    };
                    const {data} = await axios.get (
                        'http://localhost:8000/home/',
                        config
                    );
                    setMessage(data.message)
                }
                catch (e) {
                    console.log('not auth')
                }
            }) ()
        }
    },[])
    return (
        <>
        <div className='form-signin mt-5 text-center'>
        <h3>{message}</h3>
        </div>
        </>
    )
}
