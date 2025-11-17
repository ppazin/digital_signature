import { useState } from "react"

export function useApiPostCall(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const apiCallPost = async (endpoint: string, body = {}) => {
        setLoading(true);
        try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();
        setMessage(data.message || 'Operation completed successfully');
        } catch (error) {
            setMessage(`Error: ${error?.message || ""}`);
        } finally {
            setLoading(false);
        }

    };
    
    return { apiCallPost, loading, message };
}