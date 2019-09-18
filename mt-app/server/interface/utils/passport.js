import passport from 'koa-passport'
import LocalStrategy from 'passport-local';
import User from '../../dbs/models/users';

passport.use()

passport.serializeUser(function(user,done){

})

passport.deserializeUser(function(user,done){

})

export default passport
