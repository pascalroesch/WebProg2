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
    menupoint.lastChild.draggable = !(menupoint.lastChild.draggable);

    /*var menuquery = menupoint.childNodes;
    for (var i = 0; i < menuquery.length; i++) {
        menuquery[i].draggable = !(menuquery[i].draggable);
        console.log(menuquery[i] + '  ' + menuquery[i].draggable);
    }*/
}


function addListeners(menupoint){
    menupoint.lastChild.addEventListener("dragstart", dragStart);
    menupoint.lastChild.addEventListener("dragend", dragEnd);
    menupoint.lastChild.addEventListener("dragenter", dragEnter);
    menupoint.lastChild.addEventListener("dragleave", dragLeave)

    /*var menuquery = menupoint.childNodes;
    for (var i = 0; i < menuquery.length; i++) {    //input irgendwie nicht draggable
        menuquery[i].addEventListener("dragstart", dragStart);
        menuquery[i].addEventListener("dragend", dragEnd);
    }*/
}

function dragStart(event){
    console.log("dragStart");
    dragSource = this.parentNode;
    dragSource.style.opacity = '0.2';

    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML)
}

function dragEnd(event){
    console.log("dragEnd");
    this.parentNode.style.opacity = '1';
}

function dragEnter(event){
    console.log(event);
    if(event.target.className == 'column'){
        console.log("TROLOLOL");
        event.target.classList.add("divOver");
    }
}

function dragLeave(event){

}

function toggleInput(event){
    var parent = this.parentNode;
    toggleDraggable(parent);
    var cart = parent.firstChild;

    cart.readOnly = !(cart.readOnly); 
    cart.classList.toggle("cartStyle");
}

