import React from 'react';
import { useGetringsQuery } from '../api/ringApi';
import RingCard from './RingCard';

const Settings = () => {
    const { data: rings, isLoading, error } = useGetringsQuery();

    if (isLoading) return <div style={{ padding: '20px' }}>Loading rings...</div>;
    if (error) return <div style={{ padding: '20px' }}>Error: {error?.status || "Something went wrong"}</div>;
    if (!rings || rings.length === 0) return <div style={{ padding: '20px' }}>No rings found.</div>;

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '18px',
            padding: '20px 15px',
            minHeight: '100vh'
        }}>
            {rings.map((ring) => (
                <RingCard key={ring.id} ring={ring} />
            ))}
        </div>
    );
};

export default Settings;
