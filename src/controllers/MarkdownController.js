import * as markdownService from '../services/MarkdownService';

const getInfoDoctorMarkDown = async (req, res) => {
    const doctorId = req.params.id;
    try {
        const response = await markdownService.getInfoDoctorById(doctorId);
        res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: 'Something wrong from server!',
            code: -2,
            data: ''
        })
    }
}



export { getInfoDoctorMarkDown };