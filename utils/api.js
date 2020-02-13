const api = {
  async getUser (username) {
    console.log(username)
    const axios = require('axios')
    const { data } = await axios.get(`https://api.github.com/users/${username}`)
    return {
      avatar: data.avatar_url,
      email: data.email
    }
  }
}

module.exports = api
