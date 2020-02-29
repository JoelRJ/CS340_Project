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
    
    var payload = getPayload();
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

// Insert into one-column table
function insertOne() {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();
    
    var payload = {table: null, value: null};
    payload.table = getPayload();
    payload.value = document.getElementById("insert_value").value;

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_one', true);
    
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);
            
        } else {
            console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into battles table
function insertBattle() {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();
    console.log("test");
    var payload = {table: null, winner: null, loser: null};
    payload.table = getPayload();
    payload.winner = document.getElementById("firstInput").value;
    payload.loser = document.getElementById("secondInput").value;
    console.log(payload);
    
    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_battle', true);
    
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);
            
        } else {
            console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into trainer_pokemon table
function insertPokemonTrainer() {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = {table: null, pokemon: null, trainer: null};
    payload.table = getPayload();
    payload.trainer = document.getElementById("firstInput").value;
    payload.pokemon = document.getElementById("secondInput").value;
    console.log(payload);
    
    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_trainer_pokemon', true);
    
    req.addEventListener('load',function(){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);
            
        } else {
            console.log("Error in network request: " + req.statusText);
    }});
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

function getPayload() {
    
    var table;
    
    switch(document.title) {
        case "Attacks Table":
            table = "attacks";
            break;
        case "Trainer Pokedex":
            table = "trainers";
            break;
        case "Battle Table":
            table = "battles";
            break;
        case "Pokemon Table":
            table = "pokemon";
            break;
        case "Pokemon Type":
            table = "pokemonTypes";
            break;
        case "Defenses Table":
            table = "defenses";
            break;
        case "Trainer Pokemon Inventory":
            table = "trainers_pokemon";
            break;
    }
    
    return table;
}

function removeElement(id) {
    document.getElementById("attackTable").deleteRow(id);
}