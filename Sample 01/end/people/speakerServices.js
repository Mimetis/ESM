"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const people_1 = require("./people");
const node_fetch_1 = __importDefault(require("node-fetch"));
let url = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers";
async function getAllSpeakers() {
    var response = await node_fetch_1.default(url);
    var speakersList = await response.json();
    var speakers = speakersList.map(s => new people_1.speaker(s.firstName, s.lastName, s.company));
    return speakers;
}
exports.getAllSpeakers = getAllSpeakers;
//# sourceMappingURL=speakerServices.js.map