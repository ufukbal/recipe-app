import { useState, useEffect } from 'react';

const useFetch = (url: string) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setIsLoading(false);
                setData(data);
                setError(null);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.message);
            })

    }, [url])

    return { data, isLoading, error };
}

export default useFetch;