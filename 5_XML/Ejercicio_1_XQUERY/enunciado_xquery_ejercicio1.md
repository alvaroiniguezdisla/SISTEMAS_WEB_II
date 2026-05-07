# XQuery – Ejercicio 1

## Enunciado

Dado el siguiente XML:

```xml
<?xml version="1.0"?>
<bib>
  <book year="1994">
    <title>TCP/IP Illustrated</title>
    <author>Stevens</author>
    <publisher>Addison-Wesley</publisher>
    <price>65.95</price>
  </book>

  <book year="1994">
    <title>Principles of Databases</title>
    <author>Abiteboul</author>
    <publisher>Addison-Wesley</publisher>
    <price>35.89</price>
  </book>

  <book year="1992">
    <title>Advanced Programming in the Unix environment</title>
    <author>Stevens</author>
    <publisher>Addison-Wesley</publisher>
    <price>65.95</price>
  </book>

  <book year="2000">
    <title>Data on the Web</title>
    <author>Abiteboul</author>
    <author>Buneman</author>
    <author>Suciu</author>
    <publisher>Morgan Kaufmann Publishers</publisher>
    <price> 39.95</price>
  </book>

  <book year="1992">
    <title>The Economics of Technology and Content for Digital TV</title>
    <editor>
      Gerbarg
      <affiliation>CITI</affiliation>
    </editor>
    <publisher>Kluwer Academic Publishers</publisher>
    <price>129.95</price>
  </book>
</bib>
```

## Preguntas

1. Devuelve los títulos de todos los libros ordenados por precio de mayor a menor.

2. ¿Cuántos libros ha escrito Abiteboul?

3. Haz un XML que indique para cada autor cuántos libros ha escrito.

## Ejemplo de salida esperada para el apartado 3

```xml
<authors>
  <author>
    <name>Stevens</name>
    <count>2</count>
  </author>
  <author>
    <name>Abiteboul</name>
    <count>2</count>
  </author>
  <author>
    <name>Buneman</name>
    <count>1</count>
  </author>
  <author>
    <name>Suciu</name>
    <count>1</count>
  </author>
</authors>
```
