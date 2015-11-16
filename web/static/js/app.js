import {Socket, LongPoller} from "phoenix"

class App {

  static init(){
    var socket = new Phoenix.Socket("ws://" + location.host + "/socket");

    let username = this.randomUsername(20);
    let self = this;
    this.self = self;
    this.username = username;

    socket.connect({user_id: username})
    var $username  = $("#username")
    let $canvasBody = $("#canvas_body");
    let $clearModel = $("#clear_model");

    // set the generated username
    $username.val(username);
    this.username = $username;

    socket.onOpen( ev => console.log("OPEN", ev) )
    socket.onError( ev => console.log("ERROR", ev) )
    socket.onClose( e => console.log("CLOSE", e))

    var chan = socket.channel("box_model:1", {user: username})
    chan.join().receive("ignore", () => console.log("auth error"))
               .receive("ok", () => console.log("join ok"))
               .after(10000, () => console.log("Connection interruption"))
    chan.onError(e => console.log("something went wrong", e))
    chan.onClose(e => console.log("channel closed", e))

    $canvasBody.dblclick(function(event) {
      let box = self.addBox($canvasBody,
        (event.offsetY - 20),
        (event.offsetX - 20),
        "mcBox" + self.randomUsername(15),
        chan);

      chan.push("box_model:update_create", self.buildCreateUpdate(box));
    });

    $clearModel.click(function(event) {
      $canvasBody.html("");
      divCount = 0;
    });

    chan.on("user:entered", msg => {
      let username = this.sanitize(msg.user || "anonymous");
      console.log("User entered! " + username);
    });

    chan.on("box_model:sync_create", msg => {
      let username = this.sanitize(msg.user || "anonymous");

      if( username != this.getUsername()) {
        console.log("[" + username + "] created a box!");
        self.addBox($canvasBody, msg.top, msg.left, msg.box_id, chan);
      }
    });

    chan.on("box_model:sync_position", msg => {
      let username = this.sanitize(msg.user || "anonymous");

      if (username != this.getUsername()) {
        console.log("[" + username + "] updated a box!");

        let box = $("#" + msg.box_id);
        box.offset({top: msg.top, left: msg.left});
      }

    });

    chan.on("box_model:sync_content", msg => {
      let username = this.sanitize(msg.user || "anonymous");

      if (username != this.getUsername()) {
        console.log("[" + username + "] updated a box!");

        let box = $("#" + msg.box_id);
        box.html(msg.content);
      }

    });
  }

  static addBox(parent, top, left, id, channel) {
    let box = "<div id=\"" + id +
      "\" style=\"top: " + top + "px; left: " + left +
      "px;\" class=\"mcBox\"  contenteditable=true></div>";
    parent.append(box);

    let elem = $("#" + id);
    let isClicked = false;
    let self = this;

    elem.draggable();

    elem.mousemove(function(event) {
      // Only move if this is the one being updated!
      if (isClicked) {
        channel.push("box_model:update_position", self.buildPositionUpdate(elem))
      }
    });

    elem.mousedown(function(){
      isClicked = true;
    });

    elem.mouseup(function() {
      isClicked = false;
      channel.push("box_model:update_position", self.buildPositionUpdate(elem))
    });

    elem.click(function(event) {
      event.stopPropagation();
      elem.focus();
    });

    elem.dblclick(function(event) {
      event.stopPropagation();
      event.preventDefault();
    });

    elem.keyup(function(event) {
      channel.push("box_model:update_content", self.buildContentUpdate(elem));
    });

    return elem;
  }

  static buildCreateUpdate(elem) {
    return {
      box_id: elem.attr("id"),
      user: this.getUsername(),
      top: elem.offset().top,
      left: elem.offset().left
    }
  }

  static buildContentUpdate(elem) {
    return {
      box_id: elem.attr("id"),
      user: this.getUsername(),
      content: elem.html()
    }
  }

  static buildPositionUpdate(elem) {
    return {
      box_id: elem.attr("id"),
      user: this.getUsername(),
      top: elem.offset().top,
      left: elem.offset().left
    }
  }

  static getUsername() {
    return this.username.val();
  }

  static randomUsername(count) {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVQXYZ0123456789";
    let name = "";

    while(count > 0) {
      let index = Math.round((letters.length - 1) * Math.random());
      name = name + letters[index];
      count--;
    }

    return name;
  }

  static sanitize(html){ return $("<div/>").text(html).html() }

  static messageTemplate(msg){
    let username = this.sanitize(msg.user || "anonymous")
    let body     = this.sanitize(msg.body)

    return(`<p><a href='#'>[${username}]</a>&nbsp; ${body}</p>`)
  }

}

$( () => App.init() )

export default App
