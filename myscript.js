function init () {
	console.log(1);
}

function addCart () {
    var element = document.getElementById("ideas");

    var span = document.createElement("span");
    span.classList.add("menupoint");

    var cart = document.createElement("input");
    cart.placeholder = "Hier etwas eingeben";
    cart.classList.add("cartInput");

    var pen = document.createElement("img");
    pen.src = "img/IconPen.png";
    pen.height = 32;
    pen.width = 32;

    span.appendChild(cart);
    span.appendChild(pen);
    element.appendChild(span);

    
    // Toggle Button um zwischen Textfeld und statisch hin und her zu springen
    var toggleInput = document.createElement("div");
    toggleInput.classList.add("toggleInput");
    element.appendChild(toggleInput);
    
}