import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Alert,
} from "@mui/material";

function CoordinateTransformer() {
  const [coordSystem, setCoordSystem] = useState("WGS84toLV95");
  const [eCoord, setECoord] = useState("");
  const [nCoord, setNCoord] = useState("");
  const [resultatE, setResultatE] = useState("");
  const [resultatN, setResultatN] = useState("");
  const [error, setError] = useState("");

  const handleTransform = async () => {
    // Asynchrone Funktion, damit es keine Blockierung gibt
    setError(""); // setzt Fehlermeldung zurück
    let url = ""; // URL wird erstellt
    let parameter = ""; // Parameter für die Transformation, welche der URL hinzugefügt werden

    // URL angeben und die Parameter für die Transformation setzen
    if (coordSystem === "WGS84toLV95") {
      url = "http://geodesy.geo.admin.ch/reframe/wgs84tolv95";
      parameter = `?easting=${eCoord}&northing=${nCoord}&format=json`; // es werden die Ost- und Nord-Koordinaten übergeben (wgs84tolv95)
    } else if (coordSystem === "LV95toWGS84") {
      url = "http://geodesy.geo.admin.ch/reframe/lv95towgs84";
      parameter = `?easting=${eCoord}&northing=${nCoord}&format=json`; // es werden die Ost- und Nord-Koordinaten übergeben (lv95towgs84)
    }

    try {
      // Versuch, Daten an die API zu senden
      const response = await fetch(`${url}${parameter}`, {
        // URL und Parameter werden zusammengefügt und an die API gesendet
        // await: wartet auf die Antwort der API
        method: "GET", // GET-Methode: es werden Daten vom Server geholt
      });

      if (!response.ok) {
        // Wenn die Antwort nicht erfolgreich ist, wird eine Fehlermeldung ausgegeben
        throw new Error(
          "Transformation fehlgeschlagen. Bitte überprüfen Sie die Eingabedaten."
        );
      }

      const data = await response.json(); // wartet auf Antwort der API und wird in JSON-Format umgewandelt
      setResultatE(data.easting); // Set transformierte Ost-Koordinate
      setResultatN(data.northing); // Set transformierte Nord-Koordinate
    } catch (error) {
      // falls es nicht gelingt die Daten an die API zu senden, wird eine Fehlermeldung ausgegeben
      setError(error.message);
    }
  };

  const handleReset = async () => {
    setECoord("");
    setNCoord("");
    setResultatE("");
    setResultatN("");
    setError("");
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Select
          value={coordSystem}
          onChange={(e) => setCoordSystem(e.target.value)}
          fullWidth
        >
          <MenuItem value="WGS84toLV95">WGS84 to LV95</MenuItem>
          <MenuItem value="LV95toWGS84">LV95 to WGS84</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={6}>
        <TextField
          label="Easting"
          value={eCoord}
          onChange={(e) => setECoord(e.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Northing"
          value={nCoord}
          onChange={(e) => setNCoord(e.target.value)}
          fullWidth
        />
      </Grid>

      <Grid item xs={12} container justifyContent="center">
        <Button
          variant="contained"
          onClick={handleTransform}
          style={{ minWidth: "300px" }}
        >
          Transform
        </Button>
      </Grid>

      {error && (
        <Grid item xs={12}>
          <Alert severity="error">{error}</Alert>
        </Grid>
      )}

      <Grid item xs={6}>
        <TextField
          label="Transformed E"
          value={resultatE}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          label="Transformed N"
          value={resultatN}
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Grid>

      <Grid item xs={12} container justifyContent="center">
        <Button
          variant="contained"
          onClick={handleReset}
          style={{ minWidth: "300px" }}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}
export default CoordinateTransformer;
