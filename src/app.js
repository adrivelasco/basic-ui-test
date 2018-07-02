(($, window, undefined) => {

  // Import SCSS module
  require('./scss/app.scss');

  let self;

  const App = {
    
    init() {
      self = this;

      $(document).ready(self.ready);
    },

    ready() {
      self.myCustomMethod();
    },

    myCustomMethod() {
      console.log('DOCUMENT IS READY');      
    }

  };

  return App.init();

})(jQuery, window);