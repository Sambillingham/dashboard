$(function () {
    'use strict';

    var s,
    app = {
        settings: {
        },

        init : function(){
            s = this.settings;

            this.initializers();
            this.bindUiActions();
            console.log("test");
        },

        initializers : function(){

        },

        bindUiActions : function () {
            var self = this;
        }
    };

    app.init();
});
