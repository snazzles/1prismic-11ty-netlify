const Prismic = require("prismic-javascript");
//const PrismicDOM = require("prismic-dom");
const dotenv = require('dotenv').config();

let webhookData = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : undefined;

let prismicRef = webhookData ? webhookData.masterRef : undefined;

async function getPrismicData(ref) {
  let prismicRepoURL = process.env.PRISMIC_REPO_URL;

  if (!prismicRepoURL) {
    throw new Error(
      "PRISMIC_REPO_URL environmental variable not found in Netlify settings or .env file."
    );
  }

  return Prismic.api(prismicRepoURL)
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
  console.log(prismicData[0].id);
  return {
    // webhookData: JSON.stringify(webhookData),
    // prismicRef: prismicRef,
    prismicDataString: JSON.stringify(prismicData, undefined, 2),
    prismicData: prismicData,
  };
};
