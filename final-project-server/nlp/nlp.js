var natural = require('natural');
var classifier = new natural.BayesClassifier();
const userModel = require('../models/userSchema');

// train the algorithem by sentences when the server start working
classifier.addDocument('my tv not work', 'TV');
classifier.addDocument('i cant see nothing in my tv', 'TV');
classifier.addDocument('Tv not working now!', 'TV');
classifier.addDocument('my wifi was disconnect', 'Internet');
classifier.addDocument('my wifi is not work again', 'Internet');
classifier.addDocument('I dont have a signal on the Internet at home.','Internet');
classifier.addDocument('The internet keeps disconnecting.', 'Internet');
classifier.addDocument('Your service sucks.', 'Leave');
classifier.addDocument('I want to disconnect', 'Leave');
classifier.addDocument('I want to leave', 'Leave');
classifier.addDocument('Your service is bad!', 'Leave');
classifier.addDocument('Youre not answering and the service is no good.', 'Leave');
classifier.addDocument('Im paying too much, I want a discount.', 'Financial');
classifier.addDocument('The payment is too expensive.', 'Financial');
classifier.addDocument('I want an invoice.', 'Financial');
classifier.addDocument('The monthly payment should be cheaper', 'Financial');

classifier.train();

function findMeaning(title){
     return classifier.classify(title);
}

// improve the classify algorithm by admin user that send title and subject (from the sujects schema),
// before check if the user is admin and have update access token in our db
async function trainAlgo(text,subject,google_id, access_token){
    if(text==undefined || subject==undefined||text=="" || subject=="") return false;
    try{
        const data = await userModel.checkToken(google_id, access_token);
        if(data==null) return false;
        classifier.addDocument(text, subject);
        classifier.train();
        return true;
    }
    catch (err) { throw err;}
}

module.exports = {findMeaning,trainAlgo};