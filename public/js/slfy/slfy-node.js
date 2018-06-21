"use strict";
/**
 * Represents a node in a tree structure.
 * This node includes the HTML element DOM node,
 * a parent DOM node, HTML content,
 * and Slfy attributes.
 */
class SlfyNode {
    /**
     * Instantiates a new instance of a SlfyNode.
     */
    constructor(element, slfyParent, slfyAttributes) {
        this.element = null;
        this.slfyParent = null;
        this.slfyContent = null;
        // Set dependencies
        this.Element = element;
        this.SlfyParent = slfyParent;
        this.SlfyAttributes = slfyAttributes;
        if (this.Element.nodeType === Node.ELEMENT_NODE)
            this.Element.setAttribute("data-slfy-node-id", SlfyNode.counter.toString());
        SlfyNode.counter++;
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
    get SlfyContent() {
        return this.slfyContent;
    }
    set SlfyContent(text) {
        this.slfyContent = text;
    }
    get EscapedTextContent() {
        return this.TextContent.replace(SlfyNode.HTML_ENTITIES_REGEX, (entity) => {
            return SlfyNode.htmlEntities.get(entity);
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
        return this.StartTag.replace(SlfyNode.CLOSE_START_TAG_REGEX, "/>");
    }
    get Children() {
        return this.Element.children;
    }
    get ChildNodes() {
        return this.Element.childNodes;
    }
    /**
     * Gets the parent Element DOM node for this SlfyNode instance.
     * Note that this parent is not necessarily the same parent as the
     * this.Node.parent.  This occurs when this content is being
     * put into a separate parent element.
     */
    get SlfyParent() {
        return this.slfyParent;
    }
    /**
     * Sets the parent Element DOM node for this SlfyNode instance.
     * Note that this parent is not necessarily the same parent as the
     * this.Node.parent.  This occurs when this content is being
     * put into a separate parent element.
     */
    set SlfyParent(slfyParent) {
        this.slfyParent = slfyParent;
    }
    /**
     * Gets the SlfyAttributes for this SlfyNode instance.
     */
    get SlfyAttributes() {
        return this.attributes;
    }
    /**
     * Sets the SlfyAttributes for this SlfyNode instance.
     */
    set SlfyAttributes(attributes) {
        this.attributes = attributes;
    }
    getAttribute(name) {
        return this.Element.getAttribute(name);
    }
    setAttribute(name, value) {
        return this.Element.setAttribute(name, value);
    }
}
SlfyNode.CLOSE_START_TAG_REGEX = /(?=.*)>$/gi;
SlfyNode.HTML_ENTITIES_REGEX = /[&<>"'\n]/g;
SlfyNode.htmlEntities = new Map([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ["\"", "&quot;"],
    ["'", "&#039"],
    ["\n", "<br>"]
]);
SlfyNode.counter = 0;
//# sourceMappingURL=slfy-node.js.map