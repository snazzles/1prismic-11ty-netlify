const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");

let webhookData = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : undefined;

let prismicRef = webhookData ? webhookData.masterRef : undefined;

async function getPrismicData() {
  return Prismic.api("https://test24242423.prismic.io/api/v2")
    .then(function(api) {
      return api.query("");
    })
    .then(
      function(response) {
        return response.results;
      },
      function(err) {
        console.log("Something went wrong: ", err);
      }
    );
}

module.exports = async function() {
  let prismicData = await getPrismicData();
  console.log(prismicData);
  return {
    webhookData: JSON.stringify(webhookData),
    prismicRef: prismicRef,
    prismicData: JSON.stringify(prismicData)
  };
};
