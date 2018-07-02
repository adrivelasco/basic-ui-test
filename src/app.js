(($, window, undefined) => {

  // Import SCSS module
  require('./scss/app.scss');

  // JS Code
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

  window.App = App;

  return App.init();

})(jQuery, window);