var $div = $l("ul");

$l(".category").on("submit", function (e) {
  e.preventDefault();
  var title = document.getElementById('category-title').value;
  var $li = $l(document.createElement("li"));
  $li.html(title);
  $div.append($li);
  document.getElementById('category-title').value = "";
});

$l("li").on("click", function (e) {
  e.preventDefault();
  debugger
  this.addClass(done);
  alert("Click on li");
});
