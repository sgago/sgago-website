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
  
  this.attributes = new Attributes();
  
  /*
    TREE MODE IDEA (DESCENDANT MODE?)!
    Automagically starts at the top of a given element, use
      $('#id_of_an_element').find('*').somethingsomething
    to print elements by hierarchy.
  */
  
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
  
  
  var getNodeTree = function getNodeTree(parentNode, node) {
    
    const ELEMENT_NODE_TYPE = 3;
    var nodes = [];
    var childNodes = [];
    
    // Is the node an element?
    if (node.nodeType === ELEMENT_NODE_TYPE) {
      
      // The node is an element, push the node and it's parent onto the results
      nodes.push([parentNode, node]);
    }
    
    // Then, for each child nodes of node...
    for (let childNode of node.childNodes) {
      
      // Is the child node of type element?
      if (childNode.nodeType === ELEMENT_NODE_TYPE) {
        
        // The child node is an element, use recursion to parse it's nodes
        childNodes = getNodeTree(childNode.parentNode, childNode);
        
        // Add the child nodes to the results
        nodes = nodes.concat(childNodes);
      }
      else {
        
        // Child node is not an element, slap it onto the results
        nodes.push([childNode.parentNode, childNode]);
      }
      
    }
    
    return nodes;
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
        attribs = null,
        nodeTree = null;
    
    for (let node of nodes) {
      
      attribs = self.attributes.get(node);

      if (!attribs.ignore) {

        if (attribs.mode === "tree") {
          
          nodeTree = getNodeTree(null, node);
          runSlfyNodeTree(nodeTree);
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
          
    if (!attribs.ignore) {

      content = getHtml(node);

      if (!attribs.verbose) {
        content = removeSlfyAttributes(content);
      }

      if (attribs.runType) {
        self.type(content,
                  attribs.typeSelector,
                  delay += attribs.typeDelay,
                  attribs.keyStrokeDelay);
      }

      if (attribs.runRemove) {
        self.remove(content,
                    attribs.typeSelector,
                    delay += attribs.removeDelay);
      }

      if (attribs.runInsert) {
        self.append(content,
                    attribs.contentSelector,
                    delay += attribs.insertDelay);
      }
    }
  }
  
  
  
  var runSlfyNodeTree = function runSlfyNodeTree(nodeTree) {
    
    const ELEMENT_NODE_TYPE = 1;
    var content = null;
    var attribs = null;
    var topNodeAttribs = self.attributes.get(nodeTree[0][0]);
    
    if (!topNodeAttribs.ignore) {
      
      for (let n of nodeTree) {
        
        if (n[1].nodeType === ELEMENT_NODE_TYPE) {
          attribs = self.attributes.get(n[1]);
          content = getStartTag(n[1]);
          content = closeStartTag(content);
          
          if (!attribs.verbose) {
            content = removeSlfyAttributes(content);
          }
        }
        else {
          attribs = self.attributes.get(n[0]);
          content = n[1].data;
        }

        if (attribs.runType) {
          self.type(content,
                    attribs.typeSelector,
                    delay += attribs.typeDelay,
                    attribs.keyStrokeDelay);
        }

        if (attribs.runRemove) {
          self.remove(content,
                      attribs.typeSelector,
                      delay += attribs.removeDelay);
        }

        if (attribs.runInsert) {
          self.append(content,
                      attribs.contentSelector,
                      delay += attribs.insertDelay);
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
    var j = 0;
    
    var regex = /(\n)|(\\p)/gi;
    var result = regex[Symbol.split](content);
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
          
          (function(str) {
              setTimeout(function() {

                $(selector)[0].innerHTML += str;
              }, delay += keyStrokeDelay)
          })(insert);
        }
        else {

          // For each character in the string...
          for (i = 0; i < result[j].length; i++) {

            (function(stringNum, charIndex) {
              setTimeout(function() {

                $(selector)[0].innerHTML += result[stringNum][charIndex];

                onSlfyType = new CustomEvent("onSlfyType");
                document.dispatchEvent(onSlfyType);

              }, delay += keyStrokeDelay)
            })(j, i);
          }
        }
        
        
      }
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
  
  /*
   * SUMMARY
   * TODO: Write a comment here
   */
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
