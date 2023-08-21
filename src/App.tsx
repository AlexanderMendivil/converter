import { useState } from 'react'
import './App.css'
import { extractTableDataFromPDF } from './utils/extractDataFromPDF';

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
  
        // Set the extracted table data in the component state
        setTableData(tableData);
      };
  
      fileReader.readAsArrayBuffer(file);
    }
  };
  
  return (
    <>
      <div>
        <input type="file" accept='.pdf' onChange={handleFileUpload} />
  
      </div>
    </>
  )
}

export default App
