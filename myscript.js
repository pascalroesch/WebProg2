function init() {
  idCounter = 0;
}

function addCart() {

    var elements = document.getElementsByClassName("column");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("dragend", dragEnd);
      elements[i].addEventListener("dragenter", dragEnter);
      elements[i].addEventListener("dragleave", dragLeave);
    }

    var element = document.getElementById("ideas");

    var menupoint = document.createElement("span");
    menupoint.classList.add("menupoint");
    menupoint.id = btoa(idCounter++);
    console.log(menupoint);

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

    addListeners(menupoint);
    
    
    pen.addEventListener("click", toggleInput);
}

function toggleDraggable(menupoint){
    menupoint.firstChild.draggable = !(menupoint.firstChild.draggable);
    menupoint.lastChild.draggable = !(menupoint.lastChild.draggable);
}


function addListeners(menupoint) {
    menupoint.lastChild.addEventListener("dragstart", dragStart);
    menupoint.lastChild.addEventListener("dragend", dragEnd);
    menupoint.lastChild.addEventListener("dragenter", dragEnter);
    menupoint.lastChild.addEventListener("dragleave", dragLeave);

    menupoint.firstChild.addEventListener("dragstart", dragStart);
    menupoint.firstChild.addEventListener("dragend", dragEnd);
    menupoint.firstChild.addEventListener("dragenter", dragEnter);
    menupoint.firstChild.addEventListener("dragleave", dragLeave);

}

function dragStart(event){
    console.log("dragStart: " + this);
    dragSource = this.parentNode;
    dragSource.style.opacity = '0.25';

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.parentNode.id);
    console.log(event.dataTransfer.getData('text/html'));
}

function dragEnd(event) {
  var data = event.dataTransfer.getData('text/html');

  this.parentNode.style.opacity = '1';
  
  if (event.target.className == 'column') {
    event.target.appendChild(data);
  }
}

function dragEnter(event){
    console.log(event);
    if(event.target.className == 'column'){
        console.log("enter");
        event.target.classList.add("divOver");
    }
}

function dragLeave(event) {
  if(event.target.className.contains('column')){
    event.target.classList.remove("divOver");
      console.log("leave");
  }
}

function toggleInput(event) {
  var parent = this.parentNode;
  toggleDraggable(parent);
  var cart = parent.firstChild;

  cart.readOnly = !(cart.readOnly);
  cart.classList.toggle("cartStyle");
}

