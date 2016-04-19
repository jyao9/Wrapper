var $div = $l("ul");

Object.keys(localStorage).forEach( function (key) {
  if (key.slice(0, 3) === "li-") {
    var title = localStorage[key];
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
  }
});

$l(".category").on("submit", function (e) {
  e.preventDefault();
  var title = document.getElementById('category-title').value;
  var $li = $l(document.createElement("li"));
  $li.html(title);
  var key = "li-" + title;
  localStorage.setItem(key, title);
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
      localStorage.removeItem($li);
      $li.remove();
    }
  });

  document.getElementById('category-title').value = "";
});
