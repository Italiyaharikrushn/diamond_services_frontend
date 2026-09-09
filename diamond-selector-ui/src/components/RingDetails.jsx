import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useGetringQuery } from '../api/ringApi';
import FeatureIcons from "../components/FeatureIcons";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/navigation';

const RingDetails = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const variantIdFromUrl = searchParams.get('variant');

    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const { data: ring, isLoading, error } = useGetringQuery(id);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [mainImage, setMainImage] = useState('');

    const ringDetails = ring ? (typeof ring.data === 'string' ? JSON.parse(ring.data) : ring.data) : null;

    useEffect(() => {
        if (ringDetails) {
            const variant = ringDetails.variants?.find(v => String(v.id) === variantIdFromUrl) || ringDetails.variants?.[0];
            setSelectedVariant(variant);
            setMainImage(variant?.image || ringDetails?.media?.[0]?.image?.url);
        }
    }, [ringDetails, variantIdFromUrl]);

    const handleVariantChange = (e) => {
        const variantId = e.target.value;
        const variant = ringDetails.variants.find(v => String(v.id) === variantId);
        setSelectedVariant(variant);
        setMainImage(variant?.image || ringDetails?.media?.[0]?.image?.url);

        setSearchParams({ variant: variantId });
    };

    const sortedMedia = React.useMemo(() => {
        if (!ringDetails?.media || !selectedVariant?.image) return ringDetails?.media;
        const mediaList = [...ringDetails.media];
        const selectedIndex = mediaList.findIndex(item => item.image?.url === selectedVariant.image);
        if (selectedIndex > -1) {
            const [selectedMediaItem] = mediaList.splice(selectedIndex, 1);
            mediaList.unshift(selectedMediaItem);
        }
        return mediaList;
    }, [ringDetails?.media, selectedVariant?.image]);

    if (isLoading) return <div>Loading details...</div>;
    if (error) return <div>Error loading data.</div>;
    if (!ring || !selectedVariant) return <div>No ring found.</div>;

    return (
        <>

            
            <div style={{ padding: '40px', display: 'flex', gap: '40px' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' }}>
                        {sortedMedia?.map((item, index) => (
                            <img
                                key={index}
                                src={item.image?.url}
                                alt={`ring-thumb-${index}`}
                                onClick={() => setMainImage(item.image?.url)}
                                style={{
                                    width: '100%',
                                    aspectRatio: '1 / 1',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    border: mainImage === item.image?.url ? '2px solid #000' : '1px solid #ddd'
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <h1 style={{ margin: '10px 0' }}>{ring.title}</h1>

                    <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: '10px 0' }}>
                        ${selectedVariant.price?.toLocaleString()}
                    </p>

                    <div style={{ marginBottom: '20px', position: 'relative' }}>
                        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '10px', color: '#333' }}>
                            Metal Options
                        </label>

                        <Swiper
                            modules={[Navigation]}
                            navigation={true}
                            spaceBetween={10}
                            slidesPerView={'auto'}
                            style={{
                                padding: '5px',
                                '--swiper-navigation-size': '18px',
                                '--swiper-navigation-color': '#000',
                            }}
                        >
                            {ringDetails.variants?.map((v) => {
                                const isSelected = v.id === selectedVariant?.id;

                                return (
                                    <SwiperSlide key={v.id} style={{ width: 'auto' }}>
                                        <div
                                            onClick={() => {
                                                setSelectedVariant(v);
                                                setMainImage(v.image || ringDetails?.media?.[0]?.image?.url);
                                                setSearchParams({ variant: v.id });
                                            }}
                                            style={{
                                                border: isSelected ? '2px solid var(--ds-primary-color)' : '1px solid var(--ds-color)',
                                                borderRadius: '8px',
                                                color: isSelected ? 'var(--ds-primary-color)' : '#333',
                                                cursor: 'pointer',
                                                textAlign: 'center',
                                                backgroundColor: isSelected ? '#f9f9f9' : '#fff',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '80px',
                                                minWidth: '85px',
                                                transition: 'all 0.2s ease',
                                            }}
                                        >
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                backgroundColor: v.title.toLowerCase().includes('white') ? '#E5E4E2' :
                                                    v.title.toLowerCase().includes('rose') ? '#E4B4A8' : '#E5C07B',
                                                marginBottom: '8px',
                                                borderRadius: '2px'
                                            }} />

                                            <div style={{ fontSize: '0.75rem', fontWeight: isSelected ? '600' : '400' }}>
                                                {v.title}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <FeatureIcons />

                    {ringDetails?.description && (
                        <div style={{
                            marginTop: '20px',
                            borderTop: '1px solid #eee',
                            borderBottom: '1px solid #eee'
                        }}>
                            <div
                                onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '15px 0',
                                    cursor: 'pointer'
                                }}
                            >
                                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '500', color: '#000' }}>
                                    Product Details
                                </h3>
                                <span style={{
                                    transform: isDescriptionOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.3s ease',
                                    fontSize: '1.2rem'
                                }}>
                                    {isDescriptionOpen ? '−' : '+'}
                                </span>
                            </div>

                            {isDescriptionOpen && (
                                <div style={{
                                    paddingBottom: '20px',
                                    lineHeight: '1.6',
                                    color: '#555',
                                    fontSize: '0.95rem',
                                    animation: 'fadeIn 0.3s ease-in'
                                }}>
                                    <div dangerouslySetInnerHTML={{ __html: ringDetails.description }} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default RingDetails;
