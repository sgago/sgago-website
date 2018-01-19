/*
 * SUMMARY
 * Constructor for the Slfy object.
 */
function Slfy(url) {
  
  const that = this;
  
  // Custom Slfy HTML attributes
  const SLFY_DATA_ID = "slfy-data",
        SELECTOR_ATTRIBUTE = "data-slfy-selector",
        TYPE_ATTRIBUTE = "data-slfy-type",
        REMOVE_ATTRIBUTE = "data-slfy-remove",
        APPEND_ATTRIBUTE = "data-slfy-append",
        TYPE_DELAY_ATTRIBUTE = "data-slfy-type-delay",
        KEYSTROKE_DELAY_ATTRIBUTE = "data-slfy-keystroke-delay",
        REMOVE_DELAY_ATTRIBUTE = "data-slfy-remove-delay",
        APPEND_DELAY_ATTRIBUTE = "data-slfy-append-delay",
        IGNORE_ATTRIBUTE = "data-slfy-ignore";
  
  // Default values
  let DEFAULT_SELECTOR = "body",
      DEFAULT_RUN_TYPE = true,
      DEFAULT_RUN_REMOVE = true,
      DEFAULT_RUN_APPEND = true,
      DEFAULT_TYPE_DELAY = 2000,
      DEFAULT_KEYSTROKE_DELAY = 40,
      DEFAULT_REMOVE_DELAY = 1000,
      DEFAULT_APPEND_DELAY = 50;
  
  // 
  let htmlNodes = null,
      timeScale = 1.0,
      delay = 0;
  
  // Slfy-specific events
  let onSlfyType,
      onSlfyRemove,
      onSlfyAppend;
  
  // TODO: Need onSlfyStart and onSlfyEnd events
  
  /*
   * SUMMARY
   * Parses a string and returns the result as
   * an array of HTML DOM nodes.
   * 
   * PARAMETERS
   * text The text to parse and convert into HTML DOM nodes.
   * 
   * RETURNS
   * An array of HTML DOM nodes parsed from the text.
   */
  var parse = function parse(text) {

    return new DOMParser()
        .parseFromString(text, "text/xml")
        .getElementById(SLFY_DATA_ID)
        .children;
  }
  
  /*
   * SUMMARY
   * Initializes this Slfy object.  Requires a URL
   * to the HTML or XML file to parse.
   */
  var initialize = function initialize(url) {
    
    $.ajax({
      type: "GET",
      url: url,
      dataType: "text",
      success: function(data) {
        htmlNodes = parse(data);
      }
    });
  }
  
  /*
   * SUMMARY
   * Gets the HTML from a DOM node as a string.
   */
  var getHtml = function getHtml(node) {
    
    return node.outerHTML;
  }
  
  /*
   * SUMMARY
   * Gets the selector from a DOM node as a string.
   */
  var getSelector = function getSelector(node) {
    
    var selector = node.getAttribute(SELECTOR_ATTRIBUTE);
    
    if (selector === null) {
      selector = DEFAULT_SELECTOR;
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
      runType = DEFAULT_RUN_TYPE;
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
      runRemove = DEFAULT_RUN_REMOVE;
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
  var getAppend = function getAppend(node) {
    
    var runAppend = node.getAttribute(APPEND_ATTRIBUTE);
    
    if (runAppend === null) {
      runAppend = DEFAULT_RUN_APPEND;
    }
    else {
      runAppend = runAppend === "true";
    }
    
    return runAppend;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var getIgnore = function getIgnore(node) {
    
    var ignore = node.getAttribute(IGNORE_ATTRIBUTE);
    
    if (ignore === null) {
      ignore = false;
    }
    else {
      ignore = ignore === "true";
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
      typeDelay = DEFAULT_TYPE_DELAY;
    }
    else {
      typeDelay = +TypeDelay;
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
      keyStrokeDelay = DEFAULT_KEYSTROKE_DELAY;
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
      removeDelay = DEFAULT_REMOVE_DELAY;
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
  var getAppendDelay = function getAppendDelay(node) {
    
    var appendDelay = node.getAttribute(APPEND_DELAY_ATTRIBUTE);
    
    if (appendDelay === null) {
      appendDelay = DEFAULT_APPEND_DELAY;
    }
    else {
      appendDelay = +appendDelay;
    }
    
    return appendDelay;
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var htmlPump = function htmlPump(nodes) {
  
    let content = null,
        selector = null,
        type = false,
        remove = false,
        append = false,
        typeDelay = 0,
        removeDelay = 0,
        appendDelay = 0,
        keyStrokeDelay = 0;
    
    for (let node of nodes) {
      
      if (!getIgnore(node)) {
        content = getHtml(node);
        selector = getSelector(node);

        type = getType(node);
        remove = getRemove(node);
        append = getAppend(node);

        typeDelay = getTypeDelay(node);
        keyStrokeDelay = getKeyStrokeDelay(node);
        removeDelay = getRemoveDelay(node);
        appendDelay = getAppendDelay(node);

        if (type) {
          that.type(content, selector, delay += typeDelay, keyStrokeDelay);
        }

        if (remove) {
          that.remove(content, selector, delay += removeDelay);
        }

        if (append) {
          that.append(content, selector, delay += appendDelay);
        }
      }
    }
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.type = function type(content, selector, typeDelay, keyStrokeDelay) {

    var i = 0;

    for (i = 0; i < content.length; i++) {

      (function(index) {
        setTimeout(function() {
          $(selector)[0].innerHTML += content[index];
          
          onSlfyType = new CustomEvent("onSlfyType");
          document.dispatchEvent(onSlfyType);
          
        }, delay += keyStrokeDelay)
      })(i);
    }
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.remove = function remove(content, selector, removeDelay) {
    
    (function(content, selector, delay) {
      setTimeout(function() {
        var element = $(selector)[0];
        var escapedContent = content.replace(/</g, "&lt;").replace(/>/g, "&gt;");

        element.innerHTML = element.innerHTML.slice(0,
        element.innerHTML.length - escapedContent.length);
        
        onSlfyRemove = new CustomEvent("onSlfyRemove");
        document.dispatchEvent(onSlfyRemove);
        
      }, delay)
    })(content, selector, removeDelay);
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.append = function append(content, selector, appendDelay) {
    
    (function(content, selector, delay) {
      setTimeout(function() {
        $(selector).append(content);
        
        onSlfyAppend = new CustomEvent("onSlfyAppend");
        document.dispatchEvent(onSlfyAppend);
        
      }, delay)
    })(content, selector, appendDelay);
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.start = function start(initialDelay) {
    
    if (htmlNodes !== null) {
      delay += initialDelay;
      htmlPump(htmlNodes);
    }
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.pause = function pause() {
    
  }

  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.stop = function stop() {
    
  }
  
  initialize(url);
}