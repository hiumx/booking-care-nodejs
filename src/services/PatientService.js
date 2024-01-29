'use strict';
import db from "../models";
import { sendEmailSimple } from "./EmailService";

class PatientService {
    static async bookingSchedule({dataBookingPatient}) {
        try {
            const {
                doctorId, doctorName, timeSpecific, patientName, patientGender, patientEmail,
                patientPhone, patientDob, patientAddress, patientReason, objectExamine,
                methodPaymentId, priceId, dateAppointment, timeType
            } = dataBookingPatient;
            let patient = null;


            patient = await db.Patient.findOne({
                where: {
                    email: patientEmail,
                },
                raw: true,
                nest: true
            });

            if (patient) {
                const bookingExist = await db.Booking.findOne({
                    where: {
                        doctorId: +doctorId,
                        patientId: patient.id,
                        timeType,
                        date: dateAppointment
                    },
                    raw: true
                });
                if (bookingExist) {
                    return {
                        code: 1,
                        message: 'Appointment already register',
                        data: ''
                    }
                }
            }
            if(!patient) {
                patient = await db.Patient.create({
                    name: patientName,
                    gender: patientGender,
                    email: patientEmail,
                    phoneNumber: patientPhone,
                    dateOfBirth: patientDob,
                    address: patientAddress
                });
            }
            if(patient) {
                const booking = await db.Booking.create({
                    statusId: 'S1',
                    objectExamine,
                    doctorId,
                    patientId: patient.id,
                    methodPaymentId,
                    priceId,
                    date: dateAppointment,
                    timeType,
                    reasonExamine: patientReason
                });
                if(booking) {
                    await sendEmailSimple({
                        namePatient: patient.name,
                        nameDoctor: doctorName.slice(8),
                        emailPatient: patient.email,
                        dateAppointment: new Date(dateAppointment).toISOString(),
                        time: timeSpecific
                    })
                    return {
                        code: 0,
                        message: 'Booking successfully',
                        data: ''
                    }
                }
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
}

export default PatientService;