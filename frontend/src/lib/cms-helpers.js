const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

export const getSystemConfig = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/config`);
    if (!res.ok) throw new Error("Failed to fetch config");
    return await res.json();
  } catch (e) {
    console.error("getSystemConfig error:", e);
    return {};
  }
};

export const getNavLinks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/blocks`);
    if (!res.ok) throw new Error("Failed to fetch blocks");
    const blocks = await res.json();
    const navBlock = blocks.find(b => b.type === "NAV_LINKS");
    return navBlock ? JSON.parse(navBlock.content) : [];
  } catch (e) {
    console.error("getNavLinks error:", e);
    return [];
  }
};

export const getBlocks = async () => {
  try {
    const res = await fetch(`${API_URL}/api/cms/blocks`);
    if (!res.ok) throw new Error("Failed to fetch blocks");
    return await res.json();
  } catch (e) {
    console.error("getBlocks error:", e);
    return [];
  }
};

export const getEvents = async () => {
  try {
    const blocks = await getBlocks();
    const eventsBlock = blocks.find(
      b => b.type === "TEXT_BLOCK" && b.title === "Global Events Configuration"
    );
    return eventsBlock ? JSON.parse(eventsBlock.content) : [];
  } catch (e) {
    console.error("getEvents error:", e);
    return [];
  }
};
