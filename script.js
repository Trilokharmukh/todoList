let editIndex;
showData();


// ---------saveData funtion ------ use to save data in localStorage
function saveData() {
    let title = document.getElementById("title").value;                  // get value of title input box
    let description = document.getElementById("description").value;      // get value of description input box
    console.log(title, description);

    if(title==="" || description ===""){
        alert("input field must be filled")
        return;
    }

    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))     // create arr and assign previous localStorage value
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    userRecord.push({                                                  // push value in array  
        "title": title,
        "description": description
    })

    localStorage.setItem("todoRecord", JSON.stringify(userRecord));    // finnaly store data in localStorage

    clearText()
    showData();

}




// ----------------- showData function ------------------- 

function showData() {
    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    console.log("showData=\n", userRecord);

    let tableData = document.getElementById("tableData");       // create table
    tableData.innerHTML = `
            <thead>
                <tr>
                    <th  style="width:1%">S.No.</th>
                     <th style="width:20%">Title</th>
                     <th style="width:40%">Description</th>
                     <th style="width:10%">Date</th>
                     <th style="width:10%">Action</th>
                </tr>
           </thead>`;

    let sn = 1;
    for (let i = userRecord.length - 1; i => 0; i--) {       // fetch array data
        let tempData = document.getElementById("tableData").innerHTML

        // tableData = tableData.innerHTML;                 // now show localStorage data in table

        tableData.innerHTML = tempData + `       
            <tr>
                <td>${sn++}</td>
                <td>${userRecord[i].title}</td>    
                <td>${userRecord[i].description}</td>    
                <td>${dateFormate()}</td>    
                <td><button type="button" onClick="deleteTodo(${i})">Delete</button> 
                <button type="button" onClick="editTodo(${i})">Edit</button></td>    
                
            </tr>`
    }

}
//--------------------------end show data funtion------------------------



//---------date formate-------------
function dateFormate() {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    const m = d.getMonth() + 1;
    let month = months[d.getMonth()];
    const y = d.getFullYear();
    const dd = d.getDate();

    return dd + " " + month + " " + y;
}




// ------------ delete current todo function--------------------------

function deleteTodo(currTodo) {
    console.log("delete called....");
    console.log("delete called....", currTodo);

    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))    // fetch data of "user" key and story in array
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    console.log(userRecord);

    userRecord.splice(currTodo, 1)

    localStorage.setItem("todoRecord", JSON.stringify(userRecord));
    showData();
    // localStorage.removeItem(todoRecord.userRecord[currTodo]);
}


// -----------------  edit current todo ---------------------
//  --------------table ke edit button pr click krne se ye function call hoga------


function editTodo(currTodo) {
    document.querySelector(".inputSection").style.display = "none";
    document.querySelector(".editSection").style.display = "block";

    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    let todoData = userRecord[currTodo];

    document.getElementById("editTitle").value = todoData.title;            // put current value in input box
    document.getElementById("editDescription").value = todoData.description;

    editIndex = currTodo;

    console.log("editIndex = ", editIndex);
}

function editData() {
    
    console.log("editIndex = ", editIndex);
    

    let title = document.getElementById("editTitle").value;            // put current value in input box
    let description = document.getElementById("editDescription").value;

    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    userRecord[editIndex] = { "title": title, "description": description }

    localStorage.setItem("todoRecord", JSON.stringify(userRecord));

    document.querySelector(".inputSection").style.display = "block";
    document.querySelector(".editSection").style.display = "none";

    showData()

}

function cancel() {
    document.querySelector(".inputSection").style.display = "block";
    document.querySelector(".editSection").style.display = "none";

}




function clearText() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
}



function deleteAll() {
    if (confirm("are you really want to delete all record?? \nif record is deleted they can not be retrived"))
        localStorage.clear();

    clearText();
    location.reload();
}