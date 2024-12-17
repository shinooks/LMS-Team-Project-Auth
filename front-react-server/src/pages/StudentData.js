import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';

const StudentData = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/student/data');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Student Data</h1>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
        </div>
    );
};

export default StudentData;