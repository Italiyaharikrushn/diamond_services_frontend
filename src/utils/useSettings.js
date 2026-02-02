import { useDispatch } from "react-redux";
import { useGetSettingsQuery, useCreateSettingsMutation } from "../api/settingsApi";
import { setSettings } from "../redux/settingsSlice";
import { useEffect } from "react";

export const useSettings = () => {
    const dispatch = useDispatch();
    const [createSettings, { isLoading: isSaving }] = useCreateSettingsMutation();
    const { data, isLoading, isError } = useGetSettingsQuery();

    const settings = data?.settings;

    useEffect(() => {
        dispatch(setSettings(settings));
    }, [dispatch, settings]);

    const saveSettings = async (newSettings) => {
        return await createSettings({
            settings: newSettings,
        }).unwrap();
    };
    return { settings, isLoading, isError, isSaving, saveSettings };
};
