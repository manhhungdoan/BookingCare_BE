require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"BookingCare" <hungthiendoan@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: 'Thông tin đặt lịch khám bệnh', // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
};

let getBodyHTMLEmail = (dataSend) => {
    let result = '';

    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận email này vì đã đặt lịch khám online trên BookingCare</p>
        <p>Thông tin đặt lịch khám:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu thông tin là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận 
        và hoàn tất thủ tục đặt lịch khám</p>
        <div>
        <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
        </div>
        <di>Xin chân thành cảm ơn</di>
        `;
    }
    if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online appointment on BookingCare</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the information is true, please click on the link below to confirm
        and complete the procedure to book an appointment</p>
        <div>
        <a href=${dataSend.redirectLink} target='_blank'>Click here</a>
        </div>
        <di>Sincerely thank</di>
        `;
    }

    return result;
};

let sendAttachment = async (dataSend) => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"BookingCare" <hungthiendoan@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: 'Hóa đơn khám bệnh', // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: [
            {
                filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
                content: dataSend.imgBase64.split('base64,')[1],
                encoding: 'base64',
            },
        ],
    });
};

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = '';

    if (dataSend.language === 'vi') {
        result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận email này vì đã đặt lịch khám online trên BookingCare thành công</p>
    <p>Thông tin đơn thuốc/ hóa đơn được gửi trong file đính kèm</p>
   
    <div>Xin chân thành cảm ơn</div>
    `;
    }
    if (dataSend.language === 'en') {
        result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you have successfully booked an online appointment on BookingCare</p>
    <p>Prescription/invoice information is sent in the attached file</p>
    <div>Sincerely thank</div>
    `;
    }

    return result;
};

module.exports = {
    sendSimpleEmail,
    sendAttachment,
};
