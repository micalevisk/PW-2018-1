<?php 

$method = "POST";

foreach (${'_'.$method} as $name => $value) {
  echo "<b>{$name}</b>: {$value} <BR>";
}

?>