window.onload = function() {
  var modal = document.getElementById("disclaimerModal");
  var btn = document.getElementById("acceptBtn");

  // When the page loads, open the modal 
  modal.style.display = "block";

  // When the user clicks on the button, close the modal
  btn.onclick = function() {
    modal.style.display = "none";
  }
}
