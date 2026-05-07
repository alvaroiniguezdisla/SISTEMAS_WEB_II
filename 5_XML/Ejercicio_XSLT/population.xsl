<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>XSLT Population Exercise</title>

        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background-color: #f7f9fb;
            color: #222;
          }

          h1 {
            color: #005f8f;
            margin-bottom: 5px;
          }

          .subtitle {
            color: #555;
            margin-bottom: 25px;
          }

          .container {
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 25px;
            max-width: 750px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }

          label {
            font-weight: bold;
          }

          select {
            padding: 6px;
            margin-left: 8px;
            margin-bottom: 20px;
            min-width: 220px;
          }

          .country-data {
            display: none;
            margin-top: 15px;
          }

          table {
            border-collapse: collapse;
            width: 420px;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid #999;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #d9eaf7;
          }

          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>

        <script>
          <![CDATA[
          function showCountry(countryCode) {
            var blocks = document.getElementsByClassName("country-data");

            for (var i = 0; i < blocks.length; i++) {
              blocks[i].style.display = "none";
            }

            var selected = document.getElementById(countryCode);

            if (selected) {
              selected.style.display = "block";
            }
          }

          window.onload = function() {
            var selector = document.getElementById("countrySelector");

            if (selector && selector.options.length > 0) {
              showCountry(selector.value);
            }
          };
          ]]>
        </script>
      </head>

      <body>
        <div class="container">
          <h1>Population by Country</h1>
          <p class="subtitle">
            Indicator:
            <xsl:value-of select="/populationData/@indicator"/>
            -
            <xsl:value-of select="/populationData/@indicatorName"/>
          </p>

          <label for="countrySelector">Choose a country:</label>

          <select id="countrySelector" onchange="showCountry(this.value)">
            <xsl:for-each select="/populationData/country">
              <xsl:sort select="@name"/>
              <option value="{@code}">
                <xsl:value-of select="@name"/>
              </option>
            </xsl:for-each>
          </select>

          <xsl:for-each select="/populationData/country">
            <xsl:sort select="@name"/>

            <div class="country-data" id="{@code}">
              <h2>
                <xsl:value-of select="@name"/>
              </h2>

              <table>
                <tr>
                  <th>Year</th>
                  <th>Population</th>
                </tr>

                <xsl:for-each select="record">
                  <xsl:sort select="@year" data-type="number"/>

                  <tr>
                    <td>
                      <xsl:value-of select="@year"/>
                    </td>
                    <td>
                      <xsl:value-of select="format-number(@population, '#,###')"/>
                    </td>
                  </tr>
                </xsl:for-each>
              </table>
            </div>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
