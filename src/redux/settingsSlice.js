import { createSlice } from "@reduxjs/toolkit";
import { defaultSettings } from "../utils/defualtSetting";

function setDeepValue(obj, path, value) {
    const keys = path
        .replace(/\[(\w+)\]/g, ".$1") // convert [0] → .0
        .split(".")
        .filter(Boolean);

    let temp = obj;
    while (keys.length > 1) {
        const key = keys.shift();
        if (!temp[key]) temp[key] = {};
        temp = temp[key];
    }
    temp[keys[0]] = value;
}

const initialState = {
    settings: null,
    loading: false,
    error: null,
    success: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        startLoading: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
        },
        setSettings: (state, action) => {
            state.settings = action.payload && Object.keys(action.payload).length > 0 ? action.payload : defaultSettings;
            state.loading = false;
        },
        updateSettingByPath: (state, action) => {
            const { path, value } = action.payload;
            setDeepValue(state.settings, path, value);
        },

        addSettingsSuccess: (state, action) => {
            state.settings = action.payload;
            state.loading = false;
            state.success = true;
        },
        setSettingsError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
        },
        resetSettingsStatus: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
});

export const {
    startLoading,
    setSettings,
    addSettingsSuccess,
    setSettingsError,
    updateSettingByPath,
    resetSettingsStatus
} = settingsSlice.actions;

export default settingsSlice.reducer;
