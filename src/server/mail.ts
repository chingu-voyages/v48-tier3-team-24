import nodemailer from 'nodemailer';
import { env } from '~/env';

// Create a SMTP transport for sending emails
const transporter = nodemailer.createTransport({
    host: env.EMAIL_SERVER_HOST,
    port: Number(env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
        user: env.EMAIL_SERVER_USER,
        pass: env.EMAIL_SERVER_PASSWORD
    }
});

/**
 * A function to send an email.
 * @param {string} to the recipient's email address
 * @param {string} subject email subject line
 * @param {string} text message body in plain-text
 * @param {string} html message body in HTML
 * @returns 
 */
export const sendEmail = async (to:string, subject:string, text:string, html:string) => {
    return await transporter.sendMail({
        to: to,
        subject: subject,
        text: text,
        html: html
    });
};

export const sendEmailVerification = async (to:string, url:string) => {
    return await sendEmail(
        to,
        "EventSync: Account Verification Requested",
        `Welcome to EventSync! Please verify your account here: ${url}`,
        `<p>Welcome to EventSync! Please verify your account <a href="${url}">here</a>.`
    );
}

export default transporter;