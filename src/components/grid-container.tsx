import * as React from "react";
import {
  Grid,
  GridColumn as Column,
  GridColumn,
} from "@progress/kendo-react-grid";
import { GridProps } from "src/models/props/grid-props";

const GridContainer = React.memo((props: GridProps) => (
  <Grid
    
    style={{ height: "400px" }}
    data={props.data}
  >
    {props.columns.map((c) => (
      <GridColumn
        field={c.field}
        title={c.title}
        format={c.format}
        key={c.field}
      />
    ))}
  </Grid>
));

export default GridContainer;
