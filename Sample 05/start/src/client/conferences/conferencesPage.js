//@ts-check
import { conferencesServices } from "./conferencesServices.js";
import router from "../router.js";

export class conferencesPage {


    async onLoad() {

        let confServices = new conferencesServices();
        let queryParameters = router.getQueryParameters();

        let day = queryParameters ? queryParameters["day"] : "wednesday";
        var conferences = await confServices.getSchedulesPerDay(day);

        // compiling the template
        var compiledTemplate = Handlebars.compile($("#conferencesTemplateId").html());
        // applying template to data
        var html = compiledTemplate({ conferences });
        // inject it in html
        $("#conferences").html(html)

    }


}