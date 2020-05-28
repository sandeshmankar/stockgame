const { Translate } = require("@google-cloud/translate").v2;

const translate = new Translate({ projectId: 'ec-gaming' });

async function quickStart (text) {
    // const text = "this is a notification";

    const target = "cn";

    const [ translation ] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
}

export default quickStart;