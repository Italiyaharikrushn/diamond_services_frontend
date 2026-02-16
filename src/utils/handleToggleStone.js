import { useDispatch, useSelector } from "react-redux";
import { updateSettingByPath } from "../redux/settingsSlice";

export const useStoneToggle = () => {
    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings.settings);

    const generalSettings = settings?.general;
    const stoneConfig = generalSettings?.stone_config;

    const handleUpdate = (path, value) => {
        dispatch(updateSettingByPath({ path: `general.${path}`, value }));
    };

    const handleToggleStone = (id) => {
        const enabledStones = stoneConfig?.stone_types?.filter(
            (stone) => stone.enabled
        );

        const currentStone = stoneConfig?.stone_types?.find(
            (stone) => stone.id === id
        );

        if (currentStone?.enabled && enabledStones?.length === 1) {
            return;
        }

        const updatedStones = stoneConfig?.stone_types?.map((stone) =>
            stone.id === id ? { ...stone, enabled: !stone.enabled } : stone
        );

        handleUpdate("stone_config.stone_types", updatedStones);
    };

    return { handleToggleStone };
};
