function init() {
    idCounter = 0;
    
    //Fügt dragenter/-leave-EventListener für die Spalten hinzu
    var elements = document.getElementsByClassName("column");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("dragenter", dragEnter);
        elements[i].addEventListener("dragleave", dragLeave);
        elements[i].children[0].addEventListener("dragenter", dragEnter);
        elements[i].children[0].addEventListener("dragleave", dragLeave);
    }
}

function addCart() {
    var ideas = document.getElementById("ideas");
    //Einfügen von Span, Inputfeld & Pen
    var menupoint = document.createElement("span");
    var cart = document.createElement("input");
    var pen = document.createElement("img");

    menupoint.classList.add("menupoint");
    menupoint.id = btoa(idCounter++);

    cart.placeholder = "Hier etwas eingeben";
    cart.classList.add("cartInput");

    pen.src = "img/IconPen.png";
    pen.classList.add("pen");

    menupoint.draggable = false;
    cart.draggable = false;
    pen.draggable = false;

    //Hierarchie: ideas -> menupoint -> (cart, pen)
    menupoint.appendChild(cart);
    menupoint.appendChild(pen);
    ideas.appendChild(menupoint);
    
    //EventListener für Menüpunkt & Listener fürs Umschalten zwischen Schrei-/Dragmodus
    menupoint.firstChild.addEventListener("dragstart", dragStart);
    menupoint.firstChild.addEventListener("dragend", dragEnd);
    menupoint.addEventListener("dragenter", dragEnter);
    pen.addEventListener("click", toggleInput);
}

//Umschalten zwischen Ziehbar/Nicht ziehbar: Input toggle readonly, draggable & cartStyle-Klasse
function toggleInput(event) {
    var cart = this.parentNode.firstChild;

    cart.draggable = !(cart.draggable);
    cart.readOnly = !(cart.readOnly);
    cart.classList.toggle("cartStyle");
}

//Feuert, wenn Dragvorgang beginnt: Datatransfer wird gesetzt (ID des gedraggten Elements)
function dragStart(event) {
    this.parentNode.classList.add('draggedMenupoint');

    //event.dataTransfer.effectAllowed = 'all';
    event.dataTransfer.setData('text/html', event.target.parentNode.id);
}

//Feuert, wenn Dragvorgang endet (vor dragLeave): Wenn über Spalte oder anderem Inputelement -> drop
function dragEnd(event) {
    this.parentNode.classList.remove('draggedMenupoint');
    
    let query = document.getElementsByClassName("divOver");
    
    while (query.length) {
        query[0].classList.remove("divOver");
    }
}


//Feuert, wenn gedraggtes Element in ein anderes Element eintritt: Speichern des getroffenen Elements in target
function dragEnter(event) {
    var data = event.dataTransfer.getData('text/html');

    if (event.target.className.contains('column')) {
        event.target.appendChild(document.getElementById(data));
        event.target.classList.add("divOver");
    }
    if (event.target.parentNode.className.contains('column')) {
        event.target.parentNode.appendChild(document.getElementById(data));
        event.target.parentNode.classList.add("divOver");
    }
    if (event.target.className.contains('cartInput'))
        event.target.parentNode.insertBefore(document.getElementById(data), event.target);
}

//Feuert, wenn gedraggtes Element aus einem Element austritt: Entfernen der divOver-Klasse
function dragLeave(event) {
    if (event.target.className != null && event.target.className.contains('column')) 
        event.target.classList.remove("divOver");
}



