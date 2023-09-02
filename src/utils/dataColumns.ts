import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'description', headerName: 'Decripción', width: 200 },
    { field: 'numGuia', headerName: 'Número Guia Identificación', width: 250 },
    { field: 'descGuia', headerName: 'Descripción Guia Identificación', width: 250 },
    { field: 'pesoGuia', headerName: 'Peso Guia Identificación', width: 250 },
  ];