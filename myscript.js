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

    menupoint.appendChild(cart);
    menupoint.appendChild(pen);
    element.appendChild(menupoint);

    //toggleDraggable(menupoint);

    addListeners(menupoint);
    
    pen.addEventListener("click", toggleInput);

    //Brauchen wir das hier noch? vvvvvvvvvv
    // Toggle Button um zwischen Textfeld und statisch hin und her zu springen
    /*var toggleInput = document.createElement("div");
    toggleInput.classList.add("toggleInput");
    element.appendChild(toggleInput);*/
}

function toggleDraggable(menupoint){
    menupoint.draggable = !(menupoint.draggable);
}

function dragStart(event){
    this.style.opacity = '0.75';
}

function addListeners(menupoint){
    menupoint.addEventListener("dragstart", dragStart);
}

function toggleInput(event){
    var parent = this.parentNode;
    toggleDraggable(parent);
    var cart = parent.firstChild;

    cart.disabled = !(cart.disabled); //readonly funktioniert irgendwie (noch) nicht; mit disabled möglich, aber nicht mehr schön, unschönes lösbar mit background-color&color
    cart.classList.toggle("cartStyle");
}