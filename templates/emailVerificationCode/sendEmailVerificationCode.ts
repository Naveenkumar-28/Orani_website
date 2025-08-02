import { WEB_SITE_NAME } from '@/constants';
import ejs from 'ejs';
import path from 'path';
import { sendMail } from '../sendMail';

type props = {
    userName: string,
    verificationCode: number,
    email: string
}

export const sendEmailVerificationCode = async (data: props) => {

    const formattedName = data.userName.split('').map(((i, index) => { return 0 == index ? i.toUpperCase() : i.toLowerCase() })).join('')
    const templatePath = path.join(process.cwd(), "templates", "emailVerificationCode", "emailVerification.ejs");

    const html = await ejs.renderFile(templatePath, {
        userName: formattedName,
        verificationCode: data.verificationCode,
        appName: WEB_SITE_NAME,
        year: new Date().getFullYear()
    });

    await sendMail(data.email, `Hi ${formattedName} , Please verify your email address`, html)
}

