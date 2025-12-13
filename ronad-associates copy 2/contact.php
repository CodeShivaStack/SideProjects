<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  function clean($data) {
    return htmlspecialchars(strip_tags(trim($data)));
  }

  $name = clean($_POST['name']);
  $phone = clean($_POST['phone']);
  $email = clean($_POST['email']);
  $service = clean($_POST['service']);
  $message = clean($_POST['message']);

  if (!$name || !$phone) {
    die("Required fields missing.");
  }

  $to = "your-email@example.com";
  $subject = "New Consultation Request - Ronad Associates";
  $body = "
Name: $name
Phone: $phone
Email: $email
Service: $service

Message:
$message
";

  $headers = "From: noreply@ronadassociates.com";

  if (mail($to, $subject, $body, $headers)) {
    echo "Thank you! We will contact you soon.";
  } else {
    echo "Error sending message.";
  }
}
?>
