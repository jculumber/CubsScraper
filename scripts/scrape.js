// Require request and cheerio, making scraping possible
var request = require("request");
var cheerio = require("cheerio");

var scrape = function (cb) {
    request("http://www.nytimes.com", function(err, res, body){
        var $ = cheerio.load(body);
        var articles = [];

        $(".theme-summary").each(function(i, element) {
            var headline = $(this)
                .children(".story-heading")
                .text()
                .trim();
            var summary = $(this)
                .children(".summary").text().trim();

            if(headline && summary) {
                var headlineNeat = headline.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
                var summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

                var dataToAdd = {
                    headline: headlineNeat,
                    summary: summaryNeat
                };

                articles.push(dataToAdd);
            }
        });
        cb(articles);
    });
};

module.exports = scrape;