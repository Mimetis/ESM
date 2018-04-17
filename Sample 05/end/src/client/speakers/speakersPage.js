// @ts-check
import { speakersServices } from "./speakersServices.js";
import applySpeakerTemplate from "./speakersTemplate.js";
import router from "../router.js";


export class speakersPage {


    constructor() {
        console.log('call ctor on speakersPage');

        // get a speakerServices instance
        this.speakServices = new speakersServices();
        this.prevLink = $("#prev");
        this.nextLink = $("#next");

    }

    async onLoad() {

        // get a page
        let pageIndex = 0;

        var viewOptions = router.getCurrentViewOptions();

        if (viewOptions && viewOptions.length > 0)
            pageIndex = parseInt(viewOptions[0])

        if (isNaN(pageIndex)) {
            pageIndex = 0;
        }

        // if (query && query["search"]) {
        let prevPageIndex = pageIndex > 0 ? pageIndex - 1 : 0;

        this.prevLink.click(() => {
            router.navigateTo(`/speakers/${prevPageIndex}`);
        });
        this.nextLink.click(() => {
            router.navigateTo(`/speakers/${pageIndex + 1}`);
        });

        await this.refresh(pageIndex);

    }


    /**
     * @param {number} pageIndex get the current page index
     */
    async refresh(pageIndex) {
        // get speakers
        let speakers = await this.speakServices.getSpeakersAsync(pageIndex, 6);

        // compiling the template
        var compiledTemplate = Handlebars.compile($("#speakerTemplateId").html());
        // applying template to data
        var html = compiledTemplate({ speakers });
        // inject it in html
        $("#speakers").html(html)

    }

    onUnload() {
        this.prevLink.unbind();
        this.nextLink.unbind();
    }



}

