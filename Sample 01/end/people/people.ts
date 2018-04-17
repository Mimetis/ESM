export class speaker {

    constructor(public firstName: string, public lastName: string, public company: string) {
    }

    getFullName() {
        return `Full name : ${this.firstName} ${this.lastName} from ${this.company} `;
    }

}

export class attendee {
    constructor(public firstName: string, public lastName: string) { }
}

export class user {
    constructor(public firstName: string, public lastName: string) { }
}

export class dog {
    constructor(public name: string) { }
}

export class cat {
    constructor(public name: string) { }
}