const {verify} = require('jsonwebtoken')
const secret = '#$@^%$^%*&%$$@&'

module.exports = {
    checkToken: (req,res,next) => {
        let token = req.get("authorization");

        if(token){
            let wow = token.slice(7)
            verify(wow, secret, (err,decode) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Login First",
                        err
                    })
                }else{
                    let user = decode.result
                    next()
                }
            })
        }else{
            res.json({
                success: 0,
                message: "Access Denied : unauthorized user"
            })
        }
    }
}