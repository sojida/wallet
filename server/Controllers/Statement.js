const { CommandQueryApp } = require('../CQ');
const GetWalletStatement = require('../Queries/GetWalletStatement');
const Pdf = require('../Services/Pdf');

const getStatement = async (req, res) => {
  const { userId } = req.params;

  const query = CommandQueryApp.createQuery({ userId });

  const response = await CommandQueryApp.query(GetWalletStatement, query);

  return res.status(response.statusCode).json(response);
};

const generatePdfStatement = async (req, res) => {
  const { userId } = req.params;

  const query = CommandQueryApp.createQuery({ userId });

  const response = await CommandQueryApp.query(GetWalletStatement, query);

  const title = 'Account-Statement';

  const tableColumn = [
    'id',
    'Amount(N)',
    'Description',
    'Timestamp',
  ];

  let tableRows = [];

  Pdf.Generate({ tableColumn, tableRows, title });

  if (!response.status) {
    return res.download(`${title}.pdf`);
  }

  if (!response.transactions.length) {
    return res.download(`${title}.pdf`);
  }

  tableRows = response.transactions.map((item) => [
    item.id,
    (Number(item.amount) / 100).toFixed(2),
    item.description,
    item.timestamp,
  ]);

  Pdf.Generate({ tableColumn, tableRows, title });

  return res.download(`${title}.pdf`);
};

module.exports = { getStatement, generatePdfStatement };
