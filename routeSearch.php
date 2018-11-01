<?php
$routes = [
    5436893 => ["Львів-Одеса", ["Львів" => ["2018-11-01 20:09", 0, 0], "Вінниця" => ["2018-11-02 02:26", 169.73, 110.46], "Одеса" => ["2018-11-02 11:48", 325.18, 213.24]], "481 Д", ["К-2" => [4,8,9,16,17,18,19,20,21,26,28,31,35,36],"К-5" => [5,9,10,11,12,13,14,15,19,20,26,32],"П-7" => [7,8,9,10,15,16,17,23,26,27],"П-8" => [23,26,28,29,30]]],
    5436894 => ["Львів-Київ", ["Львів" => ["2018-11-01 17:56", 0, 0], "Рівне" => ["2018-11-01 22:07", 142.15, 82.04], "Житомир" => ["2018-11-02 01:52", 240.26, 145.78], "Київ" => ["2018-11-02 4:43", 367.45, 228.47]], "502 Л", ["П-3" => [2, 5, 6, 9, 10, 13, 18],"П-4" => [4,14,25,36,45,46,47,48,52,55]]],
    5436895 => ["Львів-Харків", ["Львів" => ["2018-11-01 22:15", 0, 0], "Рівне" => ["2018-11-02 01:43", 175.08, 96.25], "Житомир" => ["2018-11-02 05:01", 295.82, 178.33], "Київ" => ["2018-11-02 07:42", 489.79, 285.15], "Полтава" => ["2018-11-02 14:23", 758.26, 596.24], "Харків" => ["2018-11-02 16:50", 985.26, 724.18]], "743 О", ["К-1" => [4,6,8,9,16,18,19,23,28,29], "К-2" => [8,9,17,18,19,20,21,22,23,24,25,26,27,28,29,30]]]
];
if(isset($_GET) && isset($_GET["from"]) && strlen($_GET["from"]) > 0 && isset($_GET["to"]) && strlen($_GET["to"]) > 0 && isset($_GET["date"]) && strlen($_GET["date"]) > 0)
{
    $from = trim(mb_strtolower($_GET["from"], 'UTF-8'));
    $to = trim(mb_strtolower($_GET["to"], 'UTF-8'));
    $date = (new DateTime($_GET["date"]))->format("Y-m-d");
    foreach ($routes as $route => $info) {
        $time = "";
        $CostK = 0;
        $CostP = 0;
        $PlacesK = 0;
        $PlacesP = 0;
        $fromFound = false;
        foreach ($info[1] as $point => $value) {
            if($fromFound)
            {
                if(mb_strtolower($point, 'UTF-8') == $to)
                {
                    $CostK = $value[1] - $CostK;
                    $CostP = $value[2] - $CostP;
                    foreach ($info[3] as $type => $places) {
                        if(strpos($type, "К") !== false)
                        {
                            $PlacesK += count($places);
                        }
                        else if(strpos($type, "П") !== false)
                        {
                            $PlacesP += count($places);
                        }
                    }
                    echo $info[2]."^".$info[0]."^".$time."^".$value[0]."^".(new DateTime($time))->diff(new DateTime($value[0]))->format("%h:%I")."^".$CostK."^".$CostP."^".$PlacesK."^".$PlacesP."^".$route."@";
                }
            }
            else
            {
                if(mb_strtolower($point, 'UTF-8') == $from)
                {
                    if($date != (new DateTime($value[0]))->format("Y-m-d"))
                    {
                        break;
                    }
                    $time = $value[0];
                    $CostK = $value[1];
                    $CostP = $value[2];
                    $fromFound = true;
                }
            }
        }
    }
}
?>
