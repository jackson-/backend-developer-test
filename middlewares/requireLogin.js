module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect(301, '/')
  }
  next()
}
