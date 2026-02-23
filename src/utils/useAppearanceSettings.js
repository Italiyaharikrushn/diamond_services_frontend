import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../redux/settingsSlice";

export const useAppearanceSettings = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings.settings);

    const listingPage = settings?.stone_appearance?.listing_page;
    const viewPage = settings?.stone_appearance?.view_page;

    const handleUpdate = (path, value) => {
        dispatch(updateSettingByPath({ path, value }));
    };

    const handleDetailToggle = (id) => {
        const updated = (viewPage?.selected_details || []).map(d =>
            d.id === id ? { ...d, enabled: !d.enabled } : d
        );

        handleUpdate(
            "stone_appearance.view_page.selected_details",
            updated
        );
    };

    const handleSelectedViewToggle = (id) => {
        const selected_view = listingPage?.selected_view || [];
        const enabledViews = selected_view.filter(v => v.enabled);

        if (enabledViews.length === 1 && enabledViews[0].id === id) return;

        const updated = selected_view.map(v =>
            v.id === id ? { ...v, enabled: !v.enabled } : v
        );

        handleUpdate(
            "stone_appearance.listing_page.selected_view",
            updated
        );
    };

    const handleSortingToggle = (id) => {
        const options = listingPage?.sorting_options || [];

        const enabledOptions = options.filter(o => o.enabled);

        if (enabledOptions.length === 1 && enabledOptions[0].id === id) {
            return;
        }

        const updated = options.map(o =>
            o.id === id ? { ...o, enabled: !o.enabled } : o
        );

        handleUpdate(
            "stone_appearance.listing_page.sorting_options",
            updated
        );

        const enabled = updated.filter(o => o.enabled);

        const currentDefault = listingPage?.default_sort;

        const isCurrentStillValid = enabled.some(o =>
            currentDefault?.startsWith(o.id)
        );

        if (!isCurrentStillValid && enabled.length) {
            handleUpdate(
                "stone_appearance.listing_page.default_sort",
                `${enabled[0].id}_desc`
            );
        }
    };

    const handleDefaultSortUpdate = (value) => {
        handleUpdate(
            "stone_appearance.listing_page.default_sort",
            value
        );
    };

    return {
        listingPage,
        viewPage,
        handleUpdate,
        handleDetailToggle,
        handleSelectedViewToggle,
        handleSortingToggle,
        handleDefaultSortUpdate,
    };
};
