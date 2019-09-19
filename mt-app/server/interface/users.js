import Router from 'koa-router'
import Redis from 'koa-redis'
import nodeMailer from 'nodeMailer'
import User from '../dbs/models/users'
import Passport from './utils/passport'
import Email from '../dbs/config'
import axios from './utils/axios'

let router = new Router({
	prefix: 'users'
});

let Store = new Redis().client;

/**
 * 用户注册
 * @type {[type]}
 */
router.post('/signup', async (ctx) => {
	const {
		username,
		password,
		code,
		email
	} = ctx.request.body;

	if (code) {
		const saveCode = await Store.hget(`nodemail:${username}`, 'code')
		const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
		if (code === saveCode) {
			if (new Date().getTime() - saveExpire > 0) {
				ctx.body = {
					code: -1,
					msg: '验证码过期，请重新尝试'
				}
				return false
			}
		} else {
			ctx.body = {
				code: -1,
				msg: '验证码不正确'
			}
			return false
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '请填写验证码'
		}
	}

	let user = await User.find({
		username
	})

	if (user.length) {
		ctx.body = {
			code: -1,
			msg: '已被注册'
		}
		return
	}

	let nuser = await User.create({
		username,
		password,
		email
	})
	if (nuser) {
		let res = await axios.post('/users/signin', {
			username,
			password
		})
		if (res.data && res.data.code === 0) {
			ctx.body = {
				code: 0,
				msg: '注册成功',
				user: res.data.user
			}
		} else {
			ctx.body = {
				code: -1,
				msg: 'error'
			}
		}
	} else {
		ctx.body = {
			code: -1,
			msg: '注册失败'
		}
	}
})

/**
 * 用户登录
 * @type {Object}
 */
router.post('/signin', async (ctx, next) => {
	return Passport.authenticate('local', function(err, user, info, status) {
		if (err) {
			ctx.body = {
				code: -1,
				msg: err
			}
		} else {
			if (user) {
				ctx.body = {
					code: 0,
					msg: '登录成功',
					user
				}
				return ctx.login(user)
			} else {
				ctx.body = {
					code: 1,
					msg: info
				}
			}
		}
	})(ctx, next)
})

router.post('/vertify', async (ctx, next) => {
	let username = ctx.request.body.username;
	const saveExpire = await Store.hget(`nodemail:${username}`, expire)
	if (saveExpire && new Date().getTime() - saveExpire < 0) {
		ctx.body = {
			code: -1,
			msg: '验证码请求过于频繁'
		}
		return false
	}
	let transporter = nodeMailer.createTransport({
		service: 'qq',
		auth: {
			user: Email.smtp.user,
			pass: Email.smtp.pass,
		}
	})
	let ko = {
		code: Email.smtp.code(),
		expire: Email.smtp.expire(),
		email: ctx.request.body.email,
		user: ctx.request.body.username
	}
	let mailOptions = {
		from: `"认证邮件"<${Email.smtp.user}>`,
		to: ko.email,
		subject: '注册码',
		html: `模拟注册，您的邀请码是: ${ko.code}`
	}

	await transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		} else {
			Store.hmset(`nodemail:${ko.user}`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email);
		}
	})
	ctx.body = {
		code: 0,
		msg: '验证码已发送，一分钟内有效'
	}
})