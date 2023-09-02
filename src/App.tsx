import { useState } from 'react'
import { DataGrid} from '@mui/x-data-grid';
import { Box, Button, Grid, Input } from '@mui/material';
import { extractTableDataFromPDF } from './utils/extractDataFromPDF';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import './App.css'
import { columns } from './utils/dataColumns';

function App() {

  const [tableData, setTableData] = useState<any>(null);
  const [showExcelButton, setShowExcelButton] = useState<boolean>(false);
  
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(!event?.target?.files) return;

    const file = event.target.files[0]!;
  
    if (file) {
      const fileReader = new FileReader();
  
      fileReader.onload = async () => {
        const pdfData = fileReader.result;
  
        const tableData = await extractTableDataFromPDF(pdfData);
  
        setTableData(tableData);
      };
  
      fileReader.readAsArrayBuffer(file);

      setShowExcelButton(true);
    }
  }
  
  const handleExportExcel = () => {

    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = {Sheets: {'data': ws}, SheetNames: ['data']};
    const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
    const data = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'});
    
    FileSaver.saveAs(data, 'exported_data.xlsx');

  }
  return (
    <>
    <Grid container justifyContent="center">

      <Grid item xs={16}>

        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Input type="file" inputProps={{accept:"application/pdf"}} onChange={handleFileUpload} />
            {
              showExcelButton ? <Button variant="outlined" onClick={handleExportExcel}>Exportar Excel</Button> : null
            }
        </Box>
        </Grid>

        <Grid item xs={2} />
        <Grid item xs={12}>

        <DataGrid
        columns={columns}
        getRowId={(row) => row?.numGuia}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        rows={tableData ?? []}
        pageSizeOptions={[5, 10]}
        />
    <Grid item xs={2} />
    </Grid>
    </Grid>
    </>
  )
}

export default App
