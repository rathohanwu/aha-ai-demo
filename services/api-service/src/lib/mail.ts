import {google} from "googleapis";
import {authenticate} from '@google-cloud/local-auth';


import {EmailParams, MailerSend, Recipient, Sender} from "mailersend";
import * as path from "path";


const mailerSend = new MailerSend({
    apiKey: "mlsn.f3186306bcb38fd28dfb4a4b65306ed0281b370934a4a8d2f77ca71d701035b5"
});


export function sendEmail(to: string, name: string, verifyEmailLink: string) {

    const sentFrom = new Sender("support@scytale.pro", "AHA AI DEMO")
    const recipients = [new Recipient("support@scytale.pro", name)]
    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("Please verify your email")
        .setHtml(`Clicking the URL to verify email , ${verifyEmailLink}`)
        .setText(`Clicking the URL to verify email ,  ${verifyEmailLink}`)
    return mailerSend.email.send(emailParams).catch((err) => console.error(err))
}

