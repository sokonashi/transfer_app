document.getElementById("recordForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const reason = document.getElementById("reason").value;

  const record = { reason, fromDate, toDate };
  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));

  this.reset();
  renderTable();
});

function renderTable() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  const tbody = document.querySelector("#recordTable tbody");
  tbody.innerHTML = "";

  records.forEach((rec, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${rec.fromDate}</td>
      <td>${rec.toDate}</td>
      <td>${rec.reason}</td>
      <td><button onclick="deleteRecord(${index})">削除</button></td>
    `;
    tbody.appendChild(row);
  });
}

function deleteRecord(index) {
  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.splice(index, 1);
  localStorage.setItem("records", JSON.stringify(records));
  renderTable();
}

renderTable();
