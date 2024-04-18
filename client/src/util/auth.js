export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  if (!storedExpirationDate) return null;

  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  return expirationDate.getTime() - now.getTime();
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();
  if (tokenDuration !== null && tokenDuration < 0) {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    return "EXPIRED";
  }

  return token;
}
