import React from 'react'
import { useSettings } from "../hooks/useSettings";
import CaratFilter from './CaratFilter'
import ColorFilter from './ColorFilter'
import ClarityFilter from './ClarityFilter'
import PriceFilter from './PriceFilter'
import CutFilter from './CutFilter'
import ReportFilter from './ReportFilter'
import PolishFilter from './PolishFilter'
import FluorescenceFilter from './FluorescenceFilter'

const FILTER_COMPONENTS = {
    carat: CaratFilter,
    colors: ColorFilter,
    clarity: ClarityFilter,
    price: PriceFilter,
    cut: CutFilter,
    report: ReportFilter,
    polish: PolishFilter,
    fluorescence: FluorescenceFilter,
};

const StoneFilter = ({ stoneOrigin, filters, setFilters }) => {
    const storeId = "test-store.myshopify.com";
    const { settings } = useSettings(storeId);

    const handleFilterChange = (filterType, newValue) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: newValue
        }));
    };

    if (!settings) return null;

    const diamondFilters = settings?.diamond?.filters?.[stoneOrigin] ?? [];
    const gemstoneFilters = Array.isArray(settings?.gemstone?.filters) ? settings.gemstone.filters : [];
    const enabledFilters = stoneOrigin === "gemstones" ? gemstoneFilters.filter(f => f.enabled) : diamondFilters.filter(f => f.enabled);

    return (
        <>
            {enabledFilters.map((filter, index) => {
                const typeValue = filter.type || filter.name || filter.label;
                const type = typeValue?.toLowerCase().trim();
                const FilterComponent = FILTER_COMPONENTS[type];

                if (!FilterComponent) return null;

                return (
                    <FilterComponent key={`${type}-${index}`
                    }
                        config={filter}
                        value={filters[type] || (type === 'price' ? [0, 5000] : (type === 'carat' ? [0, 15] : []))}
                        onChange={(val) => handleFilterChange(type, val)}
                    />
                );
            })}
        </>
    )
}

export default StoneFilter;
