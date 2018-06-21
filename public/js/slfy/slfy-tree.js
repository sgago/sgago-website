"use strict";
class SlfyTree {
    constructor(element, root) {
        this.element = null;
        this.root = null;
        this.tree = new Array();
        this.Element = element;
        this.Root = root;
        this.Tree = this.createTree(this.Element, this.Root);
    }
    get Element() {
        return this.element;
    }
    set Element(node) {
        this.element = node;
    }
    get Root() {
        return this.root;
    }
    set Root(parent) {
        this.root = parent;
    }
    get Tree() {
        return this.tree;
    }
    set Tree(parent) {
        this.tree = parent;
    }
    createTree(element, parent) {
        let tree = new Array();
        let childNode = null;
        for (let child of element.childNodes) {
            // Is the root element an Element type?
            if (child.nodeType === Node.ELEMENT_NODE) {
                childNode = new SlfyNode(child, parent, new SlfyNodeAttributes(child));
                // Ok, childNode is of type element.
                // Does childNode have any children of its own?
                // And, if childNode does have children, is that child a non-element node?
                if (childNode.ChildNodes.length === 1 &&
                    childNode.ChildNodes[0].nodeType !== Node.ELEMENT_NODE) {
                    childNode.SlfyContent = childNode.OuterHtml;
                    // Add this node to our tree
                    // This is a leaf, so we're done, no recursion
                    tree.push(childNode);
                }
                else {
                    // Root contains more than one type of node
                    // Let's grab and close the start
                    childNode.SlfyContent = childNode.EmptyTag;
                    // Push that newly closed start tag onto our tree
                    tree.push(childNode);
                    // Let's recursively add each of those tags to our
                    // our tree as well
                    for (let n of childNode.Children) {
                        tree.concat(this.createTree(n, childNode.Element));
                    }
                }
            }
            // Is the root node of type text?
            else if (child.nodeType === Node.TEXT_NODE) {
                // This node is of type text
                childNode = new SlfyNode(child, parent, new SlfyNodeAttributes(parent));
                childNode.SlfyContent = childNode.TextContent.trim();
                childNode.SlfyContent = childNode.EscapedTextContent;
                tree.push(childNode);
            }
        }
        return tree;
    }
}
//# sourceMappingURL=slfy-tree.js.map