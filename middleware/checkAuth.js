import secureStorage from "../plugins/secure-storage";

export default function({ query, store, redirect }) {
  const referrerURL = secureStorage.getItem("referrerURL");
  if (referrerURL == undefined) {
    secureStorage.setItem(
      "referrerURL",
      document.referrer.match(/:\/\/(.[^/]+)/)[1]
    );
  }
}
