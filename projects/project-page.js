document.addEventListener("DOMContentLoaded", function() {
    // List of statuses
    let statuses = ["completed", "in-dev", "planned"];

    // Process each status
    statuses.forEach((status) => {
        // Select element with specific classes
        let element = document.querySelector(`.status.${status}`);

        // Ensure an element was found
        if (element) {
            // Change the text content based on the class
            switch (status) {
                case "completed":
                    element.textContent = "Completed";
                    break;
                case "in-dev":
                    element.textContent = "In Development";
                    break;
                case "planned":
                    element.textContent = "Planned";
                    break;
            }
        }
    });
});