// @ts-check 
import urijs from "urijs";

export class router {

    constructor() {
        console.log('Constructor called on router');
        // debugger;

        this.map = new Map();
        window.addEventListener('popstate', (pse) => this._onLocationChange(pse));

        this._init(location.href);

        // called every time the document is ready
        // event after an history callback whith popstate
        $(() => this._run());
    }

    /**
     * @returns {Array<string>} get view options (all /xxx/yyy after /{View}/)
     */
    getCurrentViewOptions() {
        return this.currentViewOptions;
    }

    /**
     * @returns {string} get the current view name (the /{View} name page)
     */
    getCurrentView() {
        return this.currentView;
    }

    /**
     * @returns {{[]}} get the query parameters
     */
    getQueryParameters() {
        return this.currentQueryParameters;
    }


    /**
     * @returns {uri.URI} get the current url
     */
    getCurrentUrl() {
        return this.currentUrl;
    }

    /**
     * @returns {object} get the current state (usely after a post, and declared from the node view in {state} object)
     */
    getCurrentState() {
        return this.currentState;
    }


    /**
     * init the router on each url requested
     * @param {string} loc current location href
     */
    _init(loc) {
        this.currentUrl = new urijs(loc);

        // get the current view
        let paths = this.currentUrl.pathname().substring(1).split("/");
        if (paths.length > 0) {
            this.currentView = paths[0];
        } else {
            this.currentView = 'index';
        }

        // removing pageName
        if (paths.length > 1)
            paths.shift();

        this.currentViewOptions = paths;

        // set the query parameters
        this.currentQueryParameters = this.currentUrl.query(true);
    }


    /**
    * @param {PopStateEvent} popStateEvent 
    */
    _onLocationChange(popStateEvent) {
        var srcElem = popStateEvent.srcElement;

        // @ts-ignore
        if (!srcElem || !srcElem.location)
            return;

        if (this.currentPage)
            this.currentPage.onUnload();

        // @ts-ignore
        this._init(srcElem.location.href);
        this._run();
    }


    _createInstance(constructor) {
        var factory = constructor.bind.apply(constructor, arguments);
        return new factory();
    };


    /**
     * 
     * @param {string} url 
     * @param {object} [state] 
     */
    navigateTo(url, state) {

        if (url === this.currentUrl.pathname())
            return;

        window.history.pushState(state ? state : {}, "", url);
    }

    /**
    * @param {string} pageName
    * @param {object} pageHandler
    */
    register(pageName, pageHandler) {
        this.map.set(pageName, pageHandler);
    }

    _run() {
        this.currentState = $("#routerState").val();

        if (this.currentState)
            this.currentState = JSON.parse(this.currentState);

        let currentPageCtor = this.map.get(this.currentView);

        if (!$)
            return;

        if (!currentPageCtor)
            return;

        this.currentPage = this._createInstance(currentPageCtor);

        if (!this.currentPage)
            return;

        if (this.currentPage.onLoad) {
            $(() => this.currentPage.onLoad(this));
        }

        if (this.currentPage.onUnload) {
            $(window).on('beforeunload', () => {
                this.currentPage.onUnload()
            });
        }

    }

}


// 
export default new router();


