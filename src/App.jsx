import Typography from "@mui/material/Typography";
import CoordinateTransformer from "./coordinateTransformer";

function App() {
  return (
    <div>
      <Typography variant="h3">Coordinate Transformer</Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Eric Iseli
      </Typography>

      <CoordinateTransformer />
    </div>
  );
}

export default App;
