function formSubmit(){
    console.log("hello");
    
    var formData=inputData();
    console.log(formData);
    insertRecord(formData);
    clearForm();
}

function inputData(){
    var data={};
    data["name"]=document.getElementById("name").value;
    data["mail"]=document.getElementById("mail").value;
    data["phone"]=document.getElementById("phone").value;
    data["gender"]=document.querySelector('input[name="gender"]:checked').value;

    return data;
}

function insertRecord(formData){

    var table=document.querySelector("#details");
    var newRow=document.createElement("tr");

    var nameCell=document.createElement("td");
    nameCell.textContent=formData.name;
    newRow.appendChild(nameCell);

    var mailCell=document.createElement("td");
    mailCell.textContent=formData.mail;
    newRow.appendChild(mailCell);

    var phoneCell=document.createElement("td");
    phoneCell.textContent=formData.phone;
    newRow.appendChild(phoneCell);

    var genderCell=document.createElement("td");
    genderCell.textContent=formData.gender;
    newRow.appendChild(genderCell);

    var btnCell=document.createElement("td");
    btnCell.innerHTML=`<a>Edit</a>
                    <a>Delete</a>`;
    newRow.appendChild(btnCell);

    table.append(newRow);

}

function clearForm(){
    document.getElementById("name").value="";
    document.getElementById("mail").value="";
    document.getElementById("phone").value="";
    var radios=document.querySelectorAll('input[name="gender"]');
    radios.forEach(radio => {
        radio.checked=false;
    });
}