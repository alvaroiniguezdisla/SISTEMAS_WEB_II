# XQuery – Ejercicio 1: Soluciones

---

## Apartado 1. Títulos de todos los libros ordenados por precio de mayor a menor

### Solución

```xquery
for $book in doc("bib.xml")/bib/book
order by xs:decimal(normalize-space($book/price)) descending
return $book/title
```

### Resultado esperado

```xml
<title>The Economics of Technology and Content for Digital TV</title>
<title>TCP/IP Illustrated</title>
<title>Advanced Programming in the Unix environment</title>
<title>Data on the Web</title>
<title>Principles of Databases</title>
```

### Explicación

La consulta recorre todos los elementos `book` del documento:

```xquery
for $book in doc("bib.xml")/bib/book
```

Después ordena los libros por su precio de mayor a menor:

```xquery
order by xs:decimal(normalize-space($book/price)) descending
```

Se usa `normalize-space()` para eliminar espacios sobrantes del precio, ya que en el XML original aparece un precio escrito como `<price> 39.95</price>`.  
Se usa `xs:decimal()` para tratar el precio como un número decimal y no como texto.

Finalmente, se devuelve únicamente el título de cada libro:

```xquery
return $book/title
```

---

## Apartado 2. Número de libros escritos por Abiteboul

### Solución

```xquery
count(doc("bib.xml")/bib/book[author = "Abiteboul"])
```

### Resultado esperado

```text
2
```

### Explicación

La expresión:

```xquery
doc("bib.xml")/bib/book
```

selecciona todos los libros del XML.

El predicado:

```xquery
[author = "Abiteboul"]
```

filtra solamente aquellos libros que tienen un elemento `author` cuyo contenido es `Abiteboul`.

Después, la función:

```xquery
count(...)
```

cuenta cuántos libros cumplen esa condición.

Abiteboul aparece como autor en los siguientes libros:

```text
Principles of Databases
Data on the Web
```

Por tanto, el resultado es `2`.

---

## Apartado 3. XML con cada autor y cuántos libros ha escrito

### Solución

```xquery
<authors>
{
  for $author in distinct-values(doc("bib.xml")/bib/book/author)
  let $numBooks := count(doc("bib.xml")/bib/book[author = $author])
  return
    <author>
      <name>{ $author }</name>
      <count>{ $numBooks }</count>
    </author>
}
</authors>
```

### Resultado esperado

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

### Explicación

Primero se crea el elemento raíz del XML de salida:

```xquery
<authors>
{
  ...
}
</authors>
```

Después, se obtienen todos los autores sin repetir:

```xquery
distinct-values(doc("bib.xml")/bib/book/author)
```

En este XML los autores distintos son:

```text
Stevens
Abiteboul
Buneman
Suciu
```

Para cada autor, se calcula cuántos libros tienen ese autor:

```xquery
let $numBooks := count(doc("bib.xml")/bib/book[author = $author])
```

Finalmente, por cada autor se genera un elemento XML con su nombre y el número de libros:

```xquery
<author>
  <name>{ $author }</name>
  <count>{ $numBooks }</count>
</author>
```

Las llaves `{ ... }` sirven para insertar el resultado de una expresión XQuery dentro del XML que se está generando.

---

## Resumen final

Las soluciones son:

### Apartado 1

```xquery
for $book in doc("bib.xml")/bib/book
order by xs:decimal(normalize-space($book/price)) descending
return $book/title
```

### Apartado 2

```xquery
count(doc("bib.xml")/bib/book[author = "Abiteboul"])
```

### Apartado 3

```xquery
<authors>
{
  for $author in distinct-values(doc("bib.xml")/bib/book/author)
  let $numBooks := count(doc("bib.xml")/bib/book[author = $author])
  return
    <author>
      <name>{ $author }</name>
      <count>{ $numBooks }</count>
    </author>
}
</authors>
```
