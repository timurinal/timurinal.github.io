document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-centre');

    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submit action

        const data = new FormData(form);
        const url = form.action;  // The URL from the 'action' attribute of the form

        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    // Display a success message and reset the form
                    alert("Thanks for your submission!");
                    form.reset();
                } else {
                    // Handle errors or non-ok responses
                    alert("Oops! There was a problem with your submission. Please try again.");
                }
            })
            .catch(error => {
                // Handle any errors that occur during fetch
                alert("Error: " + error);
            });
    });
});