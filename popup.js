document.getElementById("saveFrom").addEventListener("click", () => {
  const name = document.getElementById("assignedFrom").value;
  localStorage.setItem("assigned_from", name);
  alert("Saved!");
});

document.getElementById("copyBtn").addEventListener("click", () => {
  chrome.storage.local.get({ logs: [] }, function (result) {
    const csv = result.logs.map(row =>
      [row.date, row.time, row.assignedFrom, row.assignedTo, row.assignmentGroup, row.incidents, row.type].join("\t")
    ).join("\n");

    const textArea = document.getElementById("logBox");
    textArea.value = csv;
    textArea.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
  });
});