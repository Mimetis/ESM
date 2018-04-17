import { speaker } from "./people";
import fetch from 'node-fetch';

let url = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers";

async function getAllSpeakers(): Promise<Array<speaker>> {

    var response = await fetch(url);
    var speakersList: Array<any> = await response.json();
    var speakers = speakersList.map(s => new speaker(s.firstName, s.lastName, s.company));

    return speakers;
}

export { getAllSpeakers };