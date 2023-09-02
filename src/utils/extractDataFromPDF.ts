import * as PDFJS from 'pdfjs-dist'
import { GuideModel } from '../models/guideModel';
PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`;

export const extractTableDataFromPDF = async (pdfData: any ) => {
    const pdf = await PDFJS.getDocument({ data: pdfData }).promise;
  
    const tableData = [];
  
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const pageText = await page.getTextContent();

        for(let i = 0; i < pageText.items.length; i++){
            //@ts-ignore
            if(pageText.items[i].str === 'Descripción' && pageText.items[i+2].str === 'Número Guia Identificación'){
                
                for(let j = i+8; j < pageText.items.length; j +=8){

                    if((j+1) > pageText.items.length || (j+2) > pageText.items.length || (j+4) > pageText.items.length || (j+6) > pageText.items.length){
                        break;
                    }else{

                        //@ts-ignore
                        const pesoGuia = +pageText.items[j+6].str
                        if(!isNaN(pesoGuia)){
                            tableData.push({
                                //@ts-ignore
                                description: pageText.items[j].str,
                                //@ts-ignore
                                numGuia: pageText.items[j+2].str,
                                //@ts-ignore
                                descGuia: pageText.items[j+4].str,
                                //@ts-ignore
                                pesoGuia: +pageText.items[j+6].str,
                            } as GuideModel)
                        }
                    }
                }
            }
        }
    }
  
     return tableData;
  };