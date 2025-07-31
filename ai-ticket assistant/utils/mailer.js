import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
        });
const info=await transporter.sendMail({
    from:"Inngest TMS",
    to,
    subject,
    text,
        });
console.log('Message sent: %s', info.messageId);
return info;
      } catch (error) {
        console.error('Mail error:', error.message);
        throw error
    }
};