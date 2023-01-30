# OWL Sale Sumary

Este módulo añade un widget como componente de la librería OWL.
Se mostrará un resumen de las ventas de cada cliente.

# Implementación:
- Declarar un nuevo componente y registrarlo junto su plantilla
- Se Extiende FormRenderer para montar el componente sobre cualquier <div> con
una clase concreta
- Posteriormente añadimos la propiedad partner al componente, con un UseState
- A la hora de montar el componente, hacemos previamente una llamada rpc para
obtener los datos del cliente del pedido de venta, una vez estén disponibles
se lo mandamos al constructor
- En la plantilla se puede usar directamente