// // @ts-check
// uncomment the line before to get the errors raised

export class speakerPage {

    async loadAsync() {
        console.log('speakers page loaded');

        // get a speakerServices instance
        let speakServices = new speakerServices();

        // get a page
        let pageIndex = Math.round((Math.random() * 48));

        // get speakers
        let speakers = await speakServices.getSpeakersAsync(pageIndex, 6);

        // apply the template, then insert to speakers
        applySpeakerTemplate(speakers, $("#speakers"));
    }
}

