import { useGetPublicSettingsQuery } from "../api/settingsApi";

export const useSettings = (storeId) => {
    const { data, isLoading } = useGetPublicSettingsQuery({ storeId });

    const settings = data?.settings || [];

    return {
        settings,
        isLoading
    };
};
