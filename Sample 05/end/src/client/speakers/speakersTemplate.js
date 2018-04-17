//@ts-check
/**
 * 
 * @param {Array<{firstName:string, lastName:string, avatarURL:string, company:string}>} speakers 
 * @param {JQuery<HTMLElement>} container 
 */
export default function (speakers, container) {

    let template =
        `{{#list speakers}}
        <div class="card mb-5" style="height: 20rem;">
            <div class="card-body text-center">
                <div>
                    {{#if avatarURL}}
                        <img src="{{avatarURL}}" class="rounded-circle" style="width:100px;" alt="{{firstName}} {{lastName}}">
                    {{else}}
                        <img src="images/unknown.png" class="rounded-circle" style="width:100px;" alt="{{firstName}} {{lastName}}">
                    {{/if}}
                </div>
                <h5 class="card-title mt-4">
                    {{firstName}} {{lastName}}
               </h5>   
               <h6 class="card-subtitle mt-3">
                   {{company}}
               </h6>                
            </div>
            <div class="card-footer text-muted">
                {{#if twitter}}
                    <i class="fab fa-twitter"></i>
                    <a href="http://www.twitter.com/{{twitter}}" class="card-link" style="margin-left:10px;">{{twitter}}</a>
                {{else}}
                    &nbsp;
                {{/if}}    

            </div>                
        </div>
        {{/list}}`;

    Handlebars.registerHelper('list', function (context, options) {
        var ret = "<div class='row'>";
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + "<div class='col-sm-4' style='margin-bottom:5px;'>" + options.fn(context[i]) + "</div>";
        }
        return ret + "</div>";

    });

    // compiling the template
    var compiledTemplate = Handlebars.compile(template);
    // applying template to data
    var html = compiledTemplate({ speakers });
    // inject it in html
    container.html(html)
}

