import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';

export default function SearchSyncfusion({ data }) {
  return (
    <div>
      <GridComponent dataSource={data}>
        <ColumnsDirective>
          <ColumnDirective field='country' headerText='Country' width='100' />
          <ColumnDirective field='state' headerText='State' width='100' />
          <ColumnDirective field='city' headerText='City' width='100' />
          <ColumnDirective field='institute' headerText='Institute' width='150' />
          <ColumnDirective field='branch' headerText='Branch' width='100' />
          <ColumnDirective field='pincode' headerText='Pincode' width='100' textAlign='Right' />
        </ColumnsDirective>
      </GridComponent>
    </div>
  );
}
