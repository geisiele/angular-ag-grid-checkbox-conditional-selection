import { Component, HostListener } from '@angular/core';

import {AllCommunityModules} from "@ag-grid-community/all-modules";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {

  // Copia a célula selecionada ao pressionar as teclas Ctrl + c
  @HostListener('document:copy', ['$event'])
  onCopy(event) {
    let listener = (e: ClipboardEvent) => {
      const focusedRow = this.gridApi.getFocusedCell();
      const row = this.gridApi.getDisplayedRowAtIndex(focusedRow.rowIndex);
      const cellValue = this.gridApi.getValue(focusedRow.column.colId, row)
      e.clipboardData.setData('text/plain', (cellValue));
      e.preventDefault();
    };
    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }

  private gridApi;
  private gridColumnApi;
  public isRowSelectable;
  public gridOptions;
  public rowData;
  public modules;

  constructor() {
    this.gridOptions = {
      columnDefs: [
        {
          field: 'selection',
          headerName: '',
          headerCheckboxSelection: true,
          checkboxSelection: (params) => { // Só deixa exibir as linhas isEnabled
            return params.node.data.isEnabled
          },
          lockPosition: true,
          cellRenderer: (params) => {
            if (!params.node.data.isEnabled) { // Renderiza um checkbox desabilitado nas linhas isEnabled=false
                return `<input type="checkbox" disabled />`;
            }
          }
        },
        {field: 'make' },
        {field: 'model' },
        {field: 'price'}
      ],
      rowSelection: 'multiple',
      rowMultiSelectWithClick: true,
      isRowSelectable: (rowNode) => { // Só deixa selecionar as linhas isEnabled
        return rowNode.data.isEnabled;
      }
    };
      
    this.rowData = [
        { make: 'Toyota', model: 'Corolla', price: 56000, isEnabled: true },
        { make: 'Toyota', model: 'Celica', price: 35000, isEnabled: true },
        { make: 'Toyota', model: 'Ethios', price: 78000, isEnabled: true },
        { make: 'Toyota', model: 'Prius', price: 49000, isEnabled: false },
        { make: 'Ford', model: 'Mondeo', price: 32000, isEnabled: false },
        { make: 'Porsche', model: 'Boxter', price: 72000, isEnabled: false }
    ];

    this.modules = AllCommunityModules;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;   
    this.gridApi.sizeColumnsToFit(); 
  }

}
