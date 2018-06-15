

interface ISlfyNode {

  Node: ISlfyElement;
  Parent: ISlfyElement;
  Content: string;
  Attributes: ISlfyNodeAttributes;
}

/**
 * Represents a node in a tree structure.
 * This node includes the HTML element DOM node,
 * a parent DOM node, HTML content,
 * and Slfy attributes.
 */
class SlfyNode implements ISlfyNode
{
  private static counter: number = 0;

  private node: ISlfyElement;
  private parent: ISlfyElement;
  private content: string;
  private attributes: ISlfyNodeAttributes;

  /**
   * Gets the Element DOM node for this SlfyNode instance.
   */
  public get Node(): ISlfyElement {

    return this.node;
  }

  /**
   * Sets the Element DOM node for this SlfyNode instance.
   */
  public set Node(node: ISlfyElement) {

    this.node = node;
  }

  /**
   * Gets the parent Element DOM node for this SlfyNode instance.
   * Note that this parent is not necessarily the same parent as the
   * this.Node.parent.  This occurs when this content is being
   * put into a separate parent element.
   */
  public get Parent(): ISlfyElement {
    
    return this.parent;
  }

  /**
   * Sets the parent Element DOM node for this SlfyNode instance.
   * Note that this parent is not necessarily the same parent as the
   * this.Node.parent.  This occurs when this content is being
   * put into a separate parent element.
   */
  public set Parent(parent: ISlfyElement) {

    this.parent = parent;
  }

  /**
   * Gets the text content for this SlfyNode instance.
   * Note that this text content is not necessarily the same as
   * this.Node.innerText or this.Node.innerHTML.  This occurs
   * when content is being escaped by Slfy.
   */
  public get Content(): string {

    return this.content;
  }

  /**
   * Sets the text content for this SlfyNode instance.
   * Note that this text content is not necessarily the same as
   * this.Node.innerText or this.Node.innerHTML.  This occurs
   * when content is being escaped by Slfy.
   */
  public set Content(content: string) {

    this.content = content;
  }

  /**
   * Gets the SlfyAttributes for this SlfyNode instance.
   */
  public get Attributes(): ISlfyNodeAttributes {

    return this.attributes;
  }

  /**
   * Sets the SlfyAttributes for this SlfyNode instance.
   */
  public set Attributes(attributes: ISlfyNodeAttributes) {

    this.attributes = attributes;
  }

  /**
   * Instantiates a new instance of a SlfyNode.
   * @param node 
   * @param parent 
   * @param content 
   * @param attributes 
   */
  constructor (node: ISlfyElement, parent: ISlfyElement,
      content: string, attributes: ISlfyNodeAttributes) {

    // Set dependencies
    this.Node = node;
    this.Parent = parent;
    this.Content = content;
    this.Attributes = attributes;

    this.Node.setAttribute("data-slfy-node-id", SlfyNode.counter.toString());
    SlfyNode.counter++;
  }
}