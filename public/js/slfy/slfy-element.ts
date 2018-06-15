
enum NodeType {
  ELEMENT = 1,
  ATTRIBUTE = 2,
  TEXT = 3,
  COMMENT = 8
}

interface ISlfyElement {

  Element: Element;

  TextContent: string;
  EscapedTextContent: string;
  InnerHtml: string;
  OuterHtml: string;
  StartTag: string;
  EmptyTag: string;

  NodeType: number;

  Children: HTMLCollection;
  ChildNodes: NodeListOf<Node & ChildNode>;

  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string;
}

class SlfyElement implements ISlfyElement {

  private static readonly CLOSE_START_TAG_REGEX = /(?=.*)>$/gi;
  private static readonly HTML_ENTITIES_REGEX = /[&<>"'\n]/g;

  private static readonly htmlEntities = new Map([
    ["&", "&amp;"],
    ["<", "&lt;"],
    [">", "&gt;"],
    ["\"", "&quot;"],
    ["'", "&#039"],
    ["\n", "<br>"]
  ]);

  private element: Element = null;

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

    return this.TextContent.replace(
      SlfyElement.HTML_ENTITIES_REGEX,
      (entity: string): string =>
        {
          return SlfyElement.htmlEntities.get(entity);
        }
    );
  }

  public get InnerHtml(): string {

    return this.Element.innerHTML;
  }

  public get OuterHtml(): string {

    return this.Element.outerHTML;
  }

  public get StartTag(): string {

    return this.OuterHtml.split(this.InnerHtml)[0].trim();
  }

  public get EmptyTag(): string {

    return this.StartTag.replace(SlfyElement.CLOSE_START_TAG_REGEX, "/>");
  }

  public get Children(): HTMLCollection {

    return this.Element.children;
  }

  public get ChildNodes(): NodeListOf<Node & ChildNode> {

    return this.Element.childNodes;
  }

  constructor (element: Element) {

    this.Element = element;
  }

  public getAttribute(name: string): string {

    return this.Element.getAttribute(name);
  }

  public setAttribute(name: string, value: string) {

    return this.Element.setAttribute(name, value);
  }
}