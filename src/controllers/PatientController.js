'use strict';
import PatientService from "../services/PatientService";

class PatientController {
    async bookingSchedule(req, res, next) {
        try {
            const booking = await PatientService.bookingSchedule(req.body);
            if(!booking) {
                return res.json({
                    code: -2,
                    message: 'Create booking failed!',
                    data: ''
                })
            }
            return res.status(201).json({
                code: booking.code,
                message: booking.message,
                data: booking.data
            })
        } catch (error) {
            return res.json({
                code: -2,
                message: 'Something wrong form server!',
                data: ''
            })
        }
    }
}

export default new PatientController();
