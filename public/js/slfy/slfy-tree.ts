
class SlfyTree {

  node: ISlfyElement = null;
  parent: ISlfyElement = null;

  tree: Array<ISlfyNode> = new Array<ISlfyNode>();

  private get Node(): ISlfyElement {

    return this.node;
  }

  private set Node(node: ISlfyElement) {

    this.node = node;
  }

  private get Parent(): ISlfyElement {

    return this.parent;
  }

  private set Parent(parent: ISlfyElement) {

    this.parent = parent;
  }

  private get Tree(): Array<ISlfyNode>  {

    return this.tree;
  }

  private set Tree(parent: Array<ISlfyNode>) {

    this.tree = parent;
  }

  constructor (node: ISlfyElement, parent: ISlfyElement) {

    this.Node = node;
    this.Parent = parent;

    this.Tree = this.createTree(node, parent);
  }


  private createTree(root: ISlfyElement, parent: ISlfyElement): Array<ISlfyNode> {

    let tree: Array<ISlfyNode> = new Array<ISlfyNode>();

    let children: HTMLCollection = root.Children;
    let attributes: ISlfyNodeAttributes = null;
    let content: string = "";

    for (let child of children) {

      // Is the root element an Element type?
      if (child.nodeType === Node.ELEMENT_NODE) {
        
        // root is of element type.
        // Grab its attributes
        attributes = new SlfyNodeAttributes(child);
        
        // Does root contain only one child?
        // And, is that child a non-element node?
        if (root.ChildNodes.length === 1 &&
          root.ChildNodes[0].nodeType !== Node.ELEMENT_NODE) {
        
          // Root contains 1 node that is a non-element
          content = root.OuterHtml;
          
          // Add this node to our tree
          // This is a leaf, so we're done, no recursion
          tree.push(new SlfyNode(
            new SlfyElement(child),
            parent,
            content,
            attributes
          ));
        }
        else {

          // Root contains more than one type of node
          // Let's grab and close the start
          content = root.EmptyTag;
          
          // Push that newly closed start tag onto our tree
          tree.push(new SlfyNode(
            new SlfyElement(child),
            parent,
            content,
            attributes
          ));

          // Let's recursively add each of those tags to our
          // our tree as well
          for (let n of root.Children) {

            tree.concat(
              this.createTree(new SlfyElement(n),
              new SlfyElement(child))
            );
          }
        }

      }
      // Is the root node of type text?
      else if (root.NodeType === Node.TEXT_NODE) {
        
        parent = new SlfyElement(child.parentElement);
        content = root.TextContent.trim();
        attributes = new SlfyNodeAttributes(child.parentElement);
        
        tree.push(new SlfyNode(
          new SlfyElement(child),
          parent,
          content,
          attributes
        ));
      }
    }

    return tree;
  }

}
