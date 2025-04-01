<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');

while (true) {
    $data = date("H:i:s"); // Jelenlegi idő elküldése

    echo "data: {$data}\n\n";
    ob_flush();
    flush();
    
    sleep(1); // 1 másodpercenként küld adatot
}
?>
