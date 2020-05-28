export default function({ isHMR, store, route }) {
  // If middleware is called from hot module replacement, ignore it
  if (isHMR) {
    return;
  }
  if (route.params.id !== undefined) {
    store.dispatch("setIsLoadingStockGame", true);
  }
}
