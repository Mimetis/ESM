// @ts-check
export class speakerServices {

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
}
