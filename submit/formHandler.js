document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("snippetForm");
    const staticmanURL = "https://countermap.onrender.com/";
    const staticmanEndpoint = `${staticmanURL}v3/entry/github/tripledoublev/html.blue/main/submissions/`;
  
    async function verifyServerResponds() {
      try {
        // Sending a request to wake up the server
        const response = await fetch(staticmanURL, {
          method: 'GET',
        });
        if (response.ok) {
          const text = await response.text(); // Retrieves the response body as plain text
          if (text.includes("Hello from Staticman version 3.0.0!")) {
            console.log("Staticman is active:", text.match(/Hello from Staticman version 3.0.0!/g));
          } else {
            console.log('Server response does not include the expected message.');
          }
        } else {
          console.log('Server response:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error waking up the server:', error);
      }
    }
  
    verifyServerResponds().catch(error => console.error('Error in verifyServerResponds:', error)); // Handle errors from the initial server check
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
      console.log('submiting form')
      const name = document.getElementById("name").value;
      const snippet = document.getElementById("snippet").value;
  
      const payload = {
        fields: {
          name: name,
          snippet: snippet
        }
      };
  
      fetch(staticmanEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        if (response.ok) {
          console.log("Form submitted successfully:", response.status, response.statusText);
          form.reset(); // Reset the form fields after successful submission
        } else {
          console.error("Error submitting form:", response.status, response.statusText);
        }
      })
      .catch(error => console.error("Error submitting form:", error));
    });
  });
  