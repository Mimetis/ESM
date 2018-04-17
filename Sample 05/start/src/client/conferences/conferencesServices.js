// @ts-check
export class conferencesServices {

    constructor() {
        this.apiUrl = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/schedules/"
    }
    /**
     * @param {string} dayName Get the day name. can be Wednesday, Thursday, Friday
     * @returns {Promise<Array<{roomId:string, fromTime:string, toTime:string, roomName:string, break:{id:string, nameFR:string}, talk:{trackId:string, talkType:string, track:string, summaryAsHtml:string, id:string, speakers:Array<{name:string}>, title:string, summary:string}}>>}
     */
    async getSchedulesPerDay(dayName) {

        let dayApiUrl = `${this.apiUrl}${dayName}`;

        /**
         * @type {{slots:Array<{roomId:string, fromTime:string, toTime:string, roomName:string, break:{id:string, nameFR:string}, talk:{trackId:string, talkType:string, track:string, summaryAsHtml:string, id:string, speakers:Array<{name:string}>, title:string, summary:string}}>}} 
         * */
        var conferences = await $.ajax(dayApiUrl);

        if (conferences == undefined || conferences.slots == undefined || conferences.slots.length <= 0)
            return [];

        let slots = conferences.slots.filter(c => c.talk != undefined);
        return slots;

    }

}