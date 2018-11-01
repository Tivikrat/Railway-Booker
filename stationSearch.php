<?php
$stations = ["Київ", "Полтава", "Харків", "Одеса", "Чернігів", "Суми", "Запоріжжя", "Дніпро", "Севастополь", "Черкаси", "Вінниця", "Львів", "Чернівці", "Рівне", "Житомир"];
if(isset($_GET) && isset($_GET["input"]) && strlen($_GET["input"]) > 0)
{
    $text = trim(mb_strtolower($_GET["input"], 'UTF-8'));
    foreach ($stations as $station) {
        $result = [];
        if(strpos(mb_strtolower($station, 'UTF-8'), $text) === 0)
        {
            echo $station;
            echo "₴";
            $stations = array_diff($stations, array($station));
        }
    }
    foreach ($stations as $station) {
        $result = [];
        if(strpos(mb_strtolower($station, 'UTF-8'), $text) !== false)
        {
            echo $station;
            echo "₴";
        }
    }
}
?>
