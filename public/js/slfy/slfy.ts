
class Slfy {

  private static readonly SLFY_DATA_ID: string = "slfy-data";

  private parseNodes(text: string) {

    return new DOMParser()
      .parseFromString(text, "text/xml")
      .getElementById(Slfy.SLFY_DATA_ID)
      .children;
  }

  private initialize(url: string) {

    $.ajax({
      type: "GET",
      url: url,
      dataType: "text",
      success: function(data) {
        htmlNodes = this.parseNodes(data);
      }
    });
  }
}