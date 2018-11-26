# EcmaScript Modules session

Demos on ESM Session during DEVOXX 2018

* **Demo 01**: Using **TypeScript** to understand the **ESM** syntax, and show the fallback to **commonjs** or **amd**.
* **Demo 02**: Creating an **Express** application and show how to deal with browsers that does not support yet **ESM**. This demo focuses on modules on the client side.
* **Demo 03**: Creating a full application with ESM on the browser.
* **Demo 04**: Make the compatible version for non ESM browser. Using Rollup to bundle / transpile.
* **Demo 05**: Show the complete solution, and migrate to .mjs nodejs.
* **Demo 06**: Demo on the future dynamic `import()` statement.

## Demo 01: Undestanding ESM

This demo will focus on:

* Writing modules in **ESM** style.
* Transpiling for **CommonJS** / **AMD** with **TypeScript**.

Open **/Demo01/start** folder. The project is starter initiliazed with **NodeJS** / **TypeScript**, and the **node-fetch** module:


If you want to create from scratch, here are the command lines:
``` cmd
npm init -f
tsc --init
npm install node-fetch
npm install @types/node-fetch
```

Create 3 files:

* app.ts
* people.ts
* speakerService.ts

**Copy/Paste** the people.ts file, and explain the export pattern

``` typescript
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
```

**Copy/Paste** this `speakerService.ts` file, and complete with the solution below :

``` typescript
let url = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers";

async function getAllSpeakers(): Promise<Array<speaker>> {

    var response:any;
    var speakersJson: Array<any>;
    var speakers = speakersJson.map(s => new speaker(s.firstName, s.lastName, s.company));

    return speakers;

}

```

Solution:

``` typescript
import { speaker } from "./people";
import fetch from 'node-fetch';

let url = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers";

async function getAllSpeakers(): Promise<Array<speaker>> {

    var response = await fetch(url);
    var speakersList: Array<any> = await response.json();
    var speakers = speakersList.map(s => new speaker(s.firstName, s.lastName, s.company));

    return speakers;

}

export default getAllSpeakers;
```

and explain default pattern

``` typescript
import { speaker } from "./people";
import fetch from "node-fetch";

let url = "http://cfp.devoxx.fr/api/conferences/DevoxxFR2018/speakers";

export default async () => {

    var response = await fetch(url);
    var speakersJson: Array<any> = await response.json();
    var speakers = speakersJson.map(s => new speaker(s.firstName, s.lastName, s.company));

    return speakers;

};

// export default getAllSpeakers;
```


**Copy/Paste** this `app.ts` file, and complete with the solution below :

``` typescript
// (async () => {

//     var speakers = await getAllSpeakers();

//     speakers.forEach(speaker => {
//         console.log(speaker.getFullName());
//     });

// })();
```

Solution :

``` typescript
import { speaker } from "./people";
import getAllSpeakers from "./speakerServices";

(async () => {

    var speakers = await getAllSpeakers();

    speakers.forEach(speaker => {
        console.log(speaker.getFullName());
    });

})();
```

Move everything about speaker **people.ts** and **speakerService.ts** in a subfolder called `/people`.

Create a file `/people/index.ts` to export everything from `/people`

``` typescript
export * from './people';
export * from './speakerServices'
```

Explain why we can't `export default`  in a `export *`

Workaround to export a default export in a export all pattern

``` typescript
export * from './people';
import getAllSpeakers from './speakerServices'
export { getAllSpeakers };
```

Go back to first version and replace in `speakerServices`:

``` typescript
export { getAllSpeakers };
```

Then change the `import` statement in `app.ts`:

``` typescript
import * as ppl from "./people/index";

(async () => {

    var speakers = await ppl.getAllSpeakers()

    speakers.forEach(speaker => {
        console.log(speaker.getFullName());
    });

})();
```

## Demos 02: Checking the browser capabilities for ESM

This demo will focus on:

* Showing how to see if a browser is **Modules** compliant.
* Showing how to load a script version for non compatible browsers with `nomodule` attribute
* Showing why `defer` is important when working with **Modules**

Open **Demo2/start** folder or create an express application, using **hbs** view engine.

``` cmd
express -v hbs
npm install
```

