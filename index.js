window.onload = function()
{
    CheckRouteSearch();
    var from = getCookie("from");
    if(from)
    {
        departurePlace.value = from;
    }
    DeparturePlaceChanged();
    var to = getCookie("to");
    if(to)
    {
        arrivalPlace.value = to;
    }
    ArrivalPlaceChanged();
    var date = getCookie("date");
    if(date)
    {
        departureDate.value = date;
    }
    DepartureDateChanged();
}
function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function GetStationsSearchResults(input, secondInput, list)
{
    while(list.firstChild)
    {
        list.removeChild(list.childNodes[0]);
    }
    input.style.borderBottomStyle = "solid";
    input.style.borderBottomWidth = "2px";
    var text = input.value.trim();
    if(text.length == 0)
    {
        input.className = 'emptyInput';
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/stationSearch.php?input=' + text, true);
    xhr.onload = function () {
        var results = xhr.responseText.split('₴', 6);
        for (let index = 0; index < results.length - 1; index++) {
            if(input.value.toLowerCase() == results[index].toLowerCase())
            {
                input.className = 'correctInput';
                document.cookie = (input == departurePlace ? "from=" : "to=") + input.value;
                if(results.length == 2)
                {
                    input.style.borderBottomStyle = "solid";
                    input.style.borderBottomWidth = "2px";
                    CheckRouteSearch();
                    return;
                }
            }
            var li = document.createElement("LI");
            li.innerText = results[index];
            li.style.cursor = "pointer";
            li.onclick = function(){
                input.value = this.innerText;
                document.cookie = (input == departurePlace ? "from=" : "to=") + input.value;
                input.className = 'correctInput';
                list.hidden = true;
                input.style.borderBottomStyle = "solid";
                input.style.borderBottomWidth = "2px";
                CheckRouteSearch();
            }
            list.appendChild(li);
        }
        if(list.childNodes.length)
        {
            input.className = 'inputElement';
            input.style.borderBottomStyle = "dashed";
            input.style.borderBottomWidth = "1px";
        }
        else
        {
            input.className = 'incorrectInput';
        }
        list.hidden = false;
        list.style.width = input.offsetWidth + "px";
        CheckRouteSearch();
    };
    xhr.send(null);
}
function DeparturePlaceChanged()
{
    GetStationsSearchResults(departurePlace, arrivalPlace, departurePlaces);
}
function ArrivalPlaceChanged()
{
    GetStationsSearchResults(arrivalPlace, departurePlace, arrivalPlaces);
}
function DepartureDateChanged()
{
    if(departureDate.value.length)
    {
        departureDate.className = "correctInput";
        document.cookie = "date=" + departureDate.value;
    }
    else
    {
        departureDate.className = "inputElement";
    }
    CheckRouteSearch();
}
function CheckRouteSearch()
{
    if (departureDate.className == "correctInput") {
        if(departurePlace.className == "correctInput") {
            if(arrivalPlace.className == "correctInput") {
                if(departurePlace.value != arrivalPlace.value)
                {
                    routesSearch.className = "complete";
                    routesSearch.disabled = false;
                    return true;
                }
                else
                {
                    routeSearchNote.innerText = "Назви станцій співпадають!";
                    departurePlace.focus();
                }
            }
            else
            {
                routeSearchNote.innerText = "Не вказана станція прибуття!";
                arrivalPlace.focus();
            }
        }
        else
        {
            routeSearchNote.innerText = "Не вказана станція відправлення!"
            departurePlace.focus();
        }
    }
    else
    {
        routeSearchNote.innerText = "Не вказана дата відправлення!"
        departureDate.focus();
    }
    routesSearch.className = "incomplete";
    routesSearch.disabled = true;
    routesSearch.focus();
    return false;
}
function FindRoutes()
{
    if(CheckRouteSearch()){
        while(routes.firstChild)
        {
            routes.removeChild(routes.childNodes[0]);
        }
        var from = departurePlace.value.trim();
        var to = arrivalPlace.value.trim();
        var date = departureDate.value;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/routeSearch.php?from=' + from + "&to=" + to + "&date=" + date, true);
        xhr.onload = function () {
            var results = xhr.responseText.split('@');
            if(results.length > 1)
            {
                routes.innerHTML = "<tr><th>№</th><th>Маршрут</th><th>Час руху</th><th>Тривалість</th><th>Кількість місць</th><th>Вибрати</th></tr>";
                for (let index = 0; index < results.length - 1; index++) {
                    var info = results[index].split("^");
                    var tr = document.createElement("tr");
                    var N = document.createElement("td");
                    N.innerText = info[0];
                    var R = document.createElement("td");
                    R.innerText = info[1];
                    var TT = document.createElement("td");
                    TT.innerHTML = "Відправлення: " + info[2] + "<br>Прибуття: " + info[3];
                    var T = document.createElement("td");
                    T.innerText = info[4];
                    var P = document.createElement("td");
                    P.innerHTML = (info[7] == "0" ? info[8] + " плацкарт" : (info[8] == "0" ? info[7] + " купе" : info[7] + " купе" + "<br>" + info[8] + " плацкарт"));
                    var S = document.createElement("td");
                    S.innerHTML = (info[7] == "0" || info[8] == "0" ? "<button onclick='SelectTrain(" + info[9] + ")'>Вибрати</button>" : "<button onclick='SelectTrain(" + info[9] + ", true)'>Вибрати</button onclick='SelectTrain(" + info[9] + ")'><br><button>Вибрати</button>");
                    tr.appendChild(N);
                    tr.appendChild(R);
                    tr.appendChild(TT);
                    tr.appendChild(T);
                    tr.appendChild(T);
                    tr.appendChild(P);
                    tr.appendChild(S);
                    routes.appendChild(tr);
                }
                trainsExisting.className = "trainsExist";
                routesData.innerText = departureDate.value + ": " + departurePlace.value + " → " + arrivalPlace.value;
            }
            else
            {
                trainsExisting.className = "trainsDontExist";
            }
            document.cookie = "stage=1";
            routesFinder.className = "infoMode";
            trainFinder.className = "focusMode";
        };
        xhr.send(null);
    }
}
function SwapRoute()
{
    [departurePlace.value, arrivalPlace.value] = [arrivalPlace.value, departurePlace.value];
    [departurePlace.className, arrivalPlace.className] = [arrivalPlace.className, departurePlace.className];
}
function ChangeRoutes()
{
    document.cookie = "stage=0";
    routesFinder.className = "focusMode";
    trainFinder.className = "namerMode";
}

function SelectTrain(pathNum, compartment = false)
{
    
}
