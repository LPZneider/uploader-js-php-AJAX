import STRIPE_KEYS from "./stripe_modules.js";

const d = document,
  $tacos = d.getElementById("tacos"),
  $template = d.getElementById("taco-template"),
  $fragment = d.createDocumentFragment();

fetch("https://api.stripe.com/v1/products", {
  headers: {
    Authorization: `Bearer ${STRIPE_KEYS.secret}`,
  },
})
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((json) => {
    console.log(json);
  })
  .catch((err) => {
    console.log(err);
  });
