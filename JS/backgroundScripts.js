// Author: Joel Johnson
// Date: 6/1/19
// Purpose: Client-side javascript making AJAX requests from server for Database interactions and UI
// Site: http://web.engr.oregonstate.edu/~johnsjoe/DBAssignment/

document.addEventListener("DOMContentLoaded", initialize);

// Function to initialize table and bind the submit button 
function initialize() {
    CreateTableFromJSON();
    CreateDropDownList();
}

// Check server SQL database to see if data exists, if so populate table with data 
function CreateTableFromJSON() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = getPayload();
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);


    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            updateTable(response);
            console.log(response);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
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
        tabCell.innerHTML = '<button class="btn btn-primary" onclick=removeElement(' + data[i][0] + ')>Delete</button>';
        tabCell.parentElement.id = data[i][0];
    }
}



// Insert into one-column table
function insertOne() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, value: null };
    payload.table = getPayload();
    payload.value = document.getElementById("insert_value").value;

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_one', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into battles table
function insertBattle() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();
    console.log("test");
    var payload = { table: null, winner: null, loser: null };
    payload.table = getPayload();
    payload.winner = document.getElementById("firstInput").value;
    payload.loser = document.getElementById("secondInput").value;
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_battle', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into trainer_pokemon table
function insertPokemonTrainer() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, pokemon: null, trainer: null };
    payload.table = getPayload();
    payload.trainer = document.getElementById("firstInput").value;
    payload.pokemon = document.getElementById("secondInput").value;
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_trainer_pokemon', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into trainer table
function insertTrainer() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, trainer: null, gender: null, age: null};
    payload.table = getPayload();
    payload.trainer = document.getElementById("trainer_name").value;
    payload.gender = document.getElementById("trainer_gender").value;
    payload.age = document.getElementById("trainer_age").value;
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_trainer', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// Insert into pokemon table
function insertPokemon() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, name: null, type1: null, type2: null, attack: null, defense: null, height: null, weight: null };
    payload.table = getPayload();
    payload.name = document.getElementById("nameID").value;
    payload.type1 = document.getElementById("typeID").value;
    payload.type2 = document.getElementById("type2ID").value;
    payload.attack = document.getElementById("attackID").value;
    payload.defense = document.getElementById("defenseID").value;
    payload.height = document.getElementById("heightID").value;
    payload.weight = document.getElementById("weightID").value;
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_pokemon', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response);

        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}


// Return the table to query (based on the current page)
function getPayload() {

    var table;

    switch (document.title) {
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

function removeElement(rowID) {
    
    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = {table: null, row: null};
    payload.table = getPayload();
    payload.row = rowID;
    
    console.log(payload);

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/delete_row', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            
            console.log(response);
            document.getElementById(rowID).remove();
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}

// creates dropdown from SQL server depending on current page browsed
function CreateDropDownList() {

    switch (document.title) {
        case "Battle Table":
            table = "battles";
            drop_call("trainers", "firstInput");
            drop_call("trainers", "secondInput");
            break;
        case "Pokemon Table":
            table = "pokemon";
            drop_call("pokemonTypes", "typeID");
            drop_call("pokemonTypes", "type2ID");
            drop_call("attacks", "attackID");
            drop_call("defenses", "defenseID");
            //drop_call("pokemonTypes", "selectID");
            drop_call("pokemon", "selectID");
            break;
        case "Trainer Pokemon Inventory":
            drop_call("trainers", "firstInput");
            drop_call("pokemon", "secondInput");
            break;
    }
}


// calls database to obtain data to populate dropdown list
function drop_call(database, selectID) {
    var req = new XMLHttpRequest();

    req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);

    var payload = database

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            drop_list(response, selectID);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();

}


// dynamically creates dropdown list
function drop_list(data, selectID) {

    var select = document.getElementById(selectID);

    for (var i = 0; i < data.length; i++) {
        // console.log(data[i]);

        var keys = Object.keys(data[i]);
        var values = Object.values(data[i])


        // console.log(values[1]);
        var el = document.createElement("option");
        el.textContent = values[1];
        el.value = values[0];
        select.appendChild(el);
    }
}

// filters Pokemon table
function myFunction() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("selectID");
    filter = input.value
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        //td = tr[i].getElementsByTagName("td")[2];
        // console.log(filter);
        // console.log(td);
        if (td) {
            if (filter == 0) {
                tr[i].style.display = "";
            }
            else if (td.innerHTML == filter) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}