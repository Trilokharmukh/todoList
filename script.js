showData();

function saveData() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    console.log(title, description);

    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    userRecord.push({
        "title": title,
        "description": description
    })

    localStorage.setItem("todoRecord", JSON.stringify(userRecord));
    showData();
}


function showData() {
    let userRecord = JSON.parse(localStorage.getItem("todoRecord"))    // fetch data of "user" key and story in array
        ? JSON.parse(localStorage.getItem("todoRecord"))
        : []

    console.log("showData=\n", userRecord);

    let tableData = document.getElementById("tableData");
    tableData.innerHTML = `
            <thead>
                <tr>
                    <th  style="width:40px">S.No.</th>
                     <th style="width:30%">Title</th>
                     <th style="width:30%">Description</th>
                     <th style="width:30%">Date</th>
                     <th style="width:30%">Action</th>
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
                <td><button type="button" onClick="deleteTodo(${i})">Delete</button><button>Edit</button></td>    
                
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

function deleteTodo(currTodo)
{
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