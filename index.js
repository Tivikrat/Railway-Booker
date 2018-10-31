function GetStationsSearchResults(input, list)
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
        if(results.length > 1)
        {
            input.className = 'inputElement';
            input.style.borderBottomStyle = "dashed";
            input.style.borderBottomWidth = "1px";
        }
        else
        {
            input.className = 'incorrectInput';
        }
        for (let index = 0; index < results.length - 1; index++) {
            if(input.value.toLowerCase() == results[index].toLowerCase())
            {
                input.className = 'correctInput';
                if(results.length == 2)
                {
                    return;
                }
            }
            var li = document.createElement("LI");
            li.innerText = results[index];
            li.style.cursor = "pointer";
            li.onclick = function(){
                input.value = this.innerText;
                input.className = 'correctInput';
                list.hidden = true;
                input.style.borderBottomStyle = "solid";
                input.style.borderBottomWidth = "2px";
            }
            list.appendChild(li);
        }
        list.hidden = false;
        list.style.width = input.offsetWidth + "px";
    };
    xhr.send(null);
}
function DeparturePlaceChanged()
{
    GetStationsSearchResults(departurePlace, departurePlaces);
}
function ArrivalPlaceChanged()
{
    GetStationsSearchResults(arrivalPlace, arrivalPlaces);
}
function DepartureDateChanged()
{
    if(departureDate.value.length)
    {
        departureDate.className = "correctInput";
    }
    else
    {
        departureDate.className = "inputElement";
    }
}
function FindRoutes()
{
    
}
function SwapRoute()
{
    [departurePlace.value, arrivalPlace.value] = [arrivalPlace.value, departurePlace.value];
    [departurePlace.className, arrivalPlace.className] = [arrivalPlace.className, departurePlace.className];
}
