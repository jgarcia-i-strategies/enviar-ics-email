const nodemailer = require('nodemailer')

let emailEnv, passEnv;

emailEnv = '';
passEnv = '';

async function sendemail(sendto, subject, htmlbody, calendarObj = null) {

    //Configuracion para envio con Office 365
    //mas info: https://nodemailer.com/smtp/
    let transporter = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        auth: {
            user: emailEnv,
            pass: passEnv
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    //Se convierte el contenido del objeto a base64
    let base64Content = calendarObj.toString('base64');
    
    //Se agregan los parametros que hacen falta ya que la liberia no las genera
    let base64ContentWithRequest = base64Content.replace("VERSION:2.0", 'VERSION:2.0\nMETHOD:REQUEST');

    //Se agrega la alarma del evento para que se muestra 30 minutos antes
    //Si en un futuro Outlook y Gmail lo aceptan porque actualmente ignoran esa parte
    // 02/08/2022 - 14:40 GTM -6
    // base64ContentWithRequest = base64Content.replace("END:VEVENT",
    // 'BEGIN:VALARM\nTRIGGER:-PT30M\nACTION:DISPLAY\nDESCRIPTION:Recordatorio de Evento\nEND:VALARM\nEND:VEVENT');

    //Configuracion del objeto de invitacion de correos
    let icalEvent = {
        "filename": "invitacion.ics",
        "Content-Type": "text/calendar",
        "method": "request",
        "content": base64ContentWithRequest,
        "component": "VEVENT",
        "Content-Class": "urn:content-classes:calendarmessage"
    }

    //Configuracion del correo a enviar
    let configMail = {
        from: `${emailEnv} <${emailEnv}>`,
        to: sendto,
        subject: subject,
        html: htmlbody
    };

    //Se valida que sea gmail o no
    //ya que gmail espera el ICS en Attachments para agregarlo al calendario
    //Outlook lo espera en icalEvent
    if (sendto.includes('@gmail.com')) {
        configMail.attachments = [
            icalEvent
        ];
    } else {
        configMail.icalEvent = icalEvent;
    }

    //Envio del correo configurado
    transporter.sendMail(configMail, (err, info) => {
        if (err) {
            console.error(err.message)
        }
        console.log("Mensaje enviado", info.messageId)
        return 'Correo enviado con éxito';
    })

};

module.exports = {
    sendemail,
};