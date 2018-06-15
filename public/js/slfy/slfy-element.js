"use strict";
var NodeType;
(function (NodeType) {
    NodeType[NodeType["ELEMENT"] = 1] = "ELEMENT";
    NodeType[NodeType["ATTRIBUTE"] = 2] = "ATTRIBUTE";
    NodeType[NodeType["TEXT"] = 3] = "TEXT";
    NodeType[NodeType["COMMENT"] = 8] = "COMMENT";
})(NodeType || (NodeType = {}));
class SlfyElement {
    constructor(element) {
        this.element = null;
        this.Element = element;
    }
    get Element() {
        return this.element;
    }
    set Element(element) {
        this.element = element;
    }
    get NodeType() {
        return this.element.nodeType;
    }
    get TextContent() {
        return this.Element.textContent;
    }
    set TextContent(text) {
        this.Element.textContent = text;
    }
    get EscapedTextContent() {
        return this.TextContent.replace(SlfyElement.HTML_ENTITIES_REGEX, (entity) => {
            return SlfyElement.htmlEntities.get(entity);
        });
    }
    get InnerHtml() {
        return this.Element.innerHTML;
    }
    get OuterHtml() {
        return this.Element.outerHTML;
    }
    get StartTag() {
        return this.OuterHtml.split(this.InnerHtml)[0].trim();
    }
    get EmptyTag() {
        return this.StartTag.replace(SlfyElement.CLOSE_START_TAG_REGEX, "/>");
    }
    get Children() {
        return this.Element.children;
    }
    get ChildNodes() {
        return this.Element.childNodes;
    }
    getAttribute(name) {
        return this.Element.getAttribute(name);
    }
    setAttribute(name, value) {
        return this.Element.setAttribute(name, value);
    }
}
SlfyElement.CLOSE_START_TAG_REGEX = /(?=.*)>$/gi;
SlfyElement.HTML_ENTITIES_REGEX = /[&<>"'\n]/g;
SlfyElement.htmlEntities = new Map([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ["\"", "&quot;"],
    ["'", "&#039"],
    ["\n", "<br>"]
]);
//# sourceMappingURL=slfy-element.js.map