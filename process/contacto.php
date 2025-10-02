<?php
$destino = "contactoangela@gmail.com";
$asunto  = "Nuevo mensaje desde formulario Web";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre     = htmlspecialchars(trim($_POST['nombre'] ?? ''));
    $correo     = filter_var(trim($_POST['correo'] ?? ''), FILTER_SANITIZE_EMAIL);
    $telefono   = htmlspecialchars(trim($_POST['telefono'] ?? ''));
    $tipo       = htmlspecialchars(trim($_POST['tipo'] ?? ''));
    $comentarios= htmlspecialchars(trim($_POST['comentarios'] ?? ''));

    if (empty($nombre) || empty($correo) || empty($telefono) || empty($tipo)) {
        die("❌ Por favor, completá todos los campos obligatorios.");
    }

    if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        die("❌ El correo ingresado no es válido.");
    }

    $mensaje  = "📩 Nuevo mensaje desde el formulario web\n\n";
    $mensaje .= "Nombre: $nombre\n";
    $mensaje .= "Correo: $correo\n";
    $mensaje .= "Teléfono: $telefono\n";
    $mensaje .= "Tipo de contacto: $tipo\n\n";
    $mensaje .= "Comentarios:\n$comentarios\n";

    $headers  = "From: $nombre <$correo>\r\n";
    $headers .= "Reply-To: $correo\r\n";

    if (mail($destino, $asunto, $mensaje, $headers)) {
        echo "✅ Tu mensaje fue enviado correctamente. En breve nos pondremos en contacto contigo.";
    } else {
        echo "❌ Hubo un error al enviar el mensaje. Por favor, intentalo nuevamente.";
    }
} else {
    echo "Acceso no permitido.";
}
?>
