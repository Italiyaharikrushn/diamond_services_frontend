export const FEED_CONFIGS = {
    "CSV": {
        configKey: "feed_config",
        fields: []
    },
  "VDB": {
    title: "VDB API Configuration",
    configKey: "feed_config",
    fields: [
      { key: "api_key", label: "VDB API Key", placeholder: "Enter API Key", sm: 6 },
      { key: "access_token", label: "VDB Access Token", placeholder: "Enter VDB Token", sm: 6 }
    ]
  },
  "Nivoda": {
    title: "Nivoda Authentication",
    configKey: "feed_config",
    fields: [
      { key: "username", label: "Nivoda Username", placeholder: "Enter username", sm: 6 },
      { key: "password", label: "Nivoda Password", placeholder: "Enter password", type: "password", sm: 6 }
    ]
  },
  "The Diamond Port": {
    title: "The Diamond Port Configuration",
    configKey: "feed_config",
    fields: [
      { key: "api_key", label: "API Key", placeholder: "Enter your Diamond Port API key", sm: 12 }
    ]
  }
};
