const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");
const dotenv = require('dotenv').config();

let webhookData = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : undefined;

let prismicRef = webhookData ? webhookData.masterRef : undefined;

async function getPrismicData(ref) {
  let prismicRepoURL = process.env.PRISMIC_REPO_URL;

  if (!prismicRepoURL) {
    throw new Error(
      "PRISMIC_REPO_URL environmental variable not found in Netlify settings."
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
  //console.log(PrismicDOM.RichText.asHtml(prismicData[0].data.intro_title));
  return {
    // webhookData: JSON.stringify(webhookData),
    // prismicRef: prismicRef,
    prismicData: JSON.stringify(prismicData, undefined, 2),
    title: PrismicDOM.RichText.asHtml(prismicData[0].data.intro_title)
  };
};
