
// @ts-check
export class speakersServices {

    /**
     * @param {number} indexPage
     * @param {number} count
     * @returns {Promise<Array<{firstName:string, lastName:string, avatarURL:string, company:string}>>} 
     */
    async getSpeakersAsync(indexPage, count) {
        /** @type Array<{firstName:string, lastName:string, avatarURL:string, company:string}> */
        var speakers = await $.ajax('http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers');
        let start = indexPage * count;
        let end = start + count;

        return speakers.sort((a, b) => { return a.lastName > b.lastName ? 1 : -1 }).slice(start, end)
    }

    async getSpeakerAsync(id) {
        var speaker = await $.ajax('http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers/' + id);
        return speaker
    }

    /**
     * 
     * @param {Array<string>} links 
     */
    async getSpeakerTalksAsync(links) {

        let talks = [];
        for (const l of links) {
            let talk = await $.ajax(l);
            talks.push(talk)
        }

        return talks;
    }



    /**
     * 
     * @param {string} speakerName 
     * @returns {Promise<Array<{uuid:string, firstName:string, lastName:string, avatarURL:string, company:string}>>} 
     */
    async searchSpeakerAsync(speakerName) {

        var speakers = await $.ajax('http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers');

        let speakerNameToLowerCase = speakerName.toLowerCase();

        let speaker = speakers.find((s) => {
            let fullName = s.firstName + " " + s.lastName;
            return fullName.toLowerCase() === speakerNameToLowerCase ||
                s.firstName.toLowerCase().indexOf(speakerNameToLowerCase) >= 0 ||
                s.lastName.toLowerCase().indexOf(speakerNameToLowerCase) >= 0
        });

        return [speaker];

    }
}
