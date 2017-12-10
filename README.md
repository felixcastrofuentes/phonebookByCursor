# Phonebook by Cursor
Prueba técnica de cursor. (App Híbrida Ionic)

## Versiones del Framework 
- Ionic 3.9.2
- Ionic App Scripts: 3.1.5
- Angular Core: 5.0.3
- Angular Compiler CLI: 5.0.3
- Node: 8.4.0

## Contenido
Posee 3 pantallas
- Home: muesta listado de personas, se puede buscar por nombre y/o apellidos. El listado posee el componente ion-refresher para el pulldown.
- Filtro región/comunas (modal)
- Detalle de persona: muestra los datos de la persona. Muestra un toast de alerta cuando el rut o teléfono es inválido(además los cambia a color rojo...). Si el teléfono es válido muestra un botón "LLAMAR" el cual lleva al teclado de llamada.

## Instalación
- Clonar repositorio
- npm install
- ionic cordova prepare
- ionic cordova run android