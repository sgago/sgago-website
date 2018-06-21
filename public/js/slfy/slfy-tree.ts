
class SlfyTree {

  element: Element = null;
  root: Element = null;

  tree: Array<ISlfyNode> = new Array<ISlfyNode>();

  private get Element(): Element {

    return this.element;
  }

  private set Element(node: Element) {

    this.element = node;
  }

  private get Root(): Element {

    return this.root;
  }

  private set Root(parent: Element) {

    this.root = parent;
  }

  public get Tree(): Array<ISlfyNode>  {

    return this.tree;
  }

  public set Tree(parent: Array<ISlfyNode>) {

    this.tree = parent;
  }

  constructor (element: Element, root: Element) {

    this.Element = element;
    this.Root = root;

    this.Tree = this.createTree(this.Element, this.Root);
  }


  private createTree(element: Element, parent: Element): Array<ISlfyNode> {

    let tree: Array<ISlfyNode> = new Array<ISlfyNode>();
    let childNode: ISlfyNode = null;

    for (let child of element.childNodes) {

      // Is the root element an Element type?
      if (child.nodeType === Node.ELEMENT_NODE) {
        
        childNode = new SlfyNode(
          child,
          parent,
          new SlfyNodeAttributes(child as Element)
        );

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

            tree.concat(
              this.createTree(
                n,
                childNode.Element
              )
            );
          }
        }

      }
      // Is the root node of type text?
      else if (child.nodeType === Node.TEXT_NODE) {

        // This node is of type text

        childNode = new SlfyNode(
          child,
          parent,
          new SlfyNodeAttributes(parent)
        );

        childNode.SlfyContent = childNode.TextContent.trim();
        childNode.SlfyContent = childNode.EscapedTextContent;

        tree.push(childNode);
      }
    }

    return tree;
  }

}
