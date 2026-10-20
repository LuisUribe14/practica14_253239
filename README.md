# practica14_253239

### Preguntas de la practica

### ¿Por qué en la pestaña Red salen dos peticiones al cargar?
Pq en React puede ejecutar el efecto mas de una vez para ayudar a detectar problemas por eso pueden aparecer dos peticiones aunque nosotros solo hayamos hecho una llamada 
a la api

### ¿Qué pasa si quitas el arreglo de dependencias del efecto?
El efecto se ejecutaria cada vez que el componente se vuelve a mostrar como dentro del efecto tambien se actualizan datos se podrian generar peticiones repetidas
constantemente a la api

### ¿Qué hace e.preventDefault() y qué pasa si lo quitas?
e.preventDefault() evita que el formulario recargue la pagina al enviarse entoces si se quita el navegador haria el comportamiento normal del formulario la pagina se recargaria y 
se podria perder la informacion que react estaba manejando
