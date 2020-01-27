var qr = require('qr-image');
var pdf = require('html-pdf');
var listadoQrs = [];


for(var i=0; i<1; i++)
{
    var timeActual=(Date.now()+"");
    //Enviamos datos para el qr y nombre del archivo
    crearQRPNG(("datos que contendra el QR"),timeActual);
    listadoQrs[i]=timeActual+".png";
}

crearPDFQRs(listadoQrs);

function crearQRPNG(texto, nomArch)
{
    var nombreArchivo=nomArch;
    var textoQR=texto;
    var qr_png = qr.image(textoQR, { type: 'png' });
    qr_png.pipe(require('fs').createWriteStream('./qrs/'+nombreArchivo+'.png'));
}

function crearPDFQRs(listado)
{
    //Creamos el pdf con todos los qrs generados
    var contenido = ``;
    for(var i=0; i<listado.length; i++)
    {
        contenido=contenido+`
        <center><img src='`+listado[i]+`' width="80" height="80"></center>
        `
    }

    var options = {
        "height": "1.1in",
        "width": "2.4in",
        "orientation": "landscape",
        "base": 'file:///rutadelosqrs/qrs/'
       };

       //Creamos el pdf
    pdf.create(contenido, options).toFile('./qrs/imprimir.pdf', function(err, res) 
    {
        if (err){
            console.log(err);
        } else {
            console.log(res);
        }
    });
}