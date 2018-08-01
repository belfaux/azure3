/*-----------------------------------------------------------------------------
Test Bot Discovery with the Microsoft Bot Framework. 
-----------------------------------------------------------------------------*/
////NEW TEST

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

/*
var tableName = 'botdata';
var azureTableClient = new botbuilder_azure.AzureTableClient(tableName, process.env['AzureWebJobsStorage']);
var tableStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, azureTableClient);
var inMemoryStorage = new builder.MemoryBotStorage();
*/

var documentDbOptions = {
    host: 'https://noedjs.documents.azure.com:443/', // Host for local DocDb emulator
    masterKey: 'tMSt4EQLlJaCQpVnctFWPgQJjmdZz7vEVMdxy8hhSobuGY8oPsgsg0wKAv17lwWES6J0PN0SKqG4fD8jRLttzA==', // Fixed key for local DocDb emulator
    database: 'standard',
    collection: 'chartered'
};

var docDbClient = new botbuilder_azure.DocumentDbClient(documentDbOptions);
var cosmosStorage = new botbuilder_azure.AzureBotStorage({ gzipData: false }, docDbClient);
 
// Create your bot with a function to receive messages from the user
// Create bot and default message handler
var bot = new builder.UniversalBot(connector, function (session) {
  //session.send("Good morning.");
//  session.send("Hi! Welcome. Type in 'start' to begin. " );
}).set('storage', cosmosStorage);

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

bot.dialog('menu', function (session) {
  var msg = new builder.Message(session)
    .text("Welcome! What would you like to explore. Type 'start' to go back to this.")
    .suggestedActions(
        builder.SuggestedActions.create(
                session, [
                    builder.CardAction.imBack(session, "card", "Test Cards"),
                    builder.CardAction.imBack(session, "Show VISA", "Check Visa"),
                    builder.CardAction.imBack(session, "Show MasterCard", "Check MasterCard"),
                    builder.CardAction.imBack(session, "input", "Test Input"),
                    builder.CardAction.imBack(session, "testprompts", "Test Prompts")
                ]
            ));
session.send(msg);
}).triggerAction({ matches: /^start$/i })


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
      .title("PHP 1,000,000")
      .text("Annual Income Requirement"),
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("1 point for every PHP 30 spent")
      .text("Rewards")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^VISA Infinite/i })

bot.dialog('showVgold', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("PHP 8000,000")
      .text("Annual Income Requirement"),
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^VISA Gold/i })

bot.dialog('showVclassic', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("PHP 1,400; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee"),
      new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Late Charge")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^VISA Classic/i })

bot.dialog('showVplatinum', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("PHP 8000,000")
      .text("Annual Income Requirement"),
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^VISA Platinum/i })

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


bot.dialog('showMCtitanium', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^MasterCard Titanium/i })

bot.dialog('showMCplatinum', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
    new builder.HeroCard(session)
      .title("PHP 1,200,000")
      .text("Annual Income Requirement"),
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^MasterCard Platinum/i })

bot.dialog('showMCgold', function (session) {
  var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
       new builder.HeroCard(session)
      .title("PHP 2,000; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg).endDialog();
}).triggerAction({ matches: /^MasterCard Gold/i })

bot.dialog('showMCclassic', function (session) {
   var msg = new builder.Message(session);
  msg.attachmentLayout(builder.AttachmentLayout.carousel)
  msg.attachments([
       new builder.HeroCard(session)
      .title("PHP 1,400; Waived on first year")
      .text("Annual Fee"),
     new builder.HeroCard(session)
      .title("3.5% of Total Amount Due")
      .text("Monthly Interest Rate"),
       new builder.HeroCard(session)
      .title("5% of the Amount")
      .text("Cash Advance Fee")
  ]);
  session.send(msg)
},
function (session, results) {
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
}
).triggerAction({ matches: /^MasterCard Classic/i })

bot.dialog('createAlarm', [
    function (session) {
        session.dialogData.alarm = {};
        builder.Prompts.text(session, "What would you like to name this alarm?");
    },
    function (session, results, next) {
        if (results.response) {
            session.dialogData.name = results.response;
            builder.Prompts.time(session, "What time would you like to set an alarm for?");
        } else {
            next();
        }
    },
    function (session, results) {
        if (results.response) {
            session.dialogData.time = builder.EntityRecognizer.resolveTime([results.response]);
        }

        // Return alarm to caller  
        if (session.dialogData.name && session.dialogData.time) {
            session.endDialogWithResult({ 
                response: { name: session.dialogData.name, time: session.dialogData.time } 
            }); 
        } else {
            session.endDialogWithResult({
                resumed: builder.ResumeReason.notCompleted
            });
        }
    }
]).triggerAction({ matches: /^ALARM/i });


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

bot.recognizer({
  recognize: function (context, done) {
  var intent = { score: 0.0 };

        if (context.message.text) {
            switch (context.message.text.toLowerCase()) {
                case 'help':
                    intent = { score: 1.0, intent: 'Help' };
                    break;
                case 'goodbye':
                    intent = { score: 1.0, intent: 'Goodbye' };
                    break;
            }
        }
        done(null, intent);
    }
});
// Add a help dialog with a trigger action that is bound to the 'Help' intent
bot.dialog('helpDialog', function (session) {
    session.endDialog("To go back to the menu. Type in 'start'. Say 'goodbye' to quit.");
}).triggerAction({ matches: 'Help' });


// Add a global endConversation() action that is bound to the 'Goodbye' intent
bot.endConversationAction('goodbyeAction', "Ok... See you later.", { matches: 'Goodbye' });

bot.dialog('CancelDialog', function (session) {
    session.endConversation("Ok, I'm canceling your order.");
}).triggerAction({ matches: 'CancelIntent' });

bot.dialog('inputtest', [
    function (session) {
        builder.Prompts.text(session, "Hi! In order to process your application we need to get your info. First what is your first name?");
    },
    function (session, results) {
        session.userData.first = results.response;
        builder.Prompts.text(session, "Hi " + results.response + ". What is your middle name?"); 
    },
    function (session, results) {
        session.userData.middle = results.response;
        builder.Prompts.text(session, "What is your last name?"); 
    },
     function (session, results) {
        session.userData.last = results.response;
        builder.Prompts.text(session, "What is your address?"); 
    },
    function (session, results) {
        session.userData.address = results.response;
        builder.Prompts.text(session, "What is your mobile number?"); 
    },
    function (session, results) {
        session.userData.mobile = results.response;
        session.send("Here are the details you have submitted:  " + session.userData.first + " " + session.userData.middle + " " + session.userData.last + ", address at " +
                       session.userData.address + ", and mobile number "
                   + session.userData.mobile + 
                    ".");
    }
    
]).triggerAction({ matches: /^input/i });
