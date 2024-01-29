const bcrypt = require('bcrypt')

const genSalt = async ()=>{
    return await bcrypt.genSalt()
}

const genPassword = async(password,salt)=>{
    return await bcrypt.hash(password,salt)
}

module.exports = {genSalt , genPassword}