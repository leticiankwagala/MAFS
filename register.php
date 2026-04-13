<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Collect and Sanitize Data
    $fullName = htmlspecialchars($_POST['full-name']);
    $email    = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $phone    = htmlspecialchars($_POST['phone']);
    $location = htmlspecialchars($_POST['location']);
    $message  = htmlspecialchars($_POST['message']);
    
    // Handle Skills (Checkboxes are arrays)
    $skills = isset($_POST['skills']) ? $_POST['skills'] : [];
    $skillList = implode(", ", $skills);

    // 2. Simple Validation
    if (empty($fullName) || empty($email)) {
        echo "Please fill in all required fields.";
        exit;
    }

    // 3. Process the Data 
    // For now, let's simulate sending an email or saving to a log
    $to = "your-email@example.com"; // Change to your actual email
    $subject = "New Volunteer Registration: $fullName";
    
    $body = "New volunteer details:\n\n";
    $body .= "Name: $fullName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Location: $location\n";
    $body .= "Skills: $skillList\n";
    $body .= "Message: $message\n";

    $headers = "From: webmaster@makeafacesmile.org";

    // 4. Send Email & Redirect
    if (mail($to, $subject, $body, $headers)) {
        // Redirect back to a success page
        header("Location: thank-you.html");
        exit;
    } else {
        echo "Something went wrong. Please try again.";
    }
}
?>