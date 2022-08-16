const express = require('express')
const ical = require('ical-generator')
const tz = require('@touch4it/ical-timezones');
const mailer = require('./mailer.js')
const app = express()

const port = 8888
app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor activo en puerto: ${port}`)
})

app.post('/enviarICS', (req, res) => {
    try {
        //Se captura el destinatario
        let sendTo = req.body.sendto;

        //Se configura el ICS
        const ics = icalInstance(req.body.starttime, req.body.endtime,
            req.body.summary, req.body.description, req.body.location,
            req.body.url, req.body.name, req.body.email,sendTo);
        
        //Se configura la plantilla de correo
        //Puede ser cambiado por una plantilla de correo 
        //que se mande por parametro de la peticion
        let htmlbody = `<h1>Invitación a evento</h1>`;

        //Se manda a llamar el metodo para el envio del correo
        mailer.sendemail(sendTo, req.body.subject,
            htmlbody, ics);

        //Si todo finaliza bien responde con 200
        res.status(200).send('Correo enviado con éxito');
    } catch (e) {

        //Imprimimos el error en consola
        console.log(e);

        //Si se produce una excepcion
        res.status(500).send('Ocurrio un error');
    }
});

//Creacion del archivo ICS con la libreria ical-generator
function icalInstance(starttime, endtime, summary, description, location, url, name, email, sendto) {

    const cal = ical({domain: "", name: summary});

    cal.timezone({
        name: 'SV',
        generator: tz.getVtimezoneComponent,
    });

    cal.createEvent({
        timezone: 'America/El_Salvador',
        method:'REQUEST',
        start: starttime,
        end: endtime,
        summary: summary,
        status:'CONFIRMED',
        description: description,
        _location: location,
        get location() {
            return this._location;
        },
        set location(value) {
            this._location = value;
        },
        url: url,
        organizer: {
            name: name,
            email: email
        },
        attendees: [
            { name: sendto, email: sendto,
             rsvp: true, role: 'OPT-PARTICIPANT', partstat: 'NEEDS-ACTION' },
        ]
    });
    return cal;
}