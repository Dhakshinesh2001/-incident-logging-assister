// content.js - Injected into the ServiceNow page

// Function to extract assignment data
function captureAssignmentDetails() {
    try {
        const assignedToNode = document.getElementById("sys_display.original.incident.assigned_to");
        const assignmentGroupNode = document.getElementById("sys_display.original.incident.assignment_group");

        if (!assignedToNode || !assignmentGroupNode) return;

        const assignedTo = assignedToNode.getAttribute("value") || assignedToNode.value;
        const assignmentGroup = assignmentGroupNode.getAttribute("value") || assignmentGroupNode.value;

        const now = new Date();
        const date = now.toLocaleDateString();
        const time = now.toLocaleTimeString();

        chrome.storage.local.get({ logs: [] }, function (result) {
            const logs = result.logs;
            const assignedFrom = localStorage.getItem("assigned_from") || "Unknown";

            const newEntry = {
                date,
                time,
                assignedFrom,
                assignedTo,
                assignmentGroup,
                incidents: 1,
                type: "Incident"
            };

            logs.push(newEntry);
            chrome.storage.local.set({ logs });
            console.log("Logged assignment:", newEntry);
        });
    } catch (e) {
        console.error("Error capturing assignment details:", e);
    }
}

// Listen for Update button clicks
function setupListeners() {
    const btn1 = document.getElementById("sysverb_update");
    const btn2 = document.getElementById("sysverb_update_bottom");

    if (btn1) btn1.addEventListener("click", captureAssignmentDetails);
    if (btn2) btn2.addEventListener("click", captureAssignmentDetails);
}

// Wait for DOM to load
window.addEventListener("load", () => {
    setTimeout(setupListeners, 2000); // delay to ensure DOM is ready
});