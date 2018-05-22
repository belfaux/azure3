/*-----------------------------------------------------------------------------
A simple echo bot for the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/

var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
  appId: process.env.MicrosoftAppId,
  appPassword: process.env.MicrosoftAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

/*----------------------------------------------------------------------------------------
* Bot Storage: This is a great spot to register the private state storage for your bot. 
* We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
* For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
* ---------------------------------------------------------------------------------------- */

var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);

// Create your bot with a function to receive messages from the user
// Create bot and default message handler
var bot = new builder.UniversalBot(connector, function (session) {
  //session.send("Good morning.");
  session.send("Hi! Would you like to look at Visa or MasterCard offerings? Type in 'card'. " );
});

// Add dialog to return list of shirts available
bot.dialog('showCards', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("VISA")
     // .subtitle("Get a VISA card")
      .text("Check out our selection of VISA Cards")
      .images([builder.CardImage.create(session, 'https://i.imgur.com/YtPmNVT.png')])
      .buttons([
        builder.CardAction.imBack(session, "Show Visa", "VISA")
      ]),
    new builder.HeroCard(session)
      .title("MasterCard")
      //.subtitle("Get a MasterCard")
      .text("Check out our selection of MasterCards")
      .images([builder.CardImage.create(session, 'https://i.imgur.com/SgihI8g.png')])
      .buttons([
        builder.CardAction.imBack(session, "Show MasterCard", "MasterCard")
      ])
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^card$/i })

bot.dialog('showVisa', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("VISA Infinite")
      .subtitle("Life’s elite pleasures, the way you like them")
      //.text("Not many can say they live life by their own rules. Welcome to Visa Infinite, a world of curated indulgences designed to enhance an exclusive lifestyle with no boundaries.")
      .images([builder.CardImage.create(session, 'https://www.visa.com.ph/pay-with-visa/find-a-card/credit-cards/_jcr_content/par/cardstack_70e9/cardStackColumn2/image_58d7.img.png/1496392332349.png')])
      .buttons([
        builder.CardAction.imBack(session, "VISA Infinite", "VISA Infinite")
      ]),
    new builder.HeroCard(session)
      .title("VISA Platinum")
      .subtitle("Celebrate more with bigger rewards")
      //.text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://www.visa.com.ph/pay-with-visa/find-a-card/credit-cards/_jcr_content/par/cardstack_4c79/cardStackColumn3/image_72e.img.png/1496392044968.png')])
      .buttons([
        builder.CardAction.imBack(session, "VISA Platinum", "VISA Platinum")
      ]),
    new builder.HeroCard(session)
      .title("VISA Gold")
      .subtitle("Step up to Visa Gold.")
     // .text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://www.visa.com.ph/pay-with-visa/find-a-card/visa-gold/_jcr_content/par/cardstack/cardStackColumn1/image.img.png/1496632532082.png')])
      .buttons([
        builder.CardAction.imBack(session, "VISA Gold", "VISA Gold")
      ]),
    new builder.HeroCard(session)
      .title("VISA Classic")
      .subtitle("The confidence of worldwide recognition.")
    //  .text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://www.visa.com.ph/pay-with-visa/find-a-card/credit-cards/_jcr_content/par/cardstack_4c79/cardStackColumn1/image_23d9.img.png/1496391367748.png')])
      .buttons([
        builder.CardAction.imBack(session, "VISA Classic", "VISA Classic")
      ])
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^Show VISA$/i })


bot.dialog('showVinfinite', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("VISA")
     // .subtitle("Get a VISA card")
      .text("Check out our selection of VISA Cards")
      .images([builder.CardImage.create(session, 'https://i.imgur.com/YtPmNVT.png')])
      .buttons([
        builder.CardAction.imBack(session, "Show Visa", "VISA")
      ]),
    new builder.HeroCard(session)
      .title("MasterCard")
      //.subtitle("Get a MasterCard")
      .text("Check out our selection of MasterCards")
      .images([builder.CardImage.create(session, 'https://i.imgur.com/SgihI8g.png')])
      .buttons([
        builder.CardAction.imBack(session, "Show MasterCard", "MasterCard")
      ])
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^VISA Infinite$/i })


