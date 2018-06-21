enum Mode {
  Normal = "NORMAL",
  Tree = "TREE"
};

interface ISlfyNodeAttributes {
  
  Mode: Mode;

  ContentSelector: string;
  TypingSelector: string;

  RunTyping: boolean;
  RunRemove: boolean;
  RunInsert: boolean;
  Ignore: boolean;
  IsVerbose: boolean;

  StartDelay: number;
  KeyStrokeDelay: number;
  RemoveDelay: number;
  InsertDelay: number;
}

class SlfyNodeAttributes implements ISlfyNodeAttributes {

  // Attribute name constants
  private static readonly MODE_ATTRIBUTE:             string = "data-slfy-mode";
  private static readonly CONTENT_SELECTOR_ATTRIBUTE: string = "data-slfy-content-selector";
  private static readonly TYPING_SELECTOR_ATTRIBUTE:  string = "data-slfy-typing-selector";
  private static readonly RUN_TYPING_ATTRIBUTE:       string = "data-slfy-type";
  private static readonly RUN_REMOVE_ATTRIBUTE:       string = "data-slfy-remove";
  private static readonly RUN_INSERT_ATTRIBUTE:       string = "data-slfy-insert";
  private static readonly IGNORE_ATTRIBUTE:           string = "data-slfy-ignore";
  private static readonly VERBOSITY_ATTRIBUTE:        string = "data-slfy-verbose";

  private static readonly START_DELAY_ATTRIBUTE:      string = "data-slfy-start-delay";
  private static readonly KEY_STROKE_DELAY_ATTRIBUTE: string = "data-slfy-key-stroke-delay";
  private static readonly REMOVE_DELAY_ATTRIBUTE:     string = "data-slfy-remove-delay";
  private static readonly INSERT_DELAY_ATTRIBUTE:     string = "data-slfy-insert-delay";

  // Default attribute constants
  private static readonly DEFAULT_MODE:             Mode = Mode.Normal;
  private static readonly DEFAULT_CONTENT_SELECTOR: string = "body";
  private static readonly DEFAULT_TYPING_SELECTOR:  string = "body";

  private static readonly DEFAULT_RUN_TYPING: boolean = true;
  private static readonly DEFAULT_RUN_REMOVE: boolean = true;
  private static readonly DEFAULT_RUN_INSERT: boolean = true;
  private static readonly DEFAULT_IGNORE:     boolean = false;
  private static readonly DEFAULT_VERBOSITY:  boolean = false;

  private static readonly DEFAULT_START_DELAY:      number = 1000;
  private static readonly DEFAULT_KEY_STROKE_DELAY: number = 40;
  private static readonly DEFAULT_REMOVE_DELAY:     number = 40;
  private static readonly DEFAULT_INSERT_DELAY:     number = 0;


  private element: Element = null;

  private get Element(): Element {

    return this.element;
  }

  private set Element(node: Element) {

    this.element = node;
  }

  private getBooleanAttributeValue(name: string, defaultValue: boolean): boolean {

    let value: boolean = defaultValue;
    
    if (this.Element.getAttribute(name) !== null) {
      value = true;
    }

    return value;
  }

  private getStringAttributeValue(name: string, defaultValue: string): string {

    let value: string = this.Element.getAttribute(name);;

    if (value === null) {
      value = defaultValue;
    }

    return value;
  }

  private getNumberAttributeValue(name: string, defaultValue: number): number {
    
    return Number.parseInt(this.getStringAttributeValue(name, defaultValue.toString()));
  }

  public get Mode(): Mode {

    let mode: Mode = Mode.Normal;

    let value: string = this.getStringAttributeValue(
      SlfyNodeAttributes.MODE_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_MODE.toString()
    );

    if (value.toLowerCase() === "tree") {
      mode = Mode.Tree;
    }

    return mode;
  }

  public get ContentSelector(): string {

    return this.getStringAttributeValue(
      SlfyNodeAttributes.CONTENT_SELECTOR_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_CONTENT_SELECTOR
    );
  }

  public get TypingSelector(): string {

    return this.getStringAttributeValue(
      SlfyNodeAttributes.TYPING_SELECTOR_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_TYPING_SELECTOR
    );
  }

  public get RunTyping(): boolean {

    return this.getBooleanAttributeValue(
      SlfyNodeAttributes.RUN_TYPING_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_RUN_TYPING);
  }

  public get RunRemove(): boolean {

    return this.getBooleanAttributeValue(
      SlfyNodeAttributes.RUN_REMOVE_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_RUN_REMOVE);
  }

  public get RunInsert(): boolean {

    return this.getBooleanAttributeValue(
      SlfyNodeAttributes.RUN_INSERT_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_RUN_INSERT);
  }

  public get IsVerbose(): boolean {

    return this.getBooleanAttributeValue(
      SlfyNodeAttributes.VERBOSITY_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_VERBOSITY
    );
  }

  public get Ignore(): boolean {

    return this.getBooleanAttributeValue(
      SlfyNodeAttributes.IGNORE_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_IGNORE);
  }

  public get StartDelay(): number {

    return this.getNumberAttributeValue(
      SlfyNodeAttributes.START_DELAY_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_START_DELAY
    );
  }

  public get KeyStrokeDelay(): number {

    return this.getNumberAttributeValue(
      SlfyNodeAttributes.KEY_STROKE_DELAY_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_KEY_STROKE_DELAY
    );
  }

  public get RemoveDelay(): number {

    return this.getNumberAttributeValue(
      SlfyNodeAttributes.REMOVE_DELAY_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_REMOVE_DELAY
    );
  }

  public get InsertDelay(): number {

    return this.getNumberAttributeValue(
      SlfyNodeAttributes.INSERT_DELAY_ATTRIBUTE,
      SlfyNodeAttributes.DEFAULT_INSERT_DELAY
    );
  }
  
  constructor(element: Element) {

    this.Element = element;
  }
}