const Prismic = require("prismic-javascript");
const PrismicDOM = require("prismic-dom");

async function getPrismicData(ref) {
  let webhookData = process.env.INCOMING_HOOK_BODY
    ? JSON.parse(process.env.INCOMING_HOOK_BODY)
    : undefined;

  let prismicRef = webhookData ? webhookData.masterRef : undefined;

  let prismicRepoURL = process.env.PRISMIC_REPO_URL;

  // if(!prismicRepoURL)

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
  console.log(prismicData);
  return {
    // webhookData: JSON.stringify(webhookData),
    // prismicRef: prismicRef,
    prismicData: JSON.stringify(prismicData, undefined, 2)
  };
};
