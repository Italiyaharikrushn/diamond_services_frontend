import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RingCard = ({ ring }) => {
    const navigate = useNavigate();
    const ringDetails = typeof ring.data === 'string' ? JSON.parse(ring.data) : ring.data;
    const variants = ringDetails?.variants || [];
    const [selectedVariant, setSelectedVariant] = useState(variants[0] || {});
    const handleMetalClick = (e, metal) => {
        e.stopPropagation();
        setSelectedVariant(metal);
    };
    const goToDetails = () => {
        if (ring.id && selectedVariant.id) {
            navigate(`/settings/${ring.id}?variant=${selectedVariant.id}`);
        }
    };

    return (
        <div
            onClick={goToDetails}
            style={{
                border: '1px solid #f0f0f0',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            <div style={{ position: 'relative', width: '100%', paddingTop: '100%', background: '#f9f9f9' }}>
                <img
                    src={selectedVariant?.image || ringDetails?.media?.[0]?.image?.url}
                    alt={ring.title}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
            </div>

            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>

                <h3 style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    color: '#333',
                    minHeight: '28px',
                }}>
                    {ring.title}
                </h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '35px' }}>
                    <span style={{
                        fontWeight: '700',
                        color: '#2c3e50',
                        fontSize: '1.1rem'
                    }}>
                        ${selectedVariant?.price?.toLocaleString()}
                    </span>

                    <div style={{ display: 'flex', gap: '8px' }}>
                        {Array.from(new Set(variants.map(v => {
                            const variantTitle = v.title?.toLowerCase() || "";
                            if (variantTitle.includes('yellow')) return 'yellow';
                            if (variantTitle.includes('white')) return 'white';
                            if (variantTitle.includes('rose')) return 'rose';
                            return null;
                        }))).filter(Boolean).map((colorType) => {

                            const metal = variants.find(v => v.title.toLowerCase().includes(colorType));
                            if (!metal) return null;

                            const isSelected = selectedVariant.title?.toLowerCase().includes(colorType);

                            let bgColor = '#E6CA97';
                            if (colorType === 'white') bgColor = '#D9D9D9';
                            if (colorType === 'rose') bgColor = '#E1B4A1';

                            return (
                                <button
                                    key={metal.id}
                                    type="button"
                                    onClick={(e) => handleMetalClick(e, metal)}
                                    title={metal.title}
                                    style={{
                                        width: '22px',
                                        height: '22px',
                                        borderRadius: '15%',
                                        border: isSelected ? '2px solid #2c3e50' : '1px solid #ddd',
                                        background: bgColor,
                                        cursor: 'pointer',
                                        padding: 0,
                                        transition: 'all 0.2s',
                                        boxShadow: isSelected ? '0 0 0 2px #fff, 0 0 0 3px #2c3e50' : 'none',
                                        transform: isSelected ? 'scale(1.1)' : 'scale(1)'
                                    }}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RingCard;