bot.dialog('showMaster', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("MasterCard Titanium")
      .subtitle("Titanium Mastercard® Benefits has Revealed")
      //.text("Not many can say they live life by their own rules. Welcome to Visa Infinite, a world of curated indulgences designed to enhance an exclusive lifestyle with no boundaries.")
      .images([builder.CardImage.create(session, 'https://www.mastercard.com/en-lb/consumers/find-card-products/titanium/_jcr_content/contentpar/herolight/image.adaptive.479.high.jpg/1516889274872.jpg')])
      .buttons([
        builder.CardAction.imBack(session, "MasterCard Titanium", "MasterCard Titanium")
      ]),
    new builder.HeroCard(session)
      .title("MasterCard Platinum")
      .subtitle("A class above the rest - maximum versatility and exceptional privileges")
     // .text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://sea.mastercard.com/en-region-sea/consumers/find-card-products/credit-cards/platinum/_jcr_content/contentpar/herolight/image.adaptive.479.high.jpg/1507190380175.jpg')])
      .buttons([
        builder.CardAction.imBack(session, "MasterCard Platinum", "MasterCard Platinum")
      ]),
    new builder.HeroCard(session)
      .title("MasterCard Gold")
      .subtitle("A class above the rest - maximum versatility and exceptional privileges")
     // .text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://sea.mastercard.com/en-region-sea/consumers/find-card-products/credit-cards/mastercard/_jcr_content/contentpar/herolight_1/image.adaptive.479.high.jpg/1492611156264.jpg')])
      .buttons([
        builder.CardAction.imBack(session, "MasterCard Gold", "MasterCard Gold")
      ]),
    new builder.HeroCard(session)
      .title("MasterCard Classic")
      .subtitle("A class above the rest - maximum versatility and exceptional privileges")
     // .text("Enjoy more of the finer things you love with Visa Platinum rewards and privileges.")
      .images([builder.CardImage.create(session, 'https://sea.mastercard.com/en-region-sea/consumers/find-card-products/credit-cards/mastercard/_jcr_content/contentpar/herolight_1/image.adaptive.479.high.jpg/1492611156264.jpg')])
      .buttons([
        builder.CardAction.imBack(session, "MasterCard Classic", "MasterCard Classic")
      ])
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^Show MasterCard$/i })

bot.dialog('testprompt', function (session) {
  var msg = new builder.Message(session)
    .text("Thank you for expressing interest in our premium golf shirt! What color of shirt would you like?")
    .suggestedActions(
        builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "productId=1&color=green", "Green"),
                    builder.CardAction.imBack(session, "productId=1&color=blue", "Blue"),
                    builder.CardAction.imBack(session, "productId=1&color=red", "Red")
                ]
            ));
session.send(msg);
}).triggerAction({ matches: /^testprompt$/i })




// Add dialog to handle 'Buy' button click
bot.dialog('buyButtonClick', [
  function (session, args, next) {
    // Get color and optional size from users utterance
    var utterance = args.intent.matched[0];
    var color = /(white|gray|orange)/i.exec(utterance);
    var size = /\b(Extra Large|Large|Medium|Small)\b/i.exec(utterance);
    if (color) {
      // Initialize cart item
      var item = session.dialogData.item = {
        product: "classic " + color[0].toLowerCase() + " t-shirt",
        size: size ? size[0].toLowerCase() : null,
        price: 25.0,
        qty: 1
      };
      if (!item.size) {
        // Prompt for size
        builder.Prompts.choice(session, "What size would you like?", "Small|Medium|Large|Extra Large");
      } else {
        //Skip to next waterfall step
        next();
      }
    } else {
      // Invalid product
      session.send("I'm sorry... That product wasn't found.").endDialog();
    }
  },
  function (session, results) {
    // Save size if prompted
    var item = session.dialogData.item;
    if (results.response) {
      item.size = results.response.entity.toLowerCase();
    }

    // Add to cart
    if (!session.userData.cart) {
      session.userData.cart = [];
    }
    session.userData.cart.push(item);

    // Send confirmation to users
    session.send("A '%(size)s %(product)s' has been added to your cart.", item).endDialog();
  }
]).triggerAction({ matches: /(buy|add)\s.*shirt/i });
