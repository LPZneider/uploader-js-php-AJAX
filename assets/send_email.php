<?php
if(isset($_POST)){
    error_reporting(0);
     
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $comments = $_POST['comments'];

    $domain = $_SERVER['HTTP_HOST'];
    $to = "lpzneider@gmail.com";
    $subject = "Contacto desde el fomulario del sitio $domain: $subject ";
    $message = "
    <p>
    <ul>
    <li> Nombre: <b> $name</b></li>
    <li> Email: <b> $email</b></li>
    <li> Asunto:  $subject</li>
    <li> Comentarios: $comments</li>
    </ul>
    </p>
    ";

    $headers = "MIME-Version: 1.0\r\n"."Content-Type: text/html; charset=utf-8\r\n"."From: Envio Automatico No Responder <no-reply@$domain> ";

    $send_mail =  mail($to, $subject, $message, $headers);

if($send_mail){
    $res = [
        "err" => false,
        "message" => "tus datos han sido enviados"
    ]; 
}else{
    $res = [
        "err" => true,
        "message" => "Error al enviar tus datos. intenta nuevamente"
    ];
}
    header("Access-Control-Allow-Origin:*")
   // header("Access-Control-Allow-Origin: https://lpzneider.com")
    header('Content-Type: application/json');
    echo json_encode($res);
    exit;
}
?>