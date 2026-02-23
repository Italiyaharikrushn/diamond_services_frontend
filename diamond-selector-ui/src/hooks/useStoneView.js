import { useEffect, useState, useMemo } from "react";

export const useStoneView = (settings) => {

  const [view, setView] = useState("");

  const listingSettings =
    settings?.stone_appearance?.listing_page;

  /* -------- allowed views -------- */
  const allowedViews = useMemo(() => {
    const selected =
      listingSettings?.selected_view ?? [];

    return selected
      .filter(v => v.enabled)
      .map(v => v.id);
  }, [listingSettings]);

  /* -------- default view logic -------- */
  useEffect(() => {
    if (!listingSettings) return;
    if (!allowedViews.length) return;

    const defaultView = listingSettings.default_view;

    if (defaultView && allowedViews.includes(defaultView)) {
      setView(defaultView);
    } else {
      setView(allowedViews[0]);
    }
  }, [listingSettings, allowedViews]);

  return {
    view,
    setView,
    allowedViews
  };
};
