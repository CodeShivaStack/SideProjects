<?php
if($_SERVER["REQUEST_METHOD"]==="POST"){
 function clean($d){ return htmlspecialchars(strip_tags(trim($d))); }

 $name=clean($_POST["name"]);
 $phone=clean($_POST["phone"]);
 $email=clean($_POST["email"]);
 $service=clean($_POST["service"]);
 $msg=clean($_POST["message"]);

 if(!$name || !$phone){ die("Missing required fields"); }

 $to="your-email@example.com";
 $subject="New Enquiry - Ronad Associates";
 $body="Name: $name\nPhone: $phone\nEmail: $email\nService: $service\n\n$msg";
 $headers="From: noreply@ronadassociates.com";

 mail($to,$subject,$body,$headers);
 echo "Thank you! We will contact you shortly.";
}
?>
