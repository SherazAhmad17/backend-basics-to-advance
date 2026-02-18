const verificationEmailTemplate = (name, verificationLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 10px; padding: 40px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { text-align: center; padding-bottom: 20px; border-bottom: 2px solid #7c3aed; }
            .header h1 { color: #7c3aed; margin: 0; font-size: 28px; }
            .content { padding: 30px 0; text-align: center; }
            .content p { color: #555; font-size: 16px; line-height: 1.6; }
            .btn { display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #7c3aed, #06b6d4); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; margin-top: 20px; }
            .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; margin-top: 20px; }
            .footer p { color: #999; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🛒 E-Commerce</h1>
            </div>
            <div class="content">
                <p>Hello <strong>${name}</strong>,</p>
                <p>Thank you for registering! Please verify your email address by clicking the button below:</p>
                <a href="${verificationLink}" class="btn">Verify Email</a>
                <p style="margin-top: 20px; font-size: 14px; color: #888;">If the button doesn't work, copy and paste this link into your browser:</p>
                <p style="font-size: 13px; color: #7c3aed; word-break: break-all;">${verificationLink}</p>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} E-Commerce. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}

export default verificationEmailTemplate;
