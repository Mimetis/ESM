"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class speaker {
    constructor(firstName, lastName, company) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.company = company;
    }
    getFullName() {
        return `Full name : ${this.firstName} ${this.lastName} from ${this.company} `;
    }
}
exports.speaker = speaker;
class attendee {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
exports.attendee = attendee;
class user {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
exports.user = user;
class dog {
    constructor(name) {
        this.name = name;
    }
}
exports.dog = dog;
class cat {
    constructor(name) {
        this.name = name;
    }
}
exports.cat = cat;
//# sourceMappingURL=people.js.map