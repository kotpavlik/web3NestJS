import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'
import SMTPTransport from "nodemailer/lib/smtp-transport";



dotenv.config()
const STMPConfig: SMTPTransport.Options = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
}
const transporter = nodemailer.createTransport(STMPConfig)

@Injectable()
export class MailService {

    constructor() {
    }

    async sendActivationMail(to: string, activationLink: string) {

        console.log(activationLink)
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: 'Активация аккаунта на ' + process.env.API_URL,
            text: '',
            html:
                `
            <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="x-apple-disable-message-reformatting">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Web3Test</title>
	<style type="text/css">
		html {
			-webkit-text-size-adjust: none;
			-ms-text-size-adjust: none;
		}

		td[style*="padding"],
		td[class*="em-mob-width"] {
        box-sizing: border-box;
    }
	</style>
	<style em="styles">
@media only screen and (max-device-width:660px),only screen and (max-width:660px) {
    .em-narrow-table {
        width: 100%!important;
        max-width: 660px!important;
        min-width: 320px!important;
    }
    .em-mob-width-100perc {
        width: 100%!important;
        max-width: 100%!important;
    }
    .em-mob-wrap {
        display: block!important;
    }
    .em-mob-padding_right-20 {
        padding-right: 20px!important;
    }
    .em-mob-padding_left-20 {
        padding-left: 20px!important;
    }
}
</style>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F8F8;"><span class="preheader" style="display: none !important; visibility: hidden; opacity: 0; color: #F8F8F8; height: 0; width: 0; font-size: 1px;">&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;</span>
    <!--[if !mso]><!-->
    <div style="font-size:0px;color:transparent;opacity:0;">⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀</div>
    <!--<![endif]-->
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 1px; line-height: normal;" bgcolor="#F8F8F8">
        <tr em="group">
            <td align="center">
                <!--[if (gte mso 9)|(IE)]>
				<table cellpadding="0" cellspacing="0" border="0" width="660"><tr><td>
				<![endif]-->
                <table cellpadding="0" cellspacing="0" width="100%" border="0" style="max-width: 660px; min-width: 660px; width: 660px;" class="em-narrow-table">
<tr em="block" class="em-structure">
                                    <td align="center" style="padding: 20px 40px 10px;" class="em-mob-padding_left-20 em-mob-padding_right-20">
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
                                            <tr>
                                                <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc">
                                                    <table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td>
  <img src="https://emcdn.ru/420651/240419_6015_CPnBhUl.jpg" width="600" border="0" alt="" style="display: block; width: 100%; max-width: 600px;">
</td></tr></table>
                                                </td>
                                            </tr></table>
                                    </td>
                                </tr><tr em="block" class="em-structure">
  <td align="center" style="padding: 10px 40px 15px;" class="em-mob-padding_left-20 em-mob-padding_right-20">
    <table border="0" cellspacing="0" cellpadding="0" class="em-mob-width-100perc">
      <tr>
        <td width="580" valign="top" class="em-mob-wrap em-mob-width-100perc"><table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding: 12px 0px; box-shadow: 0px 0px 0px 0px;">
  <div style="font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; line-height: 32px; color: #595959; font-size: 24px;" align="center"><strong>Click on the button and go to an already <br>🖤 authorized site 🤟🏻<br><span style="font-size: 16px;">Жми на кнопку и переходи на сайт уже авторизованным</span></strong></div>
</td></tr></table><table cellpadding="0" cellspacing="0" border="0" width="100%" em="atom"><tr><td style="padding: 10px 0;" align="center">
  <table cellpadding="0" cellspacing="0" border="0" width="200">
    <tr>
      <td align="center" valign="middle" height="41" style="background-color: #eaf9a3; height: 41px; border-radius: 10px; box-shadow: #595959 2px 14px 23px -5px; border-width: 1px; border-style: solid; border-color: #595959;" bgcolor="#EAF9A3">
        <a href=${activationLink} style="display: block; height: 41px; font-family: -apple-system, 'Segoe UI', 'Helvetica Neue', Helvetica, Roboto, Arial, sans-serif; font-size: 16px; line-height: 41px; text-decoration: none; white-space: nowrap; color: #595959;" target="_blank"><strong>ACTIVATE&nbsp;</strong></a>
      </td>
    </tr></table>
</td></tr></table></td>
      </tr></table>
  </td>
</tr>
</table>
                <!--[if (gte mso 9)|(IE)]>
				</td></tr></table>
				<![endif]-->
            </td>
        </tr></table>
        
</body>
</html>
            `
        })
    }
}

