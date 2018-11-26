const axios = require('axios')
const config = require('config')
module.exports = async function (req, res, next) {
  const result = {}// await axios.get(config.get('location_api_url') + req.ip + '?access_key=' + config.get('api_key_location'))
  req.geoip = result ? result.data : {}
  next()
}
