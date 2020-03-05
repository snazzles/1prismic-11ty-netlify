const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");

let webhookData = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : undefined;

let prismicRef = webhookData ? webhookData.masterRef : undefined;

async function getPrismicData(ref) {
  return Prismic.api("https://test24242423.prismic.io/api/v2")
    .then(function(api) {
      return api.query("", { ref: ref });
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
  let prismicData = await getPrismicData(prismicRef);
  console.log(prismicData);
  return {
    // webhookData: JSON.stringify(webhookData),
    // prismicRef: prismicRef,
    prismicData: JSON.stringify(prismicData, undefined, 2)
  };
};
