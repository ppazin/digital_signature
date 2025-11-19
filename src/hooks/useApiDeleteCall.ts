import { useState } from "react";

export function useApiDeleteCall(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const apiDeleteCall = async (endpoint: string) => {
        setLoading(true);
        try {
        const response = await fetch(endpoint, {
            method: 'DELETE',
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
    
    return { apiDeleteCall, loading, message };
}