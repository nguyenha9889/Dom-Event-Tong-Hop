const studentId = document.getElementById("studentId");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const address = document.getElementById("address");

function validateInput() {
      const rgEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      const rgPhone = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
      if (!studentId.value.startsWith("SV")) {
            alert("Mã sinh viên phải bắt đầu bằng SV");
            return false;
      }
      if (fname.value == "") {
            alert("Họ và tên không để trống");
            return false;
      }
      if (!rgEmail.test(email.value)) {
            alert("Email không đúng định dạng");
            return false;
      }
      if (!rgPhone.test(phone.value)) {
            alert("Số điện thoại không đúng định dạng số điện thoại Việt Nam");
            return false;
      }
      if (address.value == "") {
            alert("Địa chỉ không để trống");
            return false;
      }
      return true;
}

const data = [];
const tbody = document.querySelector("tbody");
function renderData() {
      tbody.innerHTML = "";
      for (let i = 0; i < data.length; i++) {
            tbody.innerHTML += 
            `<tr>
            <td>${i+1}</td>
            <td>${data[i][0]}</td>
            <td>${data[i][1]}</td>
            <td>${data[i][2]}</td>
            <td>${data[i][3]}</td>
            <td>${data[i][4]}</td>
            <td>${data[i][5]}</td>
            <td>
                  <i class="fa-solid fa-pen" onclick="editStudent('${data[i][0]}')"></i>
                  <i class="fa-solid fa-trash-can" onclick="deleteStudent(this)"></i>
            </td>
      </tr>`;
      }
}
let action = "addNew";
const btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", (e) => {
      e.preventDefault();
      if (validateInput()) {
            let index = getRowIndex(studentId.value);
            if (action == "edit") {
                  data[index][0] = studentId.value;
                  data[index][1] = fname.value;
                  data[index][2] = email.value;
                  data[index][3] = phone.value;
                  data[index][4] = address.value;
                  data[index][5] = document.querySelector("input[name='gender']:checked").value;
                  studentId.readOnly = false;
                  renderData();
                  resetForm();
            }
            else {
                  if (index >= 0) {
                        alert("Đã tồn tại mã sinh viên này trong danh sách");
                  } else {
                        const gender = document.querySelector("input[name='gender']:checked");
                        data.push([studentId.value, fname.value,
                        email.value, phone.value, address.value, gender.value]);
                        renderData();
                        resetForm();
                  }
            } 
      }
});

function editStudent(id) {
      let index = getRowIndex(id);
      if (index >=0) {
            studentId.value = data[index][0];
            fname.value = data[index][1];
            email.value = data[index][2];
            phone.value = data[index][3];
            address.value = data[index][4];
            
            if (data[index][5] == "Nam") {
                  document.querySelector("input[value='Nam']").checked = true;
            } else
            document.querySelector("input[value='Nữ']").checked = true;
            action = "edit";
            studentId.readOnly = true;
      }
}

function getRowIndex(id) {
      for (let i = 0; i < data.length; i++) {
           if (id == data[i][0]) {
                  return i;
           }
      }
      return -1;
}

function resetForm() {
      studentId.value = "";
      fname.value = "";
      email.value = "";
      phone.value = "";
      address.value = "";
      document.querySelector("input[value='Nam']").checked = true;
      selectedRow = null;
}

function deleteStudent(td) {
      if (confirm("Do you want to delete this student ?")) {
            selectedRow = td.parentElement.parentElement;
            const table = document.querySelector("table");
            table.deleteRow(selectedRow.rowIndex);
      }
}
