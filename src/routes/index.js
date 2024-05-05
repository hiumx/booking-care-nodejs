const siteRouter = require('./site')
const apiRouter = require('./user')
const doctorRouter = require('./doctor');
import patientRoutes from './patient';
import specialtyRoutes from './specialty';
import enterpriseRoutes from './enterprise';
import usersRoutes from './user';

function routes(app) {
    app.use('/api', apiRouter);
    app.use('/api/doctor', doctorRouter);
    app.use('/api/patient', patientRoutes);
    app.use('/api/specialty', specialtyRoutes);
    app.use('/api/enterprise', enterpriseRoutes);
    // app.use('/api/users', usersRoutes);
    app.use('/', siteRouter);
}

module.exports = routes;


