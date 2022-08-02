# ------------------------------------------------------------------------------------------------------------ #
# Envio de correos con nodemailer
# ------------------------------------------------------------------------------------------------------------ #
# Version de Node JS: 16
# ------------------------------------------------------------------------------------------------------------ #
# Notas Importantes:
# Requiere version de Node JS >= 11
#   Esto debido a que versiones inferiores dan problemas con una libreria
# Actualmente esta configurado para que se use con Office 365
# ------------------------------------------------------------------------------------------------------------ #
# Descripcion:
# Envio de correos que incluyen archivo ICS
# Estos correos que se envian tienen habilitado RSVP
# Actualmente ha sido probado con Outlook y Gmail
# Por lo cual estos correos muestran los botones para aceptar o rechazar la invitacion
# hay que tener cuidado ya que tanto Outlook como Gmail muestran el RSVP solo si:
#       - Outlook --> ICS es parte de icalEvent
#       - Gmail   --> ICS es parte de attachments
# Actualmente solo soporta envio a un solo correo
# ------------------------------------------------------------------------------------------------------------ #
# Comandos a usar:
# npm i --> Instalar dependencias
# npx nodemon index.js --> Iniciar el servidor en puerto 8888
#   se puede cambiar el puerto haciendo busqueda global de (Control + Shift + F): const port = 8888
# ------------------------------------------------------------------------------------------------------------ #
# URL para la peticion: http://localhost:port/
# Metodo esperado: POST
# ------------------------------------------------------------------------------------------------------------ #
# Ejemplo de json para las peticiones
# Formato de fechas yyyy/MM/dd hh:mm:ss
# ------------------------------------------------------------------------------------------------------------ #
# {
#    "starttime":"2022/08/2 15:05:00",
#    "endtime":"2022/08/2 16:00:00",
#    "summary":"Resumen del Evento",
#    "description":"Descripcion del evento",
#    "location":"Localizacion del evento",
#    "url":"https://google.com/",
#    "name":"Nombre Organizador",
#    "email":"correo-organizador@gmail.com",
#    "subject":"Prueba de correo",
#    "sendto":"correo-destinatario@gmail.com"
# }
# ------------------------------------------------------------------------------------------------------------ #