import FormExample from '@/components/custom/FormExample';
import React, { useState } from 'react';
import Api from '@/clients/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Home: React.FC = () => {
    const api = new Api();
    const [getMessage, setGetMessage] = useState<string | null>(null);
    const [postMessage, setPostMessage] = useState<string | null>(null);
    const [postValue, setPostValue] = useState<string>('');

    const handlePostTest = async () => {
        const testPostData = await api.postTest<string>(postValue);
        console.log(testPostData);

        setPostMessage(testPostData);
    };

    const handleGetTest = async () => {
        const testGetData = await api.getTest<string>();
        setGetMessage(testGetData);
    };

    return (
        <div>
            <div className="p-4 space-y-4 max-w-xs mx-auto">
                <div className="flex flex-col space-y-2">
                    <Button onClick={handlePostTest}>Test POST</Button>
                    <Input
                        type="text"
                        value={postValue}
                        onChange={(e) => setPostValue(e.target.value)}
                        placeholder="Enter value to post"
                        className="w-full"
                    />
                    <Button onClick={handleGetTest}>Test GET</Button>
                </div>
                {getMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        GET Response: {getMessage}
                    </div>
                )}
                {postMessage && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                        role="alert"
                    >
                        POST Response: {postMessage}
                    </div>
                )}
            </div>
            <div>
                <FormExample />
            </div>
        </div>
    );
};

export default Home;
