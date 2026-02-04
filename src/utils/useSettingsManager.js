import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../redux/settingsSlice";

export const useSettingsManager = (basePath) => {
    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [newUrl, setNewUrl] = useState("");

    const settings = useSelector((state) => state.settings.settings);

    const handleUpdate = (path, value) => {
        dispatch(updateSettingByPath({ path, value }));
    };

    const handleEditImage = (item) => {
        setEditingItem(item);
        setNewUrl(item.image || item.url || "");
        setOpenDialog(true);
    };

    const saveImageUrl = (subPath, items) => {
        const updatedItems = items.map(s =>
            s.id === editingItem.id ? { ...s, image: newUrl } : s
        );
        handleUpdate(`${basePath}.${subPath}`, updatedItems);
        setOpenDialog(false);
    };

    return {
        settings,
        handleUpdate,
        openDialog,
        setOpenDialog,
        editingItem,
        newUrl,
        setNewUrl,
        handleEditImage,
        saveImageUrl
    };
};
