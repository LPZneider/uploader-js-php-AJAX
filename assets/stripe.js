import STRIPE_KEYS from "./stripe_modules.js";

const d = document,
  $tacos = d.getElementById("tacos"),
  $template = d.getElementById("taco-template").content,
  $fragment = d.createDocumentFragment(),
  fetchOptions = {
    headers: {
      Authorization: `Bearer ${STRIPE_KEYS.secret}`,
    },
  };

let products, prices;

Promise.all([
  fetch("https://api.stripe.com/v1/products", fetchOptions),
  fetch("https://api.stripe.com/v1/prices", fetchOptions),
])
  .then((responses) => Promise.all(responses.map((res) => res.json())))
  .then((json) => {
    console.log(json);
    products = json[0].data;
    prices = json[1].data;
    console.log(prices, products);

    prices.forEach((el) => {
      let producData = products.filter((product) => product.id === el.product);

      $template.querySelector(".taco").setAttribute("data-price", el.id);
      $template.querySelector("img").src = producData[0].images[0];
      $template.querySelector("figcaption").innerHTML = `
        ${producData[0].name} 
        <br>
        ${el.unit_amount_decimal} ${el.currency}
        `;

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $tacos.appendChild($fragment);
  })
  .catch((err) => {
    console.log(err);
    let message =
      err.statusText || "Ocurrio un error al conectarse a la API de Stripe";

    $tacos.innerHTML = `<p> Error ${err.status}: ${message} </p>`;
  });
