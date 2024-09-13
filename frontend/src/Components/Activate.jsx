import React, { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Activate = () => {
    const { token } = useParams();

    useEffect(() => {
        const activateAccount = async () => {
            try {
                await axios.get(`http://localhost:8000/activate/{token}/`);
                alert('Account activated successfully!');
            } catch (error) {
                alert('Activation failed!');
            }
        };
        activateAccount();
    }, [token]);

    return <div>Activating...</div>;
};

export default Activate;