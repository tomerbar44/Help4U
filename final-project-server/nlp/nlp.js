var natural = require('natural');
var classifier = new natural.BayesClassifier();
const userModel = require('../models/userSchema');

// train the algorithem by sentences when the server create
classifier.addDocument('my tv not work', 'TV problems');
classifier.addDocument('i cant see nothing in my tv', 'TV problems');
classifier.addDocument('my wifi was disconnect', 'WIFI problems');
classifier.addDocument('my wifi is not work again', 'WIFI problems');
classifier.addDocument('I dont have a signal on the Internet at home.','WIFI problems');
classifier.addDocument('The internet keeps disconnecting.', 'WIFI problems');
classifier.addDocument('Your service sucks.', 'Want to disconnect');
classifier.addDocument('I want to disconnect', 'Want to disconnect');
classifier.addDocument('Youre not answering and the service is no good.', 'Want to disconnect');
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