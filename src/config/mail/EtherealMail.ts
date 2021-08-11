import nodemailer from 'nodemailer';

interface IsendMail {
    to: string;
    body: string;
}

export default class EtherealMail {
    static async sendMail({ to, body }: IsendMail): Promise<void> {

        const account = await nodemailer.createTestAccount();

        const transporter = nodemailer.createTransport({

            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transporter.sendMail({
            from: 'equipebert@kombi.com.br',
            to,
            subject: 'Recuperação de senha',
            text: body,
        });

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
    }

}