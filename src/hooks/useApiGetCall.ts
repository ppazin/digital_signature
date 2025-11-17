import { useState } from "react";

export function useApiGetCall(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const apiCall = async (endpoint: string) => {
        setLoading(true);
        try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
            setMessage(data.message || 'Operation completed successfully');
        } catch (error) {
            setMessage(`Error: ${error?.message || ""}`);
        } finally {
            setLoading(false);  
        }
    };
    
    return { apiCall, loading, message };
}