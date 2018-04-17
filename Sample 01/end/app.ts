import * as ppl from "./people/index";

(async () => {

    var speakers = await ppl.getAllSpeakers()

    speakers.forEach(s => {
        console.log(s.getFullName());
    });

})();
