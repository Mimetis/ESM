// @ts-check
import { speakersServices } from "../speakers/speakersServices.js";
import router from "../router.js";


export class speakerPage {


    constructor() {
        // get a speakerServices instance
        this.speakServices = new speakersServices();

        console.log('call ctor on speakerPage');
    }


    async onLoad() {

        var viewOptions = router.getCurrentViewOptions();

        let queryParameters = router.getQueryParameters();

        let state = router.getCurrentState();

        let search = "";

        if (queryParameters) {
            search = queryParameters['search']
        }
        if (search == undefined && state.search) {
            search = state.search;
        }

        let searchString = decodeURIComponent(search);

        let speakers = await this.speakServices.searchSpeakerAsync(searchString);

        if (!speakers || speakers.length <= 0) {
            return;
        }

        let speakerId = speakers[0].uuid;

        let speaker = await this.speakServices.getSpeakerAsync(speakerId);

        if (speaker) {

            // compiling the template
            let compiledTemplate = Handlebars.compile($("#speakerTemplateId").html());
            // applying template to data
            let html = compiledTemplate(speaker);
            // inject it in html
            $("#speakers").html(html)
        } else {
            return;
        }

        let links = [];
        if (speaker.acceptedTalks) {
            for (const at of speaker.acceptedTalks) {
                if (at.links) {
                    for (const l of at.links) {
                        if (l.rel === "http://cfp.devoxx.fr/api/profile/talk")
                            links.push(l.href);
                    }
                }

            }
        }

        if (links.length > 0) {
            let talks = await this.speakServices.getSpeakerTalksAsync(links);

            // compiling the template
            let compiledTemplate = Handlebars.compile($("#conferencesTemplateId").html());
            // applying template to data
            let html = compiledTemplate({ talks });
            // inject it in html
            $("#conferences").html(html)

        }

    }

    onUnload() {
    }



}

