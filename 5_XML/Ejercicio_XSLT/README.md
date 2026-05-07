# Ejercicio XSLT

## Descripción

Este ejercicio genera una página HTML a partir de datos XML de población usando XSLT.

La página HTML resultante cumple las dos condiciones del enunciado:

1. Tiene un selector que permite elegir el país.
2. Para el país seleccionado muestra una tabla con la población de cada año.

## Fuente de datos

Indicador utilizado:

- `SP.POP.TOTL` — Population, total

Fuente indicada en el enunciado:

- https://data.worldbank.org/indicator/SP.POP.TOTL

Se ha usado un subset representativo de datos para evitar trabajar con un XML demasiado grande.

## Archivos entregados

- `population_subset.xml`: XML con un subset de datos de población.
- `population.xsl`: transformación XSLT que genera una página HTML.
- `resultado.html`: página HTML generada con el selector de país y la tabla de población.
- `README.md`: explicación de la entrega.

## Países incluidos

- Aruba
- France
- Germany
- Spain
- United States

## Años incluidos

- 2018
- 2019
- 2020
- 2021
- 2022
- 2023

## Funcionamiento

El archivo `population.xsl` transforma `population_subset.xml` en una página HTML.

La transformación:

1. Recorre los países del XML con `xsl:for-each`.
2. Genera un `<select>` con una opción por país.
3. Genera una tabla para cada país.
4. Usa JavaScript para mostrar únicamente la tabla del país seleccionado.

## Cómo abrir el resultado

La forma más sencilla es abrir directamente el archivo:

```text
resultado.html
```

También se puede abrir `population_subset.xml` en un navegador compatible con XSLT local, ya que incluye esta línea:

```xml
<?xml-stylesheet type="text/xsl" href="population.xsl"?>
```

Algunos navegadores pueden bloquear transformaciones XSLT locales por seguridad. Por eso también se entrega `resultado.html` ya generado.
