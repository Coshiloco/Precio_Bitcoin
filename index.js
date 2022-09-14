// levantamos el servidor con express
import axios from "axios";
import * as cheerio from "cheerio";
import express from "express";
// Cojemos y cremos un objeto de express al que llamaremos app
// Esta app sera lo que levante el servidor
const app = express();

//Definimos un puerto de escucha de nuestro servidor

const port = process.env.PORT || 3000;

// Ponemos el servidor a escuchar para que reciba nuestras solicitudes

app.listen(port, () => {
  console.log(`El servidor esta a la escucha en el puerto  ${port} `);
});

// POner una ruta de la api en la raiz que es con una barra divisoria /

app.get("/preciobitcoin", async (req, res) => {
  // Probamos el axios para probar a coger una web
  try {
    const { data } = await axios.get(
      "https://es.investing.com/crypto/bitcoin?cid=1057388"
    );

    // Primero debe cargar en el HTML. Este paso en jQuery está implícito, ya que jQuery opera en el DOM horneado. Con Cheerio, necesitamos pasar el documento HTML.
    const $ = cheerio.load(data);

    // AHora lo que vamos ha hacer aqui es seleccionar el selector dentro del HTML de lo que nos interesa que es el precio del bitcoin
    const bitcoin_price_selector = "#last_last";

    //Se supone que la funcion text() nos imprime el texto que tiene ese selector
    /*Get the combined text contents of each element in the set of matched elements, 
    including their descendants. */

    // Podemos hacer un objeto para guardar dicho valor
    const pricebitcoin = {
      // Obtiene el dia de la semana a modo de numero cardinal
      fecha: new Date().toLocaleDateString() ?? "error",
      pricebitcoin: $(bitcoin_price_selector).text() ?? "error",
    };

    // LO que nos devulve data es todo el html de la pagina
    // dado que estamos haciendo una peticion de tipo get y nos devulve el html

    // Tenemos ahora el reponse
    res.json(pricebitcoin);
  } catch (error) {
    res.json({ error });
  }
  res.json({ 200: "Codigo de peticion ok en HTTP" });
});
