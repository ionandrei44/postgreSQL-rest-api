const signUp = (req, res, next) => {
  res.json({
    status: "success",
    message: "Signed Up",
  });
};

module.exports = { signUp };
