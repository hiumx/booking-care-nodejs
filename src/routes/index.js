const siteRouter = require('./site')
const apiRouter = require('./user')
const doctorRouter = require('./doctor')

function routes(app) {
    app.use('/api', apiRouter)
    app.use('/doctor', doctorRouter)
    app.use('/', siteRouter)
}

module.exports = routes;