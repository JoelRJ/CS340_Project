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
    var updateButton = isUpdateButton();
    var deleteButton = isDeleteButton();
    var editOption = isEditOption();
    console.log(payload);

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);
    //req.open("POST", 'http://localhost:8042/view_database', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/view_database', true);


    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            updateTable(response, deleteButton, updateButton, editOption);
            console.log(response);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}



// Update table with contents of response from server
function updateTable(data, deleteButton, updateButton, editOption) {
    // Get ID for table on page
    var table = document.getElementById("table");

    // Add JSON object (array of arrays) to table body
    for (var i = 0; i < data.length; i++) {

        tr = table.insertRow(-1);
        tr.setAttribute("id", data[i][0])

        for (var j = 0; j < data[0].length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = data[i][j];
        }


        if (updateButton == true) {
            var tabCell2 = tr.insertCell(-1);
            if (editOption == 1) {
                tabCell2.innerHTML = '<button class="btn btn-primary" onclick="updateRow(' + data[i][0] + ", \'winnerUpdate\', \'loserUpdate\', " + editOption + ')\">Edit</button>';
            }
            else {
                tabCell2.innerHTML = '<button class="btn btn-primary" onclick="updateRow(' + data[i][0] + ", \'trainerUpdate\', \'pokemonUpdate\', " + editOption + ')\">Edit</button>';
            }
        }
        if (deleteButton == true) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = '<button class="btn btn-primary" onclick=removeElement(' + data[i][0] + ')>Delete</button>';
            tabCell.parentElement.id = data[i][0];
        }
    }
}


function updateRow(rowID, input1, input2, editOption) {

    var c = document.getElementById(rowID).childNodes;

    inputUpdate1 = input1 + rowID;
    inputUpdate2 = input2 + rowID;
    c[1].innerHTML = '<select class="form-control" id="' + inputUpdate1 + '">';
    c[2].innerHTML = '<select class="form-control" id="' + inputUpdate2 + '">';

    if (editOption == 1) {
        drop_call("trainers", inputUpdate1);
        drop_call("trainers", inputUpdate2);
    }
    else {
        drop_call("trainers", inputUpdate1);
        drop_call("pokemon", inputUpdate2);
    }

    c[3].innerHTML = '<button class="btn btn-danger" onclick="editRow(' + rowID + ", " + "\'" + inputUpdate1 + "\'" + ', ' + "\'" + inputUpdate2 + "\'" + ', ' + editOption + ')">Update</button>';

}

function editRow(rowID, selectInput1, selectInput2, editOption) {


    selInput1 = document.getElementById(selectInput1);
    selInput2 = document.getElementById(selectInput2);

    selText1 = selInput1.options[selInput1.selectedIndex].text;
    selText2 = selInput2.options[selInput2.selectedIndex].text;

    selValue1 = selInput1.options[selInput1.selectedIndex].value;
    selValue2 = selInput2.options[selInput2.selectedIndex].value;

    var c = document.getElementById(rowID).childNodes;

    c[1].innerHTML = selText1;
    c[2].innerHTML = selText2;

    console.log(selValue1)
    console.log(selValue2)

    if (editOption == 1) {
        c[3].innerHTML = '<button class="btn btn-primary" onclick="updateRow(' + rowID + ", \'winnerUpdate\', \'loserUpdate\', " + editOption + ')\">Edit</button>';
    }
    else {
        c[3].innerHTML = '<button class="btn btn-primary" onclick="updateRow(' + rowID + ", \'trainerUpdate\', \'pokemonUpdate\', " + editOption + ')\">Edit</button>';
    }

    editTable(rowID, selValue1, selValue2);
}

// request to SQL to update a table (battles or trainer_pokemon)
function editTable(rowID, editInput1, editInput2) {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, rID: null, input1: null, input2: null };

    switch (document.title) {
        case "Battle Table":
            payload.table = "battles";
            break;
        case "Trainer Pokemon Inventory":
            payload.table = "trainers_pokemon";
            break;
    }

    payload.rID = rowID;
    payload.input1 = parseInt(editInput1);
    payload.input2 = parseInt(editInput2);
    console.log(payload);

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/edit_table', true);
    //req.open("POST", 'http://localhost:8042/edit_table', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/edit_table', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);
            //updateTable(response, true, true, 2);
        } else {
            console.log("Error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    event.preventDefault();
}



// Insert into one-column table
function insertOne() {

    // https://www.w3schools.com/js/js_json_http.asp
    var req = new XMLHttpRequest();

    var payload = { table: null, value: null };
    payload.table = getPayload();
    payload.value = document.getElementById("insert_value").value;

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_one', true);
    //req.open("POST", 'http://localhost:8042/insert_one', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/insert_one', true);

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

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_battle', true);
    //req.open("POST", 'http://localhost:8042/insert_battle', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/insert_battle', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response, true, true, 1);

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

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_trainer_pokemon', true);
    //req.open("POST", 'http://localhost:8042/insert_trainer_pokemon', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/insert_trainer_pokemon', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response, true, true, 2);

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

    var payload = { table: null, trainer: null, gender: null, age: null };
    payload.table = getPayload();
    payload.trainer = document.getElementById("trainer_name").value;
    payload.gender = document.getElementById("trainer_gender").value;
    payload.age = document.getElementById("trainer_age").value;
    console.log(payload);

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_trainer', true);
    //req.open("POST", 'http://localhost:8042/insert_trainer', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/insert_trainer', true);

    req.addEventListener('load', function () {
        if (req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);
            console.log(response);

            updateTable(response, true, false);

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

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/insert_pokemon', true);
    //req.open("POST", 'http://localhost:8042/insert_pokemon', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/insert_pokemon', true);

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

    var payload = { table: null, row: null };
    payload.table = getPayload();
    payload.row = rowID;

    console.log(payload);

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/delete_row', true);
    //req.open("POST", 'http://localhost:8042/delete_row', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/delete_row', true);

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

// returns which page to allow an update/edit option
function isUpdateButton() {

    var updateButton = false

    switch (document.title) {
        case "Battle Table":
            updateButton = true;
            break;
        case "Trainer Pokemon Inventory":
            updateButton = true;
            break;
    }

    return updateButton;
}

// returns which page an option to edit
function isEditOption() {
    var editOption = 0

    switch (document.title) {
        case "Battle Table":
            editOption = 1;
            break;
        case "Trainer Pokemon Inventory":
            editOption = 2;
            break;
    }

    return editOption;
}

// returns which page to add a delete button
function isDeleteButton() {

    var deleteButton = false

    switch (document.title) {
        case "Battle Table":
            deleteButton = true;
            break;
        case "Trainer Pokemon Inventory":
            deleteButton = true;
            break;
    }

    return deleteButton;
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
            drop_call("pokemonTypes", "selectID");
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

    //req.open("POST", 'http://flip3.engr.oregonstate.edu:16066/view_database', true);
    //req.open("POST", 'http://localhost:8042/view_database', true);
    req.open("POST", 'http://flip1.engr.oregonstate.edu:9359/view_database', true);

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
    //filter = input.value
    //selInput1.options[selInput1.selectedIndex].value;
    filter = input.options[input.selectedIndex].text;
    table = document.getElementById("table");
    tr = table.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {
        td = tr[i].childNodes;
        //td = tr[i].getElementsByTagName("td")[0];
        // console.log(filter);
        // console.log(td);
        if (td) {
            if (filter == 'Show All Types') {
                tr[i].style.display = "";
            }
            else if (filter == td[2].innerHTML || filter == td[3].innerHTML) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}