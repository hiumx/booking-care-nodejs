const siteRouter = require('./site')
const apiRouter = require('./user')

function routes(app) {
    app.use('/api', apiRouter)
    app.use('/', siteRouter)
}

module.exports = routes;