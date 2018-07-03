(($, window, undefined) => {

  // Import SCSS module
  require('./scss/app.scss');

  let self;

  const App = {
    globals: {
      locationPath: window.location.pathname      
    },

    /**
     * Store this on "self" variable and execute my "ready" method when document is ready
     */
    init() {
      self = this;

      // A page can't be manipulated safely until the document is "ready."
      // jQuery detects this state of readiness for you.
      // http://learn.jquery.com/using-jquery-core/document-ready/
      $(document).ready(self.ready);
    },
    
    /**
     * All the scripts that are executed when document is ready
     */
    ready() {

      self.logWhenDocumentIsReady();

      if (self.globals.locationPath === '/jquery-test') {
        self.jqueryTest();
      }
      if (self.globals.locationPath === '/posts') {
        self.posts();
      }
    },

    /**
     * Console Log with color on browser
     * @param {String} message - Message to display 
     */
    logger(message, priority) {
      let colors;

      if (!priority) {
        colors = 'background: black; color: yellow; font-weight: bold;';
      } else {
        colors = 'background: white; color: black;';
      }

      console.log(`%c ${message} `, colors);
    },

    /**
     * Do a console.log when document is ready
     */
    logWhenDocumentIsReady() {
      self.logger('BASIC UI TEST LOADED');
    },

    /**
     * Executed when pathname is "/posts"
     */
    posts() {
      self.logger('VIEW: POSTS', 'low');
    },

    /**
     * Executed when pathname is "/jquery-test"
     */
    jqueryTest() {
      self.logger('VIEW: JQUERY-TEST', 'low');
    }
  };

  return App.init();

})(jQuery, window);