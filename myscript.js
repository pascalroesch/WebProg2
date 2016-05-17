function init () {

}

function addCart () {
    var element = document.getElementById("ideas");

    var menupoint = document.createElement("span");
    menupoint.classList.add("menupoint");

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

    //Brauchen wir das hier noch? vvvvvvvvvv
    // Toggle Button um zwischen Textfeld und statisch hin und her zu springen
    /*var toggleInput = document.createElement("div");
    toggleInput.classList.add("toggleInput");
    element.appendChild(toggleInput);*/
}

function toggleDraggable(menupoint){
    menupoint.firstChild.draggable = !(menupoint.firstChild.draggable);
    menupoint.lastChild.draggable = !(menupoint.lastChild.draggable);
}


function addListeners(menupoint){
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
    event.dataTransfer.setData('text', event.target);
    console.log(event.dataTransfer.getData('text'))
}

function dragEnd(event){
    console.log("dragEnd");
    this.parentNode.style.opacity = '1';
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

function toggleInput(event){
    var parent = this.parentNode;
    toggleDraggable(parent);
    var cart = parent.firstChild;

    cart.readOnly = !(cart.readOnly); 
    cart.classList.toggle("cartStyle");
}

