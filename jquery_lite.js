(function (root) {

  root.$l = function (arg) {
    if (typeof arg === "string") {
      var node = document.querySelectorAll(arg);
      var nodeArray = [];
      for (var i = 0; i < node.length; i++) {
        nodeArray.push(node[i]);
      }
      var elList = new DOMNodeCollection(nodeArray);
      return elList;
    } else if (typeof arg === "function") {
      console.log("In progress");
    } else if (typeof arg === "object" && arg instanceof HTMLElement) {
      var newEl = new DOMNodeCollection([arg]);
      return newEl;
    }

  };

  function DOMNodeCollection (array) {
    this.array = Array.prototype.slice.call(array);
  }

  DOMNodeCollection.prototype.each = function (callback) {
    this.array.forEach(callback);
  };

  DOMNodeCollection.prototype.html = function (string) {
    if (typeof string === "string") {
      for (var i = 0; i < this.array.length; i++) {
        this.array[i].innerHTML = string;
      }
    } else {
      return this.array[0].innerHTML;
    }
  };

  DOMNodeCollection.prototype.empty = function () {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].innerHTML = "";
    }
  };

  DOMNodeCollection.prototype.append = function (arg) {
    // debugger
    // if (this.array.length > 0) {
    //   return;
    // }

    if (typeof arg === "object" && !(arg instanceof DOMNodeCollection)) {
      arg = root.$l(arg);
    }

    if (typeof arg === "string") {
      for (var i = 0; i < this.array.length; i++) {
        this.array[i].innerHTML += arg;
      }
    } else if (arg instanceof DOMNodeCollection) {
      var node = this.array[0];
      arg.each(function (childNode) {
        node.appendChild(childNode);
      });
    }
  };

  DOMNodeCollection.prototype.attr = function (attributeName, value) {
    if (typeof value !== "undefined") {
      for (var i = 0; i < this.array.length; i++) {
        this.array[i].setAttribute(attributeName, value);
      }
    } else {
      for (var j = 0; j < this.array.length; j++) {
        var firstEl = this.array[j].getAttribute(attributeName);
        if (typeof firstEl !== "undefined") {
          return firstEl;
        }
      }
    }
  };

  DOMNodeCollection.prototype.addClass = function (name) {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].className += (" " + name);
    }
  };

  DOMNodeCollection.prototype.removeClass = function (name) {
    for (var i = 0; i < this.array.length; i ++) {
      var index = this.array[i].className.split(" ").indexOf(name);
      if (index > -1) {
        var newArr = this.array[i].className.split(" ").slice();
        newArr.splice(index, 1);
        this.array[i].className = newArr.join(" ");
      }
    }
  };

  DOMNodeCollection.prototype.children = function () {
    var childrenArray = [];
    for (var i = 0 ; i < this.array.length; i ++) {
      childrenArray.push(this.array[i].children);
    }
    var domChildrenArray = new DOMNodeCollection(childrenArray);
    return domChildrenArray;
  };

  DOMNodeCollection.prototype.parent = function () {
    var parentArray = [];
    for (var i = 0 ; i < this.array.length; i ++) {
      parentArray.push(this.array[i].parentElement);
    }
    var domParentArray = new DOMNodeCollection(parentArray);
    return domParentArray;
  };

  DOMNodeCollection.prototype.find = function (selector) {
    var selectedList = this.querySelectorAll(selector);
    var newEl = new DOMNodeCollection(selectedList);
    return newEl;
  };

  DOMNodeCollection.prototype.remove = function () {
    this.empty();
    this.array = [];
  };

  DOMNodeCollection.prototype.on = function (eventName, fn) {
    this.each(function (node) {
      node.addEventListener(eventName, fn);
      var trigger = "wrapper-" + eventName;
      if (typeof node[trigger] === "undefined") {
        node[trigger] = [];
      }
      node[trigger].push(fn);
    });
  };

  DOMNodeCollection.prototype.off = function (eventName) {
    this.each(function(node){
     var trigger = "wrapper-" + eventName;
     if (node[trigger]){
       node[trigger].forEach(function (callback) {
         node.removeEventListener(eventName, callback);
       });
     }
     node[trigger] = [];
   });
  };

  DOMNodeCollection.prototype.extend  = function (){
    for(var i = 1; i < arguments.length; i++) {
      for(var key in arguments[i]) {
        if(arguments[i].hasOwnProperty(key)){
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  };

  DOMNodeCollection.ajax = function(options){
  var request = new XMLHttpRequest();
  var defaults = {
    method: "GET",
    url: "",
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: function(){},
    error: function(){},
  };
  options = DOMNodeCollection.extend(defaults, options);

  if (options.method.toUpperCase() === "GET"){
    options.url += "?" + toQueryString(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = function (e) {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
};

function toQueryString (obj){
  var result = "";
  for(var prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

})(this);
