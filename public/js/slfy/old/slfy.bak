/*
 * SUMMARY
 * Constructor for the Slfy object.
 */
function Slfy(url) {
  "use strict";
  
  // TODO: Implement timer objects instead of how this works...
  
  const self = this;
  
  const SLFY_ATTRIBUTE_REGEX = /[ ]*(data-slfy-(.*?['"]){2})[ ]*/gi;
  
  const SLFY_DATA_ID =                       "slfy-data",
        DEFAULT_TYPE_SELECTOR_ATTRIBUTE =    "data-slfy-default-type-selector",
        DEFAULT_CONTENT_SELECTOR_ATTRIBUTE = "data-slfy-default-content-selector",
        DEFAULT_RUN_TYPE_ATTRIBUTE =         "data-slfy-default-run-type",
        DEFAULT_RUN_REMOVE_ATTRIBUTE =       "data-slfy-default-run-remove",
        DEFAULT_RUN_APPEND_ATTRIBUTE =       "data-slfy-default-run-append",
        DEFAULT_KEYSTROKE_DELAY_ATTRIBUTE =  "data-slfy-default-keystroke-delay",
        DEFAULT_REMOVE_DELAY_ATTRIBUTE =     "data-slfy-default-remove-delay",
        DEFAULT_APPEND_DELAY_ATTRIBUTE =     "data-slfy-default-append-delay",
        DEFAULT_MODE_ATTRIBUTE =             "data-slfy-default-mode";
  
  this.attributes = new SlfyAttributes();
  
  Slfy.prototype.nodeIndex = 0;
  
  
  // 
  let htmlNodes = null,
      timeScale = 1.0,
      delay = 0;
  
  // Slfy-specific events
  let onSlfyStart,    // TODO: Implement onSlfyStart event
      onSlfyType,     // Raised every time a character is typed by Slfy
      onSlfyRemove,   // Raised when Slfy deletes all typed characters
      onSlfyAppend,   // Raised when Slfy appends or inserts an element to be displayed
      onSlfyEnd;      // TODO: Implement onSlfyEnd event
  
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

    // TODO: Give each node a unique ID using
    // Slfy.prototype.nodeIndex
    
    
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
  
  var getStartTag = function getStartTag(node) {
    
    return node.outerHTML.split(node.innerHTML)[0].trim();
  }
  
  var getContent = function getContent(node) {
    
    return node.textContent.trim();
  }
  
  var closeStartTag = function closeStartTag(tag) {
    
    return tag.replace(/(?=.*)>$/gi, "/>");
  }
  
  /*
   */
  var removeSlfyAttributes = function removeSlfyAttributes(node) {
    
    return node.replace(SLFY_ATTRIBUTE_REGEX, "");
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  var htmlPump = function htmlPump(nodes) {
  
    let content = null,
        parent = null,
        attribs = null,
        nodeTree = null;
    
    for (let node of nodes) {
      
      attribs = self.attributes.get(node);
      parent = $(attribs.contentSelector).get()[0];

      if (!attribs.ignore) {

        if (attribs.mode === "tree") {
          runSlfyTree(new SlfyTree(node, parent));
        }
        else {
          
          runSlfyNode(node);
        }
      }
    }
    
  }
  
  // Normal, inline mode
  var runSlfyNode = function runSlfyNode(node) {
    
    var content = null;
    var attribs = self.attributes.get(node);
    var slfyNode = null;
          
    if (!attribs.ignore) {

      content = getHtml(node);

      if (!attribs.verbose) {
        content = removeSlfyAttributes(content);
      }
      
      slfyNode = new SlfyNode(node, content, $(attribs.contentSelector), attribs);

      if (attribs.runType) {
        self.type(slfyNode,
                  delay += attribs.typeDelay,
                  attribs.keyStrokeDelay
                  );
      }

      if (attribs.runRemove) {
        self.remove(slfyNode,
                    delay += attribs.removeDelay);
      }

      if (attribs.runInsert) {
        self.append(slfyNode,
                    delay += attribs.insertDelay);
      }
    }
  }
  

  var runSlfyTree = function runSlfyTree(slfyTree) {
    
    if (!slfyTree[0].ignore) {
      
      //slfyTree[0].parent = $(slfyNode.attributes.contentSelector).get()[0];
      
      for (let slfyNode of slfyTree) {
        
        if (!slfyNode.attributes.verbose) {
          //content = removeSlfyAttributes(content);
        }
        
        if (slfyNode.attributes.runType) {
          self.type(slfyNode,
                    delay += slfyNode.attributes.typeDelay,
                    slfyNode.attributes.keyStrokeDelay);
        }

        if (slfyNode.attributes.runRemove) {
          self.remove(slfyNode,
                      delay += slfyNode.attributes.removeDelay);
        }

        if (slfyNode.attributes.runInsert) {
          self.append(slfyNode,
                      delay += slfyNode.attributes.insertDelay);
        }
        
      }
      
    }
  }
  
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  this.type = function type(slfyNode, typeDelay, keyStrokeDelay) {

    var i = 0;
    var j = 0;
    
    var regex = /(\n)|(\\p)/gi;
    var result = regex[Symbol.split](slfyNode.content);
    var token = "";
    var insert = "";
    
    // For each string in the array...
    for (j = 0; result !== undefined && j < result.length; j++) {
      
      token = result[j];
      
      if (token !== undefined)
      {
        
        if (token === "\n" || token === "\\p") {
        
          if (token === "\n") {
            insert = "<br>";
          }
          else {
            insert = "&nbsp;"
          }
          
          (function(str, slfyNode) {
              setTimeout(function() {

                $(slfyNode.attributes.typeSelector)[0].innerHTML += str;
                
              }, delay += keyStrokeDelay)
          })(insert, slfyNode);
        }
        else {

          // For each character in the string...
          for (i = 0; i < result[j].length; i++) {

            (function(stringNum, charIndex, slfyNode) {
              
              setTimeout(function() {
                
                $(slfyNode.attributes.typeSelector)[0].innerHTML += result[stringNum][charIndex];

                onSlfyType = new CustomEvent("onSlfyType");
                document.dispatchEvent(onSlfyType);

              }, delay += keyStrokeDelay)
            })(j, i, slfyNode);
          }
        }
        
        
      }
    }
    
    
  }
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  /*
  this.remove = function remove(content, selector, removeDelay) {
    
    (function(content, selector, delay) {
      setTimeout(function() {
        var element = $(selector)[0];
        
        
        // TODO: Find a better way to escape HTML content for typing
        var escapedContent = content.replace(/</gi, "&lt;")
                                    .replace(/>/gi, "&gt;")
                                    .replace(/(\n)/gi, "<br>")
                                    .replace(/(\\p)/gi, "&nbsp;");

        element.innerHTML = element.innerHTML.slice(0,
          element.innerHTML.length - escapedContent.length);
        
        onSlfyRemove = new CustomEvent("onSlfyRemove");
        document.dispatchEvent(onSlfyRemove);
        
      }, delay)
    })(content, selector, removeDelay);
  }
  */
  
    this.remove = function remove(slfyNode, removeDelay) {
    
    (function(slfyNode, delay) {
      setTimeout(function() {
        var element = $(slfyNode.attributes.typeSelector)[0];
        var content = slfyNode.content;
        
        // TODO: Find a better way to escape HTML content for typing
        var escapedContent = content.replace(/</gi, "&lt;")
                                    .replace(/>/gi, "&gt;")
                                    .replace(/(\n)/gi, "<br>")
                                    .replace(/(\\p)/gi, "&nbsp;");

        element.innerHTML = element.innerHTML.slice(0,
          element.innerHTML.length - escapedContent.length);
        
        onSlfyRemove = new CustomEvent("onSlfyRemove");
        document.dispatchEvent(onSlfyRemove);
        
      }, delay)
    })(slfyNode, removeDelay);
  }
  
  
  
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
  /*
  this.append = function append(content, selector, appendDelay) {
    
    (function(content, selector, delay) {
      setTimeout(function() {
        
        var escapedContent = content.replace(/(\\p)/gi, "");
        
        $(selector).append(escapedContent);
        
        onSlfyAppend = new CustomEvent("onSlfyAppend");
        document.dispatchEvent(onSlfyAppend);
        
      }, delay)
    })(content, selector, appendDelay);
  }
  */
    
  this.append = function append(slfyNode, appendDelay) {
    
    (function(slfyNode, delay) {
      setTimeout(function() {
        
        var escapedContent = slfyNode.content.replace(/(\\p)/gi, "");
        var parent = slfyNode.parent;
        
        //$(slfyNode.attributes.contentSelector).append(escapedContent);
        //$(slfyNode.parent).append(escapedContent);
        //var jQueryObj = jQuery(slfyNode.parent)[0];
        //var jQueryObj = $("body").find(slfyNode.parent)[0];
        //jQueryObj.append(escapedContent);
        
        // TODO: We need to a way to uniquely identify nodes that are added
        // TODO: The nodes that are appended are NOT the same nodes in the tree.
        // TODO: THEY ARE A DEEP CLONE.  We need a way to find the parent clone.
        // TODO: Probably, by adding a unique class upon insert or similar.
        // TODO: data-slfy-node="1234567"
        
        onSlfyAppend = new CustomEvent("onSlfyAppend");
        document.dispatchEvent(onSlfyAppend);
        
      }, delay)
    })(slfyNode, appendDelay);
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
