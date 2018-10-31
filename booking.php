<?php
session_start();
include("header.php");
?>
		<div id="propertiesSelector">
            <h1>Замовлення проїзних документів</h1>
            <div class="area">
                <div class="focusArea">
                    <h2>↓ Виберіть маршрут ↓</h2><br>
                    <div>
                        <table>
                            <tr>
                                <td class="propertyName">Дата відправлення:</td><td><input id="departureDate" type="date" placeholder ="→ Введіть дату ←"
                            min='<?php echo date("Y-m-d");?>'
                            max='<?php echo ((int)date("m") > 10
                                ? ((int)date("Y") + 1)."-".(((int)date("m") + 1) % 12 + 1)."-".date("d")
                                : (int)date("Y")."-".((int)date("m") + 1)."-".date("d"));?>' name="date" class="emptyInput" oninput="DepartureDateChanged()"></td>
                            </tr>
                            <tr>
                                <td class="propertyName">Станція відправлення:</td><td><input id="departurePlace" class="emptyInput" oninput="DeparturePlaceChanged()" placeholder="→ Введіть станцію ←">
                            <ul class="StationList" id="departurePlaces">
                            </ul></td>
                            </tr>
                            <tr>
                                <td colspan="2" style="text-align: center;"><button onclick="SwapRoute()">↑↓</button></td>
                            </tr>
                            <tr>
                                <td class="propertyName">Станція прибуття:</td><td><input id="arrivalPlace" class="emptyInput" oninput="ArrivalPlaceChanged()" placeholder ="→ Введіть станцію ←">
                            <ul class="StationList" id="arrivalPlaces">
                            </ul></td>
                            </tr>
                        </table>
                    </div>
                    <button oninput="FindRoutes()">Пошук маршрутів</button>
                </div>
            </div>
            <div class="area">
                <h2>↑ Виберіть маршрут для вибору потягу ↑</h2>
                
            </div>
            <div class="area">
                <h2>↑ Виберіть потяг для вибору місць ↑</h2>
            </div>
            <div class="area">
                <h2>↑ Виберіть місця для встановлення їх властивостей ↑</h2>
            </div>
		</div>
	</body>
</html>
