//1. Validate data & import vào table list student

const tbody = document.querySelector("tbody");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");

const rbMale = document.getElementById("rbMale");
const rbFemale = document.getElementById("rbFemale");

const btnSave = document.getElementById("btnSave");

let rgEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let rgPhone = /((09|03|07|08|05)+([0-9]{8})\b)/g;

function checkInput() {
	let gender = "";
	let student = [];
      let countChild = tbody.children.length;
	if (fname.value == null || fname.value == "") {
		alert("Họ tên không được để trống. Vui lòng nhập họ tên");
	} else if (!email.value.match(rgEmail)) {
		alert("Email không đúng định dạng. Vui lòng nhập lại");
	} else if (!phone.value.match(rgPhone)) {
		alert("Vui lòng nhập đúng định dạng số điện thoại Việt Nam");
	} else if (address.value == "" || address.value == null) {
		alert("Địa chỉ không được để trống. Vui lòng nhập đầy đủ");
	} else {
		if (rbMale.checked) gender = "Nam";
		else gender = "Nữ";
		student.push(countChild + 1 , fname.value, email.value, 
                  phone.value, address.value, gender);
            return student;
	}
}

function addStudents(student) {
	const tr = document.createElement("tr");
	for (const item of student) {
		const td = document.createElement("td");
		td.innerText = item;
		tr.appendChild(td);
	}

      const tdEdit = document.createElement("td");
      tdEdit.innerHTML = `<a href="#" class="edit">Edit</a> | <a href="#" class="delete">Delete</a>`;
      tr.appendChild(tdEdit);

      tbody.appendChild(tr);
}

btnSave.addEventListener("click", () => {
      let student = checkInput();
      addStudents(student);
})

// 2. Nhấn Delete --> xóa student

const btnDeletes = document.querySelectorAll("a[class='delete']");
console.log(btnDeletes); // --> Thầy xem giúp em đoạn này ---> length : 0 
btnDeletes.forEach(function(btnDel) {
      btnDel.addEventListener("click", () => {
            let row = btnDel.parentNode.parentNode;
            row.parentNode.removeChild(row);
      })
})