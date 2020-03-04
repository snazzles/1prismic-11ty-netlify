let testdata = ["item A", "item B", "item C", "item D"];

function transformData(data) {
  return data.map(entry => `${entry} with a suffix`);
}

let newdata = transformData(testdata);

let webhookData = process.env.INCOMING_HOOK_BODY
  ? JSON.parse(process.env.INCOMING_HOOK_BODY)
  : undefined;

let prismicRef = webhookData ? webhookData.masterRef : undefined;

// console.log(newdata);

// module.exports = {
//     pagination: {
//       data: "testdata",
//       size: 2,
//       before: function(data) {
//         return data.map(entry => `${entry} with a suffix`);
//       }
//     },
//     newdata: newdata
// }

module.exports = {
  transformData: function(data) {
    return data.map(entry => `${entry} with a suffix`);
  },
  newdata: testdata,
  webhookData: JSON.stringify(webhookData),
  prismicRef: prismicRef,
  myFish: [
    {
      name: "bass",
      age: 2
    },
    {
      name: "salmon",
      age: 5
    },
    {
      name: "mackerel",
      age: 4
    },
    {
      name: "swordfish",
      age: 9
    }
  ]
};
