import db from "../models";

class SpecialtyService {
    static async createSpecialty({ name, descriptionHtml, descriptionMarkdown, image }) {
        try {
            const res = await db.Specialty.create({
                name,
                descriptionHtml,
                descriptionMarkdown,
                image
            });

            return {
                code: 0,
                message: 'Create new specialty successfully',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -1,
                message: 'Something wrong form service!',
                data: ''
            }
        }
    }
    static async getSpecialties() {
        try {
            const res = await db.Specialty.findAll();
            if (res) {
                res.map(specialty => {
                    specialty.image = Buffer.from(specialty.image, 'base64').toString('binary');
                })
            }
            return {
                code: 0,
                message: 'Get all specialties successfully',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -1,
                message: 'Something wrong form service!',
                data: ''
            }
        }
    }
    static async getSpecialtyById({ id }) {
        try {
            const res = await db.Specialty.findOne({
                where: {
                    id
                },
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                raw: true
            });
            if (res) {
                res.image = Buffer.from(res.image, 'base64').toString('binary');
            }
            return {
                code: 0,
                message: 'Get specialty by id successfully',
                data: res
            }
        } catch (error) {
            console.log(error);
            return {
                code: -1,
                message: 'Something wrong form service!',
                data: ''
            }
        }
    }
};

export default SpecialtyService;