Adding **javascript files** in `layout.hbs`, just before `</body>`

``` html
  <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
```

Adding a new file `javascripts/module.js` (already done in starter folder)

``` javascript
$(() => {
    $('#supportId').html('Ce navigateur supporte les modules.');
})
```

* **Tips**: Use // @ts-check. To check your code, and see how **VS Code** is reacting :)

``` javascript
// @ts-check
$(() => {
    $('#supportId').html('Ce navigateur supporte les modules.');
})
```

Add the types definition for Jquery :

``` cmd
npm install @types/jquery -D
```

Adding `javascripts/nomodule.js`

``` javascript
// @ts-check
$(() => {
    $('#supportId').html('Ce navigateur ne supporte pas les modules.');
})
```

Adding lines in `index.hbs`

``` html
<script src="javascripts/module.js" type="module"></script>
<script src="javascripts/nomodule.js" nomodule ></script>

<h1>{{title}}</h1>
<p>Welcome to {{title}}</p>

<div id="supportId"></div>
```

* Result in **Chrome**, **Brave**, **Edge** : OK
* Result in **Firefox** : Not OK

See the console log from Firefox:

``` cmd
ReferenceError: $ is not defined
```

* Because the script was loaded before the `jquery` script file.
* Because **Modules** are defered by default.
* Add the keyword `defer` for the `nomodule` script

``` javascript
<script src="javascripts/nomodule.js" nomodule defer></script>
```

* **Tips** : *If you wants Firefox to works with **ESM**, open a tab on `about:config` and set `dom.moduleScripts.enabled` to `true`*

## Demos 03: Creating a full application with ESM for browsers

This demo will focus on:

* Showing how to works whith ES modules in a boilerplate browser application
* Showing why we should add extensions to export file
* Showing on which browsers it actually works

Get the `/Sample 03/start` folder. This folder contains a starter kit, composed with severals pre-coded things:

* An Express server, with `Handlebars` rendered and one route, to `/speaker` page.
* A full layout with bootstrap css/js.
* A directory `public/javacripts/speaker`, containing some code to handle speakers. It lakes import / export !

### Completing the export / import stuff

In `public/javacripts/speaker/speakerPage.js`, explain we have to import. But javascript requires to make some **\*.js** references. So:

``` javascript
import { speakerServices } from "./speakerServices.js";
import applySpeakerTemplate from "./speakerTemplate.js";
```

Once explained, uncomment the export in `public/javacripts/speaker/index.js`:

``` javascript
export * from "./speakerPage.js";
export * from "./speakerServices.js";
```

Open view: `views/speakers.hbs` and add the **module** script:

``` html
<script type="module">
    import { speakerPage } from './javascripts/speaker/index.js'
    new speakerPage().loadAsync();
</script>
```

## Demos 04: Make the compatible version for non ESM browser. Using Rollup to bundle / transpile

This demo will focus on:

* Adding a bundler / transpiler that will handle the browsers with no ESM
* Showing multiples pages export

