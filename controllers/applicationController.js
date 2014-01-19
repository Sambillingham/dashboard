var Item = require("../models/item"),
    passport = require('passport');


var applicationController = {

    index: function (req, res) {
        res.render('index', {
            title: 'Home',
            user : req.user,
            messages: req.flash('success')
        });
    },

    add: function (req, res) {

        var newItem = new Item({
            name: req.body.name,
            desc: req.body.desc,
            value: req.body.value
        });

        newItem.save(function (err, newItem) {
            if (err) throw error;

            req.flash('success', 'You added an item to the database');
            res.render("index", {
                title: "Home",
                user : req.user,
                messages: req.flash('success')

            });
        });
    },

    list: function (req, res) {

        Item.find(function (err, allItems) {
            if (err) throw error;

            console.log(allItems);

            res.render("Items", {
                title: "Items",
                items: allItems
            });
        });
    }
};

module.exports = applicationController;