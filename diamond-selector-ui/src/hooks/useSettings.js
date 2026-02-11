import { useGetPublicSettingsQuery } from "../api/settingsApi";

export const useSettings = (storeId) => {
    const { data, isLoading, error, isFetchig } = useGetPublicSettingsQuery({storeId});

    const settings = data?.settings || [];

    return{
        settings
    };
};
