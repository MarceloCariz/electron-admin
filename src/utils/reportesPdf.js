import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import maipo from '../pages/img/maipo.PNG';

export const  generarPdf = (datos) =>{
    
    const {ID_REPORTE, AUTOR, DESCRIPCION, FECHA, TIPO_REPORTE} = datos;

    const doc = new jsPDF('p','mm','a4' );
    doc.addImage(maipo, 'PNG', 0, 0,50,0, undefined, false);
    doc.text(`Fecha de creacion: ${FECHA}`, 130, 7);
    // doc.setFontSize(30);
    doc.text(`Reporte ${TIPO_REPORTE} #${ID_REPORTE}`,60, 65);
    doc.text(`Autor: ${AUTOR}`,60, 75);
    doc.text(`Tipo de Reporte: ${TIPO_REPORTE}`,60, 85);
    doc.text(`Descripcion:`,60, 95);
    doc.text(`${DESCRIPCION}`,60, 105);



    const nombreReporte = TIPO_REPORTE.replace(/ /g, '_');
    doc.save(`${nombreReporte}_n_${ID_REPORTE}`);
}