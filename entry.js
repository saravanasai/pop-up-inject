class UCM {
  constructor(config) {
    this.configuration = config;
    this.ifrm = document.createElement("iframe");
    this.container = document.createElement("div");
    this.css =
      ".app-swicther-popup{z-index: 100000000 !important;}.show {display: block;}.hide {display: none;}";
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
    const styleEl = document.createElement("style");
    styleEl.append(this.css);
    this.ifrm.setAttribute("src", "http://app-switcher.test/");
    this.ifrm.setAttribute("allowfullscreen", true);
    this.ifrm.setAttribute("allow", "fullscreen");
    this.ifrm.setAttribute("allowtransparency", true);
    this.ifrm.setAttribute("scrolling", "no");
    this.ifrm.style.width = "425px";
    this.ifrm.style.height = "500px";
    this.ifrm.style.position = "absolute";
    this.ifrm.style.top = top + "px";
    this.ifrm.style.left = left + "px";
    this.ifrm.style.borderWidth = "0px";
    this.ifrm.setAttribute("class", "app-swicther-popup hide");
    this.container.appendChild(this.ifrm);
    document.body.appendChild(this.container);
  }

  show() {
    this.ifrm.classList.remove("hide");
    this.ifrm.classList.add("show");
    this.handleMessage("show");
  }
  hide() {
    this.ifrm.classList.remove("show");
    this.ifrm.classList.add("hide");
    this.handleMessage("hide");
  }

  handleMessage(action) {
    this.ifrm.contentWindow.postMessage({ action }, "*");
  }
}
