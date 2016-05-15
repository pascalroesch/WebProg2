function init () {
	console.log(1);
}

function addCart () {
    var cart = document.createElement("input");
    cart.placeholder = "Hier etwas eingeben";
    cart.classList.add("cartInput");

    var element = document.getElementById("ideas");
    element.appendChild(cart);
    
    // Toggle Button um zwischen Textfeld und statisch hin und her zu springen
    var toggleInput = document.createElement("div");
    toggleInput.classList.add("toggleInput");
    element.appendChild(toggleInput);
    
}