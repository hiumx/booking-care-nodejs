import SpecialtyService from "../services/SpecialtyService";

class SpecialtyController {
    async createNewSpecialty(req, res, next) {
        try {
            const response = await SpecialtyService.createSpecialty(req.body);

            res.status(201).json({
                code: response.code,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error);
        }
    }
    async getAllSpecialties(req, res, next) {
        try {
            const response = await SpecialtyService.getSpecialties();

            res.status(201).json({
                code: response.code,
                message: response.message,
                data: response.data
            })
        } catch (error) {
            next(error);
        }
    }
}

export default new SpecialtyController();