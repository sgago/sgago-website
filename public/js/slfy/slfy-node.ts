
enum NodeType {
  ELEMENT = 1,
  ATTRIBUTE = 2,
  TEXT = 3,
  COMMENT = 8
}

interface ISlfyNode {

  Children: HTMLCollection;
  ChildNodes: NodeListOf<Node & ChildNode>;

  Element: Element;
  EmptyTag: string;
  NodeType: NodeType;
  SlfyParent: Element;
  SlfyAttributes: ISlfyNodeAttributes;
  SlfyContent: string;
  Escape(text: string): string;
  TextContent: string;
  EscapedTextContent: string;
  InnerHtml: string;
  EscapedInnerHtml: string;
  OuterHtml: string;
  EscapedOuterHtml: string;
}

/**
 * Represents a node in a tree structure.
 * This node includes the HTML element DOM node,
 * a parent DOM node, HTML content,
 * and Slfy attributes.
 */
class SlfyNode implements ISlfyNode
{
  private static readonly CLOSE_START_TAG_REGEX = /(?=.*)>$/gi;
  private static readonly HTML_ENTITIES_REGEX = /[&<>"'\n]/g;

  private static readonly HTML_ENTITIES = new Map([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ["\"", "&quot;"],
    ["'", "&#039"],
    ["\n", "<br>"]
  ]);

  private static counter: number = 0;

  private element: Element = null;
  private slfyParent: Element = null;
  private slfyContent: string = null;
  private attributes: ISlfyNodeAttributes;

  public get Element(): Element {

    return this.element;
  }

  public set Element(element: Element) {

    this.element = element;
  }

  public get NodeType(): number {

    return this.element.nodeType;
  }
  
  public get TextContent(): string {

    return this.Element.textContent;
  }

  public set TextContent(text: string) {

    this.Element.textContent = text;
  }

  public get EscapedTextContent(): string {

    return this.Escape(this.TextContent);
  }

  public get SlfyContent(): string {

    return this.slfyContent;
  }

  public set SlfyContent(text: string) {

    this.slfyContent = text;
  }

  public get InnerHtml(): string {

    return this.Element.innerHTML;
  }

  public get EscapedInnerHtml(): string {

    return this.Escape(this.InnerHtml);
  }

  public get OuterHtml(): string {

    return this.Element.outerHTML;
  }

  public get EscapedOuterHtml(): string {

    return this.Escape(this.OuterHtml);
  }

  public get StartTag(): string {

    return this.OuterHtml.split(this.InnerHtml)[0].trim();
  }

  public get EmptyTag(): string {

    return this.StartTag.replace(SlfyNode.CLOSE_START_TAG_REGEX, "/>");
  }

  public get Children(): HTMLCollection {

    return this.Element.children;
  }

  public get ChildNodes(): NodeListOf<Node & ChildNode> {

    return this.Element.childNodes;
  }

  /**
   * Gets the parent Element DOM node for this SlfyNode instance.
   * Note that this parent is not necessarily the same parent as the
   * this.Node.parent.  This occurs when this content is being
   * put into a separate parent element.
   */
  public get SlfyParent(): Element {
    
    return this.slfyParent;
  }

  /**
   * Sets the parent Element DOM node for this SlfyNode instance.
   * Note that this parent is not necessarily the same parent as the
   * this.Node.parent.  This occurs when this content is being
   * put into a separate parent element.
   */
  public set SlfyParent(slfyParent: Element) {

    this.slfyParent = slfyParent;
  }

  /**
   * Gets the SlfyAttributes for this SlfyNode instance.
   */
  public get SlfyAttributes(): ISlfyNodeAttributes {

    return this.attributes;
  }

  /**
   * Sets the SlfyAttributes for this SlfyNode instance.
   */
  public set SlfyAttributes(attributes: ISlfyNodeAttributes) {

    this.attributes = attributes;
  }

  /**
   * Instantiates a new instance of a SlfyNode.
   */
  constructor (element: Node, slfyParent: Node, slfyAttributes: ISlfyNodeAttributes) {

    // Set dependencies
    this.Element = element as Element;
    this.SlfyParent = slfyParent as Element;
    this.SlfyAttributes = slfyAttributes;

    if (this.Element.nodeType === Node.ELEMENT_NODE)
      this.Element.setAttribute("data-slfy-node-id", SlfyNode.counter.toString());
    SlfyNode.counter++;
  }

  // FIXME: This should be accessible by all
  public Escape(text: string): string {

    return text.replace(
      SlfyNode.HTML_ENTITIES_REGEX,
      (entity: string): string =>
        {
          return SlfyNode.HTML_ENTITIES.get(entity);
        }
    );
  }

  public GetAttribute(name: string): string {

    return this.Element.getAttribute(name);
  }

  public SetAttribute(name: string, value: string) {

    return this.Element.setAttribute(name, value);
  }
}