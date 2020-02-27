// Author: Joel Johnson
// Date: 6/1/19
// Purpose: Client-side javascript making AJAX requests from server for Database interactions and UI
// Site: http://web.engr.oregonstate.edu/~johnsjoe/DBAssignment/

document.addEventListener("DOMContentLoaded", initialize);

// Function to initialize table and bind the submit button 
function initialize() {
    CreateTableFromJSON();
}

// Check server SQL database to see if data exists, if so populate table with data 
function CreateTableFromJSON() {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();
    
    switch(document.title) {
        case "Attacks Table":
            payload = "attacks";
            break;
        case "Trainer Pokedex":
            payload = "trainers";
            break;
        case "Battle Table":
            payload = "battles";
            break;
        case "Pokemon Table":
            payload = "pokemon";
            break;
        case "Pokemon Type":
            payload = "pokemonTypes";
            break;
        case "Defenses Table":
            payload = "defenses";
            break;
        case "Trainer Pokemon Inventory":
            payload = "trainers_pokemon";
            break;
    }
    
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);
    
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            updateTable(response);
        } else {
            console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Update table with contents of response from server 
function updateTable(data) {
    // Get ID for table on page
    var table = document.getElementById("table");
    
    // Add JSON object (array of arrays) to table body
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < data[0].length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][j];
        }
        
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = '<button class="btn btn-primary" onclick=removeElement(' + (i + 1) + ')>Delete</button>';
    }
}

function removeElement(id) {
    document.getElementById("attackTable").deleteRow(id);
}