'use strict';

import EnterpriseService from "../services/EnterpriseService";

class EnterpriseController {
    async getAllBenefitsDigitalConversions(req, res, next) {
        try {
            const response = await EnterpriseService.getAllBenefitsDigitalConversion();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errorCode: -1,
                message: 'Error from server...!'
            })
        }
    }

    async createBenefitDigitalConversion(req, res, next) {
        try {
            const response = await EnterpriseService.createBenefitDigitalConversion(req.body);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errorCode: -1,
                message: 'Error from server...!'
            })
        }
    }

    async getPackagesDigitalConversionByIntendedFor(req, res, next) {
        try {
            const response = await EnterpriseService.getPackagesDigitalConversionByIntendedFor(req.params.intendedForCode);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(200).json({
                errorCode: -1,
                message: 'Error from server...!'
            })
        }
    }
}

export default new EnterpriseController();