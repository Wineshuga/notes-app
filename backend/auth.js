const getUserEmail = (headers = {}) => {
  const email =
    headers["cf-access-authenticated-user-email"]

  return {
    email: email || "demo-user",
  };
};

module.exports = {
  getUserEmail,
};