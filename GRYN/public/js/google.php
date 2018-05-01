<?php
content = file_get_contents('https://calendar.google.com/calendar/embed?src=greenyinzers%40gmail.com&ctz=America%2FNew_York');
$content = str_replace('</head>','<link rel="stylesheet" href="http://www.localhost:3000/google.css" /></head>', $content);
$content = str_replace('</title>','</title><base href="https://www.google.com/calendar/" />', $content);
echo $content;
