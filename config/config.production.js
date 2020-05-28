const config = {
  version: "1",
  authUser: `${process.env.AUTH_USER}`,
  authPassword: `${process.env.AUTH_PASS}`,
  apiDomain: process.env.API_DOMAIN,
  socketUrl: process.env.SOCKET_URL,
  baseUrl: process.env.BASE_URL,
  secretKey: "GYXMAKGDYAWDW4K1C6HWWQHXH2W",
  secureStorageSecretKey: process.env.SECURE_STORAGE_SECRET_KEY,
  sessionExpiryTime: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  isMaintenance: process.env.MAINTENANCE_MODE,
  header: {
    authorization: "Basic VG5rd2ViQXBpOlRlc3QxMjMh"
  },
  userLoginAuth: {
    url: `${process.env.BASE_URL}/webUserLogin`
  },
  getStock: {
    url: `${process.env.BASE_URL}/getStock`
  },
  getAllStock: {
    url: `${process.env.BASE_URL}/getAllStock`
  },
  getAllBets: {
    url: `${process.env.BASE_URL}/getAllBets`
  },
  updateUserProfile: {
    url: `${process.env.BASE_URL}/updateUserProfile`
  },
  getUserProfile: {
    url: `${process.env.BASE_URL}/getUserProfile`
  },
  updateUserSetting: {
    url: `${process.env.BASE_URL}/updateUserSetting`
  },
  getRoadMap: {
    url: `${process.env.BASE_URL}/getRoadMap`
  },
  storeBet: {
    url: `${process.env.BASE_URL}/storeBet`
  },
  sendMessage: {
    url: `${process.env.BASE_URL}/messages/send`
  },
  getActiveGamesByCategory: {
    url: `${process.env.BASE_URL}/getActiveGamesByCategory`
  },
  getAllAnnouncements: {
    url: `${process.env.BASE_URL}/getAllAnnouncements`
  },
  followUser: {
    url: `${process.env.BASE_URL}/followUser`
  },
  getLeaderBoard: {
    url: `${process.env.BASE_URL}/getLeaderBoard`
  },
  getUserBetAnalysis: {
    url: `${process.env.BASE_URL}/getUserBetAnalysis`
  },
  getUserInvitation: {
    url: `${process.env.BASE_URL}/sendInvitation`
  },
  getVisitUserProfile: {
    url: `${process.env.BASE_URL}/visitUserProfile`
  },
  getUserFollower: {
    url: `${process.env.BASE_URL}/followUserList`
  },
  getUserNotification: {
    url: `${process.env.BASE_URL}/getNotification`
  },
  liveBetCount: {
    url: `${process.env.BASE_URL}/liveBetCount`
  },
  liveCountBetData: {
    url: `${process.env.BASE_URL}/liveCountBetData`
  },
  getUserInvitationDetails: {
    url: `${process.env.BASE_URL}/getUserInvitationDetail`
  },
  userLogout: {
    url: `${process.env.BASE_URL}/appUsersLogout`
  },
  serverConfig: {
    port: 8000,
    host: "0.0.0.0"
  },
  error: {
    general: "Something went wrong!",
    lowBalance: "Insufficient Balance. Please topup your balance"
  },
  loginError: {
    portalProvider: "Portal Provider UUID is invalid",
    portalProviderUserId: "Portal Provider User Id is invalid",
    balance: "Balance is invalid",
    authError: "Authentication authUser & authPassword is Missing."
  },
  logDomain: process.env.LOG_DOMAIN,
  defaultLanguageLocale: "cn",
  defaultCoinsModern: ["100", "500", "1000", "5000", "10000"],
  homePageStockName: "btc1",
  language: {
    cn: "chinese",
    us: "english",
    th: "thai",
    la: "lao"
  }
};

export default config;
