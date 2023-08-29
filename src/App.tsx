import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { extractTableDataFromPDF } from './utils/extractDataFromPDF';
import './App.css'

function App() {

  const [tableData, setTableData] = useState<any>(null);
  
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
    }
  };
  
  return (
    <>
      <div>
        <input type="file" accept='.pdf' onChange={handleFileUpload} />
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Descripción</TableCell>
            <TableCell align="right">Número de guía identificación</TableCell>
            <TableCell align="right">Descripción guía de identificación</TableCell>
            <TableCell align="right">Peso guía identificación</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { tableData ? tableData.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">{row.numGuia}</TableCell>
              <TableCell align="right">{row.descGuia}</TableCell>
              <TableCell align="right">{row.pesoGuia}</TableCell>
            </TableRow>
          )) : null}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </>
  )
}

export default App
