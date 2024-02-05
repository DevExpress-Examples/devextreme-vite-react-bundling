import React, { useCallback, useState } from 'react';

//https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/RowEditingAndEditingEvents/Light/
import { Button } from "./devextreme-bundle/devextreme-react-bundle";

import  { 
    DataGrid,
    GridColumn as Column,
    GridEditing as Editing,
    GridPaging as Paging,
    GridLookup as Lookup,
} from "./devextreme-bundle/devextreme-react-bundle";

import { employees, states } from './data';

export const App = () => {
  const [events, setEvents] = useState([]);

  const logEvent = useCallback((eventName) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
  }, []);

  const clearEvents = useCallback(() => {
    setEvents([]);
  }, []);

  return (
    <React.Fragment>
      <DataGrid
        id="gridContainer"
        dataSource={employees}
        keyExpr="ID"
        allowColumnReordering={true}
        showBorders={true}
        onEditingStart={() => logEvent('EditingStart')}
        onInitNewRow={() => logEvent('InitNewRow')}
        onRowInserting={() => logEvent('RowInserting')}
        onRowInserted={() => logEvent('RowInserted')}
        onRowUpdating={() => logEvent('RowUpdating')}
        onRowUpdated={() => logEvent('RowUpdated')}
        onRowRemoving={() => logEvent('RowRemoving')}
        onRowRemoved={() => logEvent('RowRemoved')}
        onSaving={() => logEvent('Saving')}
        onSaved={() => logEvent('Saved')}
        onEditCanceling={() => logEvent('EditCanceling')}
        onEditCanceled={() => logEvent('EditCanceled')}>

        <Paging enabled={true} />
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true} />

        <Column dataField="Prefix" caption="Title" />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="Position" width={130} />
        <Column
          dataField="StateID"
          caption="State"
          width={125}
        >
          <Lookup dataSource={states} displayExpr="Name" valueExpr="ID" />
        </Column>
        <Column
          dataField="BirthDate"
          width={125}
          dataType="date" />
      </DataGrid>

      <div id="events">
        <div>
          <div className="caption">Fired events</div>
          <Button id="clear" text="Clear" onClick={clearEvents} />
        </div>
        <ul>
          {events.map((event, index) => <li key={index}>{event}</li>)}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default App;
