'use strict';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import moment from 'moment';
dotenv.config();

export const sendEmailSimple = async ({ doctorId, namePatient, emailPatient, nameDoctor, dateAppointment, time, verifyToken }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  async function main() {
    await transporter.sendMail({
      from: '"Booking Care" <maixuanhieu250123@gmail.com>',
      to: emailPatient, // list of receivers
      subject: "Xác nhận đặt lịch khám",
      html: `<div>
        <h3 style='color: blue'>Xác nhận thông tin đặt lịch khám bệnh</h3>
        <p>Xin chào: <b>${namePatient}</b></p>
        <p>Bạn vừa đặt lịch khám bệnh tại Booking Care với thông tin đăng kí:</p>
        <p>Bác sĩ: <b>${nameDoctor}</b></p>
        <p>Thời gian: <b>${time}</b></p>
        <p>Ngày: <b>${moment(dateAppointment).format('DD/MM/YYYY')}</b></p>
        <p>Vui lòng click vào <i><a href='${process.env.URL_REACT_APP}/verify-schedule?token=${verifyToken}&doctorId=${doctorId}' target="_blank">đây</a></i> để xác nhận để xác nhận thông tin lịch khám.</p>
        <p>Xin cảm ơn!</p>
      </div>`, // html body
    });
  }

  main().catch(console.error);

}

export const sendEmailConfirmAppointment = async ({ namePatient, emailPatient, nameDoctor, dateAppointment, time }) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  async function main() {
    await transporter.sendMail({
      from: '"Booking Care" <maixuanhieu250123@gmail.com>',
      to: emailPatient, // list of receivers
      subject: "Xác nhận lịch hẹn khám bệnh",
      html: `<div>
        <h3 style='color: blue'>Thông báo lịch hẹn đã được xác nhận bởi bác sĩ</h3>
        <p>Xin chào: <b>${namePatient}</b></p>
        <p>Bác sĩ ${nameDoctor} đã xác nhận lịch hẹn khám bệnh: </p>
        <p>Bác sĩ: <b>${nameDoctor}</b></p>
        <p>Thời gian: <b>${time}</b></p>
        <p>Ngày: <b>${moment(dateAppointment).format('DD/MM/YYYY')}</b></p>
        <p>Vui lòng bệnh nhân có mặt đúng giờ tại địa điểm hẹn.</p>
        <p>Xin cảm ơn!</p>
      </div>`, // html body
    });
  }

  main().catch(console.error);

}