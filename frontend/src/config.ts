const urls = {
  auth: {
    get token() {
      return `${Settings.api_base}/accounts/token/`;
    },
    get refresh() {
      return `${urls.auth.token}refresh/`;
    },
    get register() {
      return `${Settings.api_base}/accounts/register/`;
    },

    get sendFriendRequest() {
      return `${Settings.api_base}/accounts/friends/add/`;
    },

    get pendingFriendRequests() {
      return `${Settings.api_base}/accounts/friends/request/`;
    },

    acceptFriendRequest: (id: number) => {
      return `${Settings.api_base}/accounts/friends/request/accept/${id}/`;
    },
  },
  messages: {
    get friends() {
      return `${Settings.api_base}/messages/friends/`;
    },
    list(user: number) {
      return `${Settings.api_base}/messages/list/${user}/`;
    },
    send(user: number) {
      return `${Settings.api_base}/messages/send/${user}/`;
    },
  },
  ws: {
    messages(token: string) {
      return `${Settings.ws_base}/messages/?token=${token}`;
    },
  },
};

type SettingsType = {
  api_base: string;
  ws_base: string;
  urls: typeof urls;
  access_token_lifetime: number;
};

const DefaultTokenLifetime = 5 * 60 * 1000; // 5 minutes

const Settings: SettingsType = {
  api_base: "",
  ws_base: "",
  urls: urls,
  access_token_lifetime: DefaultTokenLifetime,
};

function _validate(envar: string) {
  let value = process.env[envar];
  if (value === undefined || value == null) {
    throw new Error(`Environment variable ${envar} is required`);
  }
}

export function checkAndInitSettings() {
  Object.freeze(urls);
  if (process.env.NODE_ENV !== "production") {
    _validate("REACT_APP_API_HOST");
    _validate("REACT_APP_API_PORT");
    const HOST = process.env.REACT_APP_API_HOST;
    const PORT = process.env.REACT_APP_API_PORT;
    const SSL =
      process.env.REACT_APP_API_SSL === "true" ||
      process.env.REACT_APP_API_SSL === "on" ||
      process.env.REACT_APP_API_SSL === "1"
        ? "s"
        : "";
    Settings.api_base = `http${SSL}://${HOST}:${PORT}/api`;
    Settings.ws_base = `ws${SSL}://${HOST}:${PORT}/ws`;
  } else {
    Settings.api_base = `${window.location.origin}/api`;
    Settings.ws_base = `ws://${window.location.host}/ws`;
  }
  Settings.access_token_lifetime =
    parseInt(process.env.REACT_APP_ACCESS_TOKEN_LIFETIME || ``) ||
    DefaultTokenLifetime;
  Object.freeze(Settings);
}

export default Settings;
