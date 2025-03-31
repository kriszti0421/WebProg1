<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

echo "data: " . date("H:i:s") . "\n\n";
flush();
sleep(1);
?>
