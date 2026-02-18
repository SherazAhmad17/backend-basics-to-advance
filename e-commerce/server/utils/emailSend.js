import chalk from "chalk";
import transporter from "../config/nodemailer.config.js";

const emailSend = async(userEmail, subject, html)=>{
    try {
        await transporter.sendMail({
            from: `E-COMMERCE <${process.env.SMTP_USER}>`,
            subject: subject,
            to: userEmail,
            html: html,
        })
        console.log(chalk.blueBright.bgGreen("email sent successfully"))
        return true;
    } catch (error) {
        console.log(chalk.red.bgBlack("failed to send the email"))
        console.log(chalk.red("Error details:", error.message))
    }
}

export default emailSend;
