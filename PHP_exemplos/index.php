<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p id="demo"></p>

    <script>

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("demo").innerHTML = myObj[2];
        }
    };
    xmlhttp.open("GET", "demo_file_array.php", true);
    xmlhttp.send();

    </script>

    <?php 
      $titulo = 'Minha Página';
      echo '<h1>' . $titulo . '</h1>';

      // inteiro
      $php_var = 123;

      // constante
      define('ABC', 13);
      echo ABC . '<br>';

      // resource
      $myObj->name = "John";
      $myObj->age = 30;
      $myObj->city = "New York";

      $myJSON = json_encode($myObj);
      echo $myJSON;
    
      // array
      $cores = array('foo' => 456, 'bar' => 3);
      echo "<br/>";
      var_dump($cores);
      echo "<br/>";
      
      foreach ($cores as $key => $value)
        print($key . ": " . $value . "<BR/>");

    ?>

    <script type="text/javascript">
      var php_var1 = "<?php echo $php_var; ?>"
      var php_var2 = <?php echo json_encode($php_var); ?>

      console.log(typeof php_var1, php_var1)
      console.log(typeof php_var2, php_var2)
      console.log(<?php echo json_encode($_SERVER); ?>)
    </script>
  </body>
</html>