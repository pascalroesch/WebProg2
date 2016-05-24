function init() {
    idCounter = 0;
    
}
target = null;
function addCart() {

    var elements = document.getElementsByClassName("column");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("dragenter", dragEnter);
      elements[i].addEventListener("dragleave", dragLeave);
    }

    var element = document.getElementById("ideas");

    var menupoint = document.createElement("span");
    menupoint.classList.add("menupoint");
    menupoint.id = btoa(idCounter++);

    var cart = document.createElement("input");
    cart.placeholder = "Hier etwas eingeben";
    cart.classList.add("cartInput");
    
    var pen = document.createElement("img");
    pen.src = "img/IconPen.png";
    pen.classList.add("pen");
    
    menupoint.draggable = false;
    cart.draggable = false;
    pen.draggable = false;

    menupoint.appendChild(cart);
    menupoint.appendChild(pen);
    element.appendChild(menupoint);

    menupoint.firstChild.addEventListener("dragstart", dragStart);
    menupoint.firstChild.addEventListener("dragend", dragEnd);
    menupoint.addEventListener("dragenter", dragEnter);
    
    pen.addEventListener("click", toggleInput);
}

function toggleDraggable(menupoint){
    menupoint.firstChild.draggable = !(menupoint.firstChild.draggable);
}

function dragStart(event){
    this.parentNode.classList.add('draggedMenupoint');

    event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('text/html', event.target.parentNode.id);
    console.log(event.dataTransfer.getData('text/html'));
}

function dragEnd(event) {   
    this.parentNode.classList.remove('draggedMenupoint');

    if (target != null) {
        var data = event.dataTransfer.getData('text/html');

        if (target.className.contains('column'))
            target.appendChild(document.getElementById(data));
        else if (target.className.contains('cartInput'))
            target.parentNode.insertBefore(document.getElementById(data), target);
    }
    
    target = null;
}

function dragEnter(event) {
    target = event.target;
    console.log(target);
    if (event.target.className != null && event.target.className.contains('column')) {
        event.target.classList.add("divOver");
    }
}

function dragLeave(event) {
    if (event.target.className!= null && event.target.className.contains('column')) {
    event.target.classList.remove("divOver");
  }
}

function toggleInput(event) {
  var parent = this.parentNode;
  toggleDraggable(parent);
  var cart = parent.firstChild;

  cart.readOnly = !(cart.readOnly);
  cart.classList.toggle("cartStyle");
}

