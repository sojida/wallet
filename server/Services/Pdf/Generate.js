const pdf = require('jspdf');
require('jspdf-autotable');

const generatePDF = ({ tableColumn, tableRows, title }) => {
  // initialize jsPDF
  // eslint-disable-next-line new-cap
  const doc = new pdf.jsPDF({
    orientation: 'landscape',
  });

  // startY is basically margin-top
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    margin: { top: 20 },
  });
  // ticket title. and margin-top + margin-left
  doc.text(title, 14, 15);
  // we define the name of our PDF file.
  doc.save(`${title}.pdf`);
};

module.exports = generatePDF;
