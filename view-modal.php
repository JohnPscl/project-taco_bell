<?php
session_start();

  include("connection.php");
  include("functions.php");

  $user_data = check_login($con);

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>View PDF</title> <!-- Default title; will be replaced dynamically -->

    <!-- Styles (Optional: Add Your Styling) -->
    <style>
      body {
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f4;
      }
      iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
  </head>
  <body>
    <!-- Display the PDF -->
    <iframe id="modal-pdf" src="" type="application/pdf"></iframe>

    <!-- JavaScript -->
    <script>
      document.addEventListener("DOMContentLoaded", () => {
        const urlParams = new URLSearchParams(window.location.search);
        const pdfSrc = urlParams.get("pdfSrc");

        if (pdfSrc) {
          // Populate the iframe with the PDF source
          const modalPdf = document.getElementById("modal-pdf");
          modalPdf.src = pdfSrc;

          // Extract the filename from the pdfSrc
          const fileName = pdfSrc.split('/').pop().split('#')[0]; // Remove path and hash parameters
          const cleanFileName = decodeURIComponent(fileName); // Decode to handle encoded characters

          // Set the page title to the filename
          document.title = cleanFileName;
        } else {
          document.body.innerHTML = "<p>PDF not found.</p>"; // Show error if no source
        }
      });
    </script>
  </body>
</html>
