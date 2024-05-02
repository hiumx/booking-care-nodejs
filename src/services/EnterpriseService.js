import db from '../models';

class EnterpriseService {

    static async createBenefitDigitalConversion({ image, title, description }) {
        try {
            const res = await db.benefit_digital_conversion.create({
                image, title, description
            });

            return {
                code: 0,
                message: 'get all benefits digital conversion success',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -2,
                message: 'Something wrong from service!',
                data: ''
            }
        }
    }

    static async getAllBenefitsDigitalConversion() {
        try {
            const res = await db.benefit_digital_conversion.findAll({
                raw: true,
                nest: true
            });
            res.forEach(item => {
                if (item?.image) {
                    item.image = Buffer.from(item.image, 'base64').toString('binary');
                }

            })

            return {
                code: 0,
                message: 'get all benefits digital conversion success',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -2,
                message: 'Something wrong from service!',
                data: ''
            }
        }
    }

    static async getPackagesDigitalConversionByIntendedFor(intendedFor) {
        try {
            let res = {};
            if(intendedFor === 'all') {
                res = await db.package_digital_conversion.findAll({
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });
            } else {
                res = await db.package_digital_conversion.findAll({
                    where: {
                        intendedFor
                    },
                    raw: true,
                    nest: true,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    }
                });
            }

            return {
                code: 0,
                message: 'getPackagesDigitalConversionByIntendedFor success',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -2,
                message: 'Something wrong from service!',
                data: ''
            }
        }
    }
}

export default EnterpriseService;