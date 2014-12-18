var mongoose = require('mongoose');
var faker = require('faker');

var UsertSchema = new mongoose.Schema({
    name: String,
    email: String,
    card: String
});

var CompanySchema = new mongoose.Schema({
    name: String,
    bs: String,
    desc: String
})

var User = mongoose.model('user', UsertSchema);
var Company = mongoose.model('company', CompanySchema);

[genUser(),genUser(),genUser(),genUser()].forEach(function (cred) {
    var instance = new User();
    instance.name = cred[0];
    instance.email = cred[1];
    instance.card = cred[2];

    instance.save();
});

[genCompany(),genCompany(),genCompany(),genCompany()].forEach(function (cred) {
    var instance = new Company();
    instance.name = cred[0];
    instance.bs = cred[1];
    instance.desc = cred[2];

    instance.save();
});

function genUser () {
    return [faker.name.findName(), faker.internet.email(), faker.address.city()]
}

function genCompany () {
    return [faker.company.companyName(), faker.company.bs(), faker.company.catchPhraseDescriptor()]
}

mongoose.connect('mongodb://localhost/bussiness');
mongoose.connection.close();