Get the `/Sample 04/start` folder (actually it's the end of the `Sample 03` solution.

*** Adding Rollup

Adding `Rollup` package

``` cmd
npm install rollup -D
```

Create a folder `src/client`.
Move `public/javascripts/speaker` to `/src/client/speaker`.
Add a file in `src/client` called `index.js`:

Adding a config file `/rollup.config.js`:

``` javascript

export default [
    {
        input: 'src/client/speaker/index.js',
        output: {
            file: 'public/javascripts/index.es.js',
            format: 'es',
            sourcemap: true
        },
    },

    // SystemJS version, for older browsers
    {
        input: 'src/client/speaker/index.js',
        output: {
            file: 'public/javascripts/index.legacy.js',
            format: 'system',
            sourcemap: true
        },
    }
]
```

Using Rollup to make it work:

``` cmd
rollup -c -w
```

* -c: Using Rollup with a config file
* -w: Using Rollup with watch mode

* **Tips**: Show the output result from Rollup bundling

Replace in `views/speaker.hbs`, with this code, and explains that we can't use `defer` without the `src` attribute:

``` html
<script nomodule src='https://unpkg.com/systemjs@0.21.0/dist/system-production.js'></script>

<script nomodule>
    // because we can't use "defer" attribute without "src"
    document.addEventListener("DOMContentLoaded", async (ev) => {
        let legacy = await System.import('/javascripts/index.legacy.js');
        let sp = new legacy.speakerPage();
        await sp.loadAsync();
    });

</script>

<script type="module">
    import { speakerPage } from './javascripts/index.es.js'
    new speakerPage().loadAsync();
</script>
```

## Demos 05 : Show the complete solution, and migrate to .mjs nodejs

This demo will focus on:

* Making a node js application working with modules
* Show that we don't use a script anymore in page, but instead, a script in `layout.hbs`.
* show the `router` singleton pattern.
* going for **mjs** modules with nodeJS

### Showing the `router` singleton pattern

In any browser, on page `/Spakers` show that `router` is never recreated, and  `speakerPage` is recreated

Show the code of `router.js`

``` javascript
// singleton
export default new router();

// // Or
// let iRouter = new router();
// export { iRouter };

```

### Migrate to .mjs files

Use the refactoring tool from **VS Code** to go from `require` to `import` in `app.js` file.
Explains why we should have only one export (due to compat when ESM import CommonJS modules)
The code will be:

``` javascript
// @ts-check
import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
```

* **Tips**: Don't forget to correct errors from the code body of the file !

Rename the file `app.js` to `app.mjs`
Rename the file `www` to `www.mjs`

Change the code to reflect ESM:

``` javascript
#!/usr/bin/env node
// @ts-check

// @ts-ignore
import app from "../app.mjs";
import dg from "debug";
import http from "http";

var debug = dg('sample-02:server');
```

Launch the application with the flag `--experimental-modules`:

``` cmd
node --experimental-modules bin/www.mjs
```

## Demos 06 : use the new import() dynamic

Demo based on the future implementation of import()

Show the straightforward file we want to import, dynamically, in `/public/javascripts/bio.js`:

``` javascript
export class bio {
    getBio() {
        return 'Here is a usefull bio from ... someone !';
    }
}
```

Show the code in `/index.hbs` file:

``` html
<script type="module">
    $(() => {
        let btnBio = $("#bioButton");

        btnBio.click(async () => {

            var bioModule = await import('/javascripts/bio.js');
            var bio = new bioModule.bio();
            let bioText = bio.getBio();
            $("#bioId").html(bioText);
        })

    })
</script>
```

## References

Thanks for all these guys who shared / works on awesome stuffs, about ESM:

* [Mozilla reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
* [Testing browser support](https://cdn.rawgit.com/jakearchibald/6110fb6df717ebca44c2e40814cc12af/raw/7fc79ed89199c2512a4579c9a3ba19f72c219bd8/)
* [Rethink bundling](https://www.contentful.com/blog/2017/04/04/es6-modules-support-lands-in-browsers-is-it-time-to-rethink-bundling/)
* [Ca I Use ?](https://caniuse.com/#feat=es6-module)
* [A first look on ES6 modules](http://2ality.com/2011/03/first-look-at-upcoming-javascript.html)
* [ES6 Modules Landed in Chrome](https://medium.com/dev-channel/es6-modules-in-chrome-canary-m60-ba588dfb8ab7)
* [ES6 Modules final](http://2ality.com/2014/09/es6-modules-final.html)
* [Modules vs Scripts](http://exploringjs.com/es6/ch_modules.html#sec_modules-vs-scripts)
* [Jake Archibald Modules in Browser](https://jakearchibald.com/2017/es-modules-in-browsers/)
* [Tree Shaking with rollup and ES Modules](https://blog.mariusschulz.com/2016/06/12/bundling-and-tree-shaking-with-rollup-and-ecmascript-2015-modules)
* [Webpack does not support ES module ouptut, yet](https://github.com/webpack/webpack/issues/2933)
* [Youtube video](https://www.youtube.com/watch?v=pDjUOQ8yL88)
* [Current state of ES Module](https://medium.com/the-node-js-collection/the-current-state-of-implementation-and-planning-for-esmodules-a4ecb2aac07a)
* [Dynamic Import](http://2ality.com/2017/01/import-operator.html)
* [Dynamic Import proposal](https://github.com/tc39/proposal-dynamic-import)
* [Dynamic Import status 3](https://github.com/tc39/proposals)