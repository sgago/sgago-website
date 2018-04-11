

function Attributes() {
  "use strict";
  
  const self = this;
  
  const SLFY_ATTRIBUTE_REGEX = /[ ]*(data-slfy-(.*?['"]){2})[ ]*/gi;
  
  // Custom Slfy HTML attributes
  const TYPE_SELECTOR_ATTRIBUTE =    "data-slfy-selector",
        CONTENT_SELECTOR_ATTRIBUTE = "data-slfy-content",
        TYPE_ATTRIBUTE =             "data-slfy-type",
        REMOVE_ATTRIBUTE =           "data-slfy-remove",
        INSERT_ATTRIBUTE =           "data-slfy-insert",
        TYPE_DELAY_ATTRIBUTE =       "data-slfy-start-delay",
        KEYSTROKE_DELAY_ATTRIBUTE =  "data-slfy-keystroke-delay",
        REMOVE_DELAY_ATTRIBUTE =     "data-slfy-remove-delay",
        INSERT_DELAY_ATTRIBUTE =     "data-slfy-insert-delay",
        IGNORE_ATTRIBUTE =           "data-slfy-ignore",
        VERBOSITY_ATTRIBUTE =        "data-slfy-verbose",
        MODE_ATTRIBUTE =             "data-slfy-mode";
  
  const DEFAULT_TYPE_SELECTOR_ATTRIBUTE =    "data-slfy-default-type-selector",
        DEFAULT_CONTENT_SELECTOR_ATTRIBUTE = "data-slfy-default-content-selector",
        DEFAULT_RUN_TYPE_ATTRIBUTE =         "data-slfy-default-run-type",
        DEFAULT_RUN_REMOVE_ATTRIBUTE =       "data-slfy-default-run-remove",
        DEFAULT_RUN_APPEND_ATTRIBUTE =       "data-slfy-default-run-insert",
        DEFAULT_KEYSTROKE_DELAY_ATTRIBUTE =  "data-slfy-default-keystroke-delay",
        DEFAULT_REMOVE_DELAY_ATTRIBUTE =     "data-slfy-default-remove-delay",
        DEFAULT_INSERT_DELAY_ATTRIBUTE =     "data-slfy-default-insert-delay",
        DEFAULT_MODE_ATTRIBUTE =             "data-slfy-default-mode";
  
  this.default = {
    
    typeSelector:    "body", // Default selector for typing code
    contentSelector: "body", // Default selector for placing result of typing code
    runType:         true,   // True to run the type the code
    runRemove:       true,   // True to run the remove the typed code
    runInsert:       true,   // True to run the append the actual element typed
    ignore:          false,
    verbose:         false,  // True to type slfy HTML attributes; otherwise, false.
    typeDelay:       0,      // Default delay before starting to type
    keyStrokeDelay:  40,     // Default delay between typing each character in milliseconds
    removeDelay:     1000,   // Default delay to wait before removing code in milliseconds
    insertDelay:     30,     // Default delay before showing result in milliseconds
    mode:            "inline"
  };
  
  var getVerbosity = function getVerbosity(node) {
    
    var verbose = node.getAttribute(VERBOSITY_ATTRIBUTE);
    
    if (verbose === null) {
      verbose = self.default.verbose;
    }
    
    return verbose;
  }

  /*
   * SUMMARY
   * Gets the selector from a DOM node as a string.
   */
  var getTypeSelector = function getTypeSelector(node) {
    
    var selector = node.getAttribute(TYPE_SELECTOR_ATTRIBUTE);
    
    if (selector === null) {
      selector = self.default.typeSelector;
    }
    
    return selector;
  }
  
  var getContentSelector = function getContentSelector(node) {
    
    var selector = node.getAttribute(CONTENT_SELECTOR_ATTRIBUTE);
    
    if (selector === null) {
      selector = self.default.contentSelector;
    }
    
    return selector;
  }
  
  

  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getType = function getType(node) {
    
    var runType = node.getAttribute(TYPE_ATTRIBUTE);
    
    if (runType === null) {
      runType = self.default.runType;
    }
    else {
      runType = runType === "true";
    }
    
    return runType;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getRemove = function getRemove(node) {
    
    var runRemove = node.getAttribute(REMOVE_ATTRIBUTE);
    
    if (runRemove === null) {
      runRemove = self.default.runRemove;
    }
    else {
      runRemove = runRemove === "true";
    }
    
    return runRemove;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getInsert = function getInsert(node) {
    
    var runInsert = node.getAttribute(INSERT_ATTRIBUTE);
    
    if (runInsert === null) {
      runInsert = self.default.runInsert;
    }
    else {
      runInsert = runInsert === "true";
    }
    
    return runInsert;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getIgnore = function getIgnore(node) {
    
    var ignore = node.getAttribute(IGNORE_ATTRIBUTE);
    
    if (ignore === null) {
      ignore = self.default.ignore;
    }
    
    return ignore;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getTypeDelay = function getTypeDelay(node) {
    
    var typeDelay = node.getAttribute(TYPE_DELAY_ATTRIBUTE);
    
    if (typeDelay === null) {
      typeDelay = self.default.typeDelay;
    }
    else {
      typeDelay = +typeDelay;
    }
    
    return typeDelay;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getKeyStrokeDelay = function getKeyStrokeDelay(node) {
    
    var keyStrokeDelay = node.getAttribute(KEYSTROKE_DELAY_ATTRIBUTE);
    
    if (keyStrokeDelay === null) {
      keyStrokeDelay = self.default.keyStrokeDelay;
    }
    else {
      keyStrokeDelay = +keyStrokeDelay;
    }
    
    return keyStrokeDelay;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getRemoveDelay = function getRemoveDelay(node) {
    
    var removeDelay = node.getAttribute(REMOVE_DELAY_ATTRIBUTE);
    
    if (removeDelay === null) {
      removeDelay = self.default.removeDelay;
    }
    else {
      removeDelay = +removeDelay;
    }
    
    return removeDelay;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getInsertDelay = function getInsertDelay(node) {
    
    var insertDelay = node.getAttribute(INSERT_DELAY_ATTRIBUTE);
    
    if (insertDelay === null) {
      insertDelay = self.default.insertDelay;
    }
    else {
      insertDelay = +insertDelay;
    }
    
    return insertDelay;
  }
  
  var getMode = function getMode(node) {
    
    var mode = node.getAttribute(MODE_ATTRIBUTE);
    
    if (mode === null) {
      mode = self.default.mode;
    }
    
    return mode;
  }
  
  this.get = function get(node) {
    
    var attributes = {
      
      typeSelector:    getTypeSelector(node),
      contentSelector: getContentSelector(node),
      runType:         getType(node),
      runRemove:       getRemove(node),
      runInsert:       getInsert(node),
      verbosity:       getVerbosity(node),
      typeDelay:       getTypeDelay(node),
      keyStrokeDelay:  getKeyStrokeDelay(node),
      removeDelay:     getRemoveDelay(node),
      insertDelay:     getInsertDelay(node),
      mode:            getMode(node)
    };
    
    return attributes;
  }
}