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
     * @param node
     * @param parent
     * @param content
     * @param attributes
     */
    constructor(node, parent, content, attributes) {
        // Set dependencies
        this.Node = node;
        this.Parent = parent;
        this.Content = content;
        this.Attributes = attributes;
        this.Node.setAttribute("data-slfy-node-id", SlfyNode.counter.toString());
        SlfyNode.counter++;
    }
    /**
     * Gets the Element DOM node for this SlfyNode instance.
     */
    get Node() {
        return this.node;
    }
    /**
     * Sets the Element DOM node for this SlfyNode instance.
     */
    set Node(node) {
        this.node = node;
    }
    /**
     * Gets the parent Element DOM node for this SlfyNode instance.
     * Note that this parent is not necessarily the same parent as the
     * this.Node.parent.  This occurs when this content is being
     * put into a separate parent element.
     */
    get Parent() {
        return this.parent;
    }
    /**
     * Sets the parent Element DOM node for this SlfyNode instance.
     * Note that this parent is not necessarily the same parent as the
     * this.Node.parent.  This occurs when this content is being
     * put into a separate parent element.
     */
    set Parent(parent) {
        this.parent = parent;
    }
    /**
     * Gets the text content for this SlfyNode instance.
     * Note that this text content is not necessarily the same as
     * this.Node.innerText or this.Node.innerHTML.  This occurs
     * when content is being escaped by Slfy.
     */
    get Content() {
        return this.content;
    }
    /**
     * Sets the text content for this SlfyNode instance.
     * Note that this text content is not necessarily the same as
     * this.Node.innerText or this.Node.innerHTML.  This occurs
     * when content is being escaped by Slfy.
     */
    set Content(content) {
        this.content = content;
    }
    /**
     * Gets the SlfyAttributes for this SlfyNode instance.
     */
    get Attributes() {
        return this.attributes;
    }
    /**
     * Sets the SlfyAttributes for this SlfyNode instance.
     */
    set Attributes(attributes) {
        this.attributes = attributes;
    }
}
SlfyNode.counter = 0;
//# sourceMappingURL=slfy-node.js.map