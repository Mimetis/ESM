

export function registerHelpers() {
    Handlebars.registerHelper('listSpeakers', function (context, options) {
        var ret = "<div class='row'>";
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + "<div class='col-sm-4' style='margin-bottom:5px;'>" + options.fn(context[i]) + "</div>";
        }
        return ret + "</div>";

    });

    Handlebars.registerHelper('listConferences', function (context, options) {
        var ret = "<div class='row'>";
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + "<div class='col-sm-12' style='margin-bottom:5px;'>" + options.fn(context[i]) + "</div>";
        }
        return ret + "</div>";

    });

    Handlebars.registerHelper("iif", function (conditional, options) {
        if (options.hash.desired === options.hash.type) {
            options.fn(this);
        } else {
            options.inverse(this);
        }
    });
}