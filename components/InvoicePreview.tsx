
import React from 'react';
import { InvoiceData } from '../types';
import { LABELS_FA } from '../constants';

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ invoiceData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      return new Date(dateString).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch (e) {
      return dateString; // fallback if date is invalid
    }
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fa-IR') + ' ریال';
  };

  return (
    <div id="invoice-preview-content" className="print-container bg-white shadow-lg rounded-lg p-6 md:p-10 my-8 max-w-4xl mx-auto border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start pb-6 border-b border-gray-300">
        <div>
          {invoiceData.companyLogoUrl && (
            <img src={invoiceData.companyLogoUrl} alt={invoiceData.companyName} className="h-12 md:h-16 mb-4 object-contain" />
          )}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{invoiceData.companyName || LABELS_FA.companyName}</h1>
          <p className="text-sm text-gray-600">{invoiceData.companyAddress}</p>
          <p className="text-sm text-gray-600">{LABELS_FA.companyPhone}: {invoiceData.companyPhone}</p>
          <p className="text-sm text-gray-600">{LABELS_FA.companyEmail}: {invoiceData.companyEmail}</p>
        </div>
        <div className="text-left">
          <h2 className="text-3xl md:text-4xl font-semibold text-indigo-700 uppercase">{LABELS_FA.invoice}</h2>
          <p className="text-gray-600">{LABELS_FA.invoiceNumber}: <span className="font-medium text-gray-700">{invoiceData.invoiceNumber}</span></p>
          <p className="text-gray-600">{LABELS_FA.invoiceDate}: <span className="font-medium text-gray-700">{formatDate(invoiceData.invoiceDate)}</span></p>
          <p className="text-gray-600">{LABELS_FA.dueDate}: <span className="font-medium text-gray-700">{formatDate(invoiceData.dueDate)}</span></p>
        </div>
      </div>

      {/* Customer and Service Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">{LABELS_FA.billTo}</h3>
          <p className="text-lg font-medium text-gray-800">{invoiceData.customerName}</p>
          <p className="text-gray-600">{invoiceData.customerAddress}</p>
          <p className="text-gray-600">{LABELS_FA.customerPhone}: {invoiceData.customerPhone}</p>
          <p className="text-gray-600">{LABELS_FA.customerEmail}: {invoiceData.customerEmail}</p>
        </div>
        {invoiceData.technicianName && (
          <div className="md:text-left">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-1">{LABELS_FA.preparedBy}</h3>
            <p className="text-gray-700">{invoiceData.technicianName}</p>
            {invoiceData.machineMake && <p className="text-xs text-gray-500">{LABELS_FA.machineMake}: {invoiceData.machineMake}</p>}
            {invoiceData.machineModel && <p className="text-xs text-gray-500">{LABELS_FA.machineModel}: {invoiceData.machineModel}</p>}
            {invoiceData.machineSerial && <p className="text-xs text-gray-500">{LABELS_FA.machineSerial}: {invoiceData.machineSerial}</p>}
          </div>
        )}
      </div>
      
      {invoiceData.serviceSummary && (
        <div className="my-6 p-3 bg-gray-50 rounded-md">
            <h4 className="font-semibold text-gray-700 mb-1">{LABELS_FA.serviceSummary}:</h4>
            <p className="text-sm text-gray-600 whitespace-pre-wrap">{invoiceData.serviceSummary}</p>
        </div>
      )}

      {/* Line Items Table */}
      <div className="overflow-x-auto my-8">
        <table className="w-full text-sm text-right text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th scope="col" className="px-4 py-3 text-right font-semibold rounded-r-lg">#</th>
              <th scope="col" className="px-4 py-3 text-right font-semibold">{LABELS_FA.itemDescription}</th>
              <th scope="col" className="px-4 py-3 text-center font-semibold">{LABELS_FA.quantity}</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold">{LABELS_FA.unitPrice}</th>
              <th scope="col" className="px-4 py-3 text-left font-semibold rounded-l-lg">{LABELS_FA.itemTotal}</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.lineItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.description}</td>
                <td className="px-4 py-3 text-center">{item.quantity}</td>
                <td className="px-4 py-3 text-left">{formatCurrency(item.unitPrice)}</td>
                <td className="px-4 py-3 text-left font-medium text-gray-800">{formatCurrency(item.quantity * item.unitPrice)}</td>
              </tr>
            ))}
             {invoiceData.laborItems.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3">{invoiceData.lineItems.length + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{item.description} ({LABELS_FA.labor})</td>
                <td className="px-4 py-3 text-center">{item.hours} ({LABELS_FA.hours})</td>
                <td className="px-4 py-3 text-left">{formatCurrency(item.rate)}</td>
                <td className="px-4 py-3 text-left font-medium text-gray-800">{formatCurrency(item.hours * item.rate)}</td>
              </tr>
            ))}
            {invoiceData.lineItems.length === 0 && invoiceData.laborItems.length === 0 && (
                <tr><td colSpan={5} className="text-center py-4 text-gray-500">هیچ آیتمی اضافه نشده است.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end my-8">
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>{LABELS_FA.subtotal}:</span>
              <span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>{LABELS_FA.taxRate} ({invoiceData.taxRate}%):</span>
              <span className="font-medium">{formatCurrency(invoiceData.taxAmount)}</span>
            </div>
            {invoiceData.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{LABELS_FA.discountAmount}:</span>
                <span className="font-medium">- {formatCurrency(invoiceData.discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold text-indigo-700 border-t-2 border-indigo-200 pt-2 mt-2">
              <span>{LABELS_FA.totalAmount}:</span>
              <span>{formatCurrency(invoiceData.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notes & Terms */}
      {(invoiceData.notes || invoiceData.termsAndConditions) && (
        <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
          {invoiceData.notes && (
            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-1">{LABELS_FA.notes}:</h4>
              <p className="whitespace-pre-wrap">{invoiceData.notes}</p>
            </div>
          )}
          {invoiceData.termsAndConditions && (
            <div>
              <h4 className="font-semibold text-gray-700 mb-1">{LABELS_FA.termsAndConditions}:</h4>
              <p className="whitespace-pre-wrap">{invoiceData.termsAndConditions}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-12 text-center text-xs text-gray-500">
        <p>{LABELS_FA.thankYou}</p>
        <p className="mt-1">{invoiceData.companyName} &copy; {new Date().getFullYear()}</p>
      </div>
    </div>
  );
};

export default InvoicePreview;
