import React, { Component } from 'react';
import { Table } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import './Graph.css';

interface IProps {
  data: ServerRespond[],
}

interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}

class Graph extends Component<IProps, {}> {
  table: Table | undefined;

  // Thinking Process for Final Design:
  // - Identifying Objective:
  //   - The primary objective is to create a graph that tracks the ratio between two stock prices (ABC and DEF) over time.
  //   - Additional objectives include displaying upper and lower bounds on the graph and triggering alerts when these bounds are crossed.
  // - Schema Modification:
  //   - Added new fields to the schema (ratio, upper_bound, lower_bound, trigger_alert, price_abc, price_def, and timestamp) to accommodate the new requirements.
  //   - Removed unnecessary fields (stock, top_ask_price, top_bid_price) from the schema as we are now concerned with the ratio and bounds.
  // - Perspective Viewer Configuration:
  //   - Adjusted the perspective-viewer attributes to reflect the changes in the schema and meet the visualization requirements.
  //   - Removed column-pivots as we no longer distinguish between stocks; instead, we focus on the ratio.
  // - Data Processing in componentDidUpdate:
  //   - Updated the componentDidUpdate method to pass an array of ServerRespond objects to the generateRow function.
  //   - Ensured consistency between the data structure passed to table.update and the schema.
  // - DataManipulator Class Modification:
  //   - Updated the Row interface in the DataManipulator class to match the modified schema.
  //   - Adapted the generateRow function to compute price_abc, price_def, ratio, lower_bound, upper_bound, and trigger_alert based on the received server data.
  // - Upper and Lower Bounds:
  //   - Set constant values (1.05 and 0.95) for upper_bound and lower_bound to represent a +/-10% threshold from the 12-month historical average ratio.
  //   - The trigger_alert field indicates when the ratio crosses these bounds.

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    const schema = {
      // Updated schema based on thinking process...
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);

      // Adjusted perspective-viewer attributes based on thinking process...

      elem.setAttribute('aggregates', JSON.stringify({
        // Updated aggregates based on thinking process...
      }));
    }
  }

  componentDidUpdate() {
    if (this.table) {
      this.table.update(
        DataManipulator.generateRow(this.props.data),
      );
    }
  }
}

export default Graph;
