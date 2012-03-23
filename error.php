<?php header('Content-Type: text/html; charset=utf-8'); ?><!doctype html>
<html lang="en" class="no-js">
 <head>
  <style>
.error { position:relative; padding:1em 1.5em; background-color:#ffffd9; color:#333; font-size:0.5em; border-radius:8px }
.error:before { position:absolute; content:''; top:-18px; left:32px; border:9px solid transparent; border-bottom:9px solid #ffffd9 }
.error code { display:block; font-family:monospace }
  </style>
 </head>
 <body>
<?php
$error = filter_input(INPUT_GET, 'error', FILTER_SANITIZE_NUMBER_INT);
$error_codes = array(401, 403, 404, 500);
if (!is_null($error) && in_array($error, $error_codes)) {
	echo '<div class="error">Sorry, but we got an error with the number ' . $error . ' while you attempted to request the file <code>' . $_SERVER['REQUEST_URI'] . '</code></div>';
}
?>
</body>
</html>
