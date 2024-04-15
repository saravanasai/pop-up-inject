class UCM {
  constructor(config) {
    this.configuration = config;
    this.ifrm = document.createElement("iframe");
  }

  init() {
    if (!this.validateConfiguration()) {
      return;
    }
    this.prepareFrame(this.configuration.top, this.configuration.left);
    return this;
  }

  validateConfiguration() {
    let isvalid = true;
    if (!(this.configuration.top && this.configuration.left)) {
      isvalid = false;
      console.error("Postion for popup is missing");
    }

    if (!this.configuration.token) {
      isvalid = false;
      console.error("Token is missing");
    }

    return isvalid;
  }

  prepareFrame(top, left) {
    this.ifrm.setAttribute("src", "http://app-switcher.test/");
    this.ifrm.setAttribute("allowfullscreen", true);
    this.ifrm.setAttribute("allow", "fullscreen");
    this.ifrm.setAttribute("allowtransparency", true);
    this.ifrm.setAttribute("scrolling", "no");
    this.ifrm.style.width = "419px";
    this.ifrm.style.height = "475px";
    this.ifrm.style.position = "absolute";
    this.ifrm.style.top = top + "px";
    this.ifrm.style.left = left + "px";
    this.ifrm.style.borderWidth = "0px";
    document.body.appendChild(this.ifrm);
  }

  show() {
    this.handleMessage("show");
  }
  hide() {
    this.handleMessage("hide");
  }

  handleMessage(action) {
    this.ifrm.contentWindow.postMessage({ action }, "*");
  }
}
