import React, { Component } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        { headerName: "ID", field: "id" },
        { headerName: "First name", field: "firstName" },
        { headerName: "Last name", field: "lastName" },
        { headerName: "E-mail", field: "email" },
        { headerName: "Phone", field: "phone" },
      ],
      defaultColDef: {
        resizable: true,
        sortable: true,
        unSortIcon: true,
        editable: true,
      },
      paginationPageSize: 50,
    }; 
  }

  componentDidMount() {
    fetch('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
    .then(res => res.json())
    .then(rowData => this.setState({ rowData }))
  }

  onPageSizeChanged = newPageSize => {
    var value = document.getElementById('page-size').value;
    this.gridApi.paginationSetPageSize(Number(value));
  };

  onGridReady = params => {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  };

  onAddRow = () => {
    this.gridApi.applyTransaction({
    add: [{ id: 'Double click to edit', firstName: ' ', lastName: ' ', email:' ', phone:' ' }], addIndex: 0
    });
    this.gridApi.getSortModel();
  };

  handleQuickFilter = event => {
    this.gridApi.setQuickFilter(event.target.value);
  };

  render() {
    return (
    <div className="container">
      <h1 className="text-center mt-5 mb-5">Table for Future</h1>
      <div className="flex">  
        <input className="flex-item"
          type="text"
          placeholder="Quick Filter"
          onChange={this.handleQuickFilter}
        />
        <button className="btn btn-primary mb-3 flex-item" onClick={this.onAddRow}>Add Row</button>
      </div>
      <div
        className="ag-theme-alpine"
        style={{
        height: '600px',
        width: 'auto',
        }}
      >
        <AgGridReact
          columnDefs={this.state.columnDefs}
          pagination={true}
          paginationPageSize={this.state.paginationPageSize}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
          defaultColDef={this.state.defaultColDef}
          animateRows={true}
        >
        </AgGridReact>
      </div>
    </div>
    );
  }
}

export default App;