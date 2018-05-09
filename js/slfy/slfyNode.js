function SlfyNode(node, content, parent, attributes) {
  "use strict";
  
  const self = this;
  
  this.node = node;
  this.content = content;
  this.parent = parent;
  this.attributes = attributes;
}

function SlfyNodeTree(node) {
  "use strict";
  
  this.attributes = new Attributes();
  
  const self = this;
  
  var getStartTag = function getStartTag(node) {
    
    return node.outerHTML.split(node.innerHTML)[0].trim();
  }
  
  var getContent = function getContent(node) {
    
    return node.textContent.trim();
  }
  
  var closeStartTag = function closeStartTag(tag) {
    
    return tag.replace(/(?=.*)>$/gi, "/>");
  }
  
  var createTree = function createTree(node) {
    
    const ELEMENT_NODE_TYPE = 1;
    const TEXT_NODE_TYPE = 3;
    
    var nodes = [];
    
    var parent = null;
    var content = "";
    var attribs = null;
    
    if (node.nodeType === ELEMENT_NODE_TYPE) {
      
      parent = node.parentNode;
      attribs = self.attributes.get(node);
      
      if (node.childNodes.length === 1 &&
          node.childNodes[0].nodeType !== ELEMENT_NODE_TYPE) {
       
        content = node.outerHTML;
        
        nodes.push(new SlfyNode(node, content, parent, attribs));
      }
      else {
        content = closeStartTag(getStartTag(node));
        parent = node.parentNode;
        
        nodes.push(new SlfyNode(node, content, parent, attribs));
        
        for (let n of node.childNodes) {
          nodes = nodes.concat(createTree(n));
        }
      }
      
    }
    else if (node.nodeType === TEXT_NODE_TYPE) {
      
      parent = node.parentNode;
      content = node.textContent.trim();
      attribs = self.attributes.get(node.parentNode);
      
      nodes.push(new SlfyNode(node, content, parent, attribs));
    }
    
    return nodes;
  }
  
  return createTree(node);
}