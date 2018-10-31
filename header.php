<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<!-- <meta http-equiv="refresh" content="10"> -->
		<title>Railway-Booker</title>
		<link rel = 'stylesheet' href = '<?php if(!isset($_SESSION['dark'])) echo "dark"; else echo "light" ?>.css' type = 'text/css'>
		<script src="index.js"></script>
	</head>
	<body>
		<header>
			<img src="logo.png" alt="Logo" width="20%">
			<table id="mainMenu" style="width: 100%">
				<tr>
					<td><a href="index.php">Головна</a></td>
					<td><a href="info.php">Розклад руху</a></td>
					<td><a href="booking.php">Замовлення квитків</a></td>
					<?php
					if(isset($_SESSION['user']))
					{
						echo '<td><a href="register.php">Обліковий запис</a></td>';
						echo '<td><a href="register.php">Вийти</a></td>';
					}
					else
					{
						echo '<td><a href="register.php">Зареєструватися</a></td>';
						echo '<td><a href="register.php">Увійти</a></td>';
					}
					?>
				</tr>
			</table>
		</header>
