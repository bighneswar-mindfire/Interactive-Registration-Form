interface UserData {
    name:string,
    mail:string,
    phone:string,
    gender:string,
}

function formSubmit():void{
    console.log("hello");
    
    var formData:UserData=inputData();
    console.log(formData);
    insertRecord(formData);
    clearForm();
}

function inputData():UserData{
    var data:UserData={
        name:(document.getElementById("name") as HTMLInputElement).value,
        mail:(document.getElementById("mail") as HTMLInputElement).value,
        phone:(document.getElementById("phone") as HTMLInputElement).value,
        gender:(document.querySelector('input[name="gender"]:checked') as HTMLInputElement).value,
    };
    

    return data;
}

function insertRecord(formData : UserData):void{

    var table=document.querySelector("#details") as HTMLTableElement;
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

function clearForm():void{
    (document.getElementById("name") as HTMLInputElement).value="";
    (document.getElementById("mail") as HTMLInputElement).value="";
    (document.getElementById("phone") as HTMLInputElement).value="";
    var radios=document.querySelectorAll('input[name="gender"]') as NodeListOf<HTMLInputElement>;
    radios.forEach(radio => {
        radio.checked=false;
    });
}