import FormExample from '@/components/custom/FormExample';
import React, { useEffect, useState } from 'react';
import Api from '@/clients/api';

const Home: React.FC = () => {
    const api = new Api();
    const [message, setMessage] = useState<string | null>(null);
    useEffect(() => {
        const fethTestData = async () => {
            const testData = await api.getTest<string>();
            setMessage(testData);
        };
        fethTestData();
    }, []);
    return (
        <div>
            {message}
            <div>
                <FormExample />
            </div>
        </div>
    );
};

export default Home;
