var $div = $l("ul");

var createLi = function (title, key) {
  var $li = $l(document.createElement("li"));
  $li.html(title);
  $div.append($li);

  $l("li").off("click");
  $l("li").off("dblclick");

  $l("li").on("click", function (e) {
    e.preventDefault();
    var $li = $l(this);
    if ($li.attr("class") === " done") {
      $li.removeClass("done");
    } else if (!$li.attr("class")) {
      $li.addClass("done");
    }

  });

  $l("li").on("dblclick", function (e) {
    e.preventDefault();
    var $li = $l(this);
    if ($li.attr("class") === " done") {
      localStorage.removeItem(key);
      $li.remove();
    }
  });
};

Object.keys(localStorage).forEach( function (key) {
  if (key.slice(0, 3) === "li-") {
    var title = localStorage[key];
    createLi(title, key);
  }
});

$l(".category").off("submit");
$l(".category").on("submit", function (e) {
  e.preventDefault();
  var title = document.getElementById('category-title').value;
  var key = "li-" + title;
  localStorage.setItem(key, title);

  var $li = $l(document.createElement("li"));
  $li.html(title);
  $div.append($li);

  document.getElementById('category-title').value = "";
});
