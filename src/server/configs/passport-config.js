var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
import config from './const'
import Users from '../models/user-model';


module.exports = function(passport) {
  const opts = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
	secretOrKey: config.secret
};

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      console.log(jwt_payload);
    Users.findOne({ where: {email: jwt_payload.data.email} }).then(
        (user) => {
            if (user) {
              console.log(user);
              done(null, user);
          } else {
              done(null, false);
          }
        }

    )
  }));
};