function init() {
    console.log("INIT");
    idCounter = 0;
    testTarget = 0;
    
    //F�gt dragenter/-leave-EventListener f�r die Spalten hinzu
    var elements = document.getElementsByClassName("column");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dragenter", dragEnter);
        elements[i].children[0].addEventListener("dragenter", dragEnter);
    }
}

function addCart(meinDiv, menupoint) {
    console.log("ADDCART");

    var columnToInsertInto = document.getElementById(meinDiv);


    // Es wurde kein Element übergeben -> Neues anfügen
    if (menupoint === undefined) {
       menupoint = document.createElement("div");
       var cart = document.createElement("input");

       menupoint.classList.add("menupoint");
       menupoint.id = btoa(idCounter++);
       
       cart.placeholder = "Hier etwas eingeben";
       cart.classList.add("cartInput");
        
       menupoint.draggable = false;
       cart.draggable = false;

       menupoint.appendChild(cart);
       
       //EventListener f�r Men�punkt & Listener f�rs Umschalten zwischen Schrei-/Dragmodus
    menupoint.firstChild.addEventListener("dragstart", dragStart);
    menupoint.firstChild.addEventListener("dragend", dragEnd);
    menupoint.addEventListener("dragenter", dragEnter);
    cart.addEventListener("click", toggleInput);
    }
   
    // Eigentliches Hinzufügen des Menupoint
    columnToInsertInto.appendChild(menupoint);
    
    
}

//Umschalten zwischen Ziehbar/Nicht ziehbar: Input toggle readonly, draggable & cartStyle-Klasse
function toggleInput(event) {
    var cart = this.parentNode.firstChild;

    cart.draggable = !(cart.draggable);
    cart.readOnly = !(cart.readOnly);
    cart.classList.toggle("cartStyle");
}

//Feuert, wenn Dragvorgang beginnt: Datatransfer wird gesetzt (ID des gedraggten Elements)
/*
function dragStart(event) {
    this.parentNode.classList.add('draggedMenupoint');

    //event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('text/html', event.target.parentNode.id);
}

//Feuert, wenn Dragvorgang endet (vor dragLeave): Wenn �ber Spalte oder anderem Inputelement -> drop
function dragEnd(event) {
    this.parentNode.classList.remove('draggedMenupoint');
    
    let meinquery = document.getElementsByClassName("divOver");
    
    while (meinquery.length) {
        meinquery[0].classList.remove("divOver");
    }
}


//Feuert, wenn gedraggtes Element in ein anderes Element eintritt: Speichern des getroffenen Elements in target
function dragEnter(event) {
    var data = event.dataTransfer.getData('text/html');
    console.log(data);
    console.log("das ist ein teist");

    if (event.target.className.indexOf('column') > -1) {
        event.target.appendChild(document.getElementById(data));
        event.target.classList.add("divOver");
    }
    if (event.target.parentNode.className.indexOf('column') > -1) {
        event.target.parentNode.appendChild(document.getElementById(data));
        event.target.parentNode.classList.add("divOver");
    }
    if (event.target.className.indexOf('cartInput') > -1)
        event.target.parentNode.insertBefore(document.getElementById(data), event.target);
}

//Feuert, wenn gedraggtes Element aus einem Element austritt: Entfernen der divOver-Klasse
function dragLeave(event) {
    if (event.target.className != null && event.target.className.indexOf('column') > -1) 
        event.target.classList.remove("divOver");
}
*/


function dragEnter(ev) {
    ev.preventDefault();
    testTarget = ev.path[1];
}

function dragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dragEnd(ev) {
    ev.preventDefault();
    console.log(testTarget);
    addCart(testTarget.id, ev.path[1]);
    
    /*
    var data = ev.dataTransfer.getData("text");
    console.log(ev.path[1]);
    ev.target.appendChild(document.getElementById(data));
    
    */
    
}

