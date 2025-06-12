
import React, { useState, useEffect, useCallback } from 'react';
import { InvoiceData, LineItem, LaborItem } from './types';
import { INITIAL_INVOICE_DATA, LABELS_FA } from './constants';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import Button from './components/ui/Button';
import PrinterIcon from './components/icons/PrinterIcon';
import ResetIcon from './components/icons/ResetIcon';

const App: React.FC = () => {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(INITIAL_INVOICE_DATA);
  const [showPreview, setShowPreview] = useState<boolean>(true); // Default to show preview

  const calculateTotals = useCallback((data: InvoiceData): Partial<InvoiceData> => {
    const itemsSubtotal = data.lineItems.reduce((acc, item) => acc + (Number(item.quantity) * Number(item.unitPrice)), 0);
    const laborSubtotal = data.laborItems.reduce((acc, item) => acc + (Number(item.hours) * Number(item.rate)), 0);
    const currentSubtotal = itemsSubtotal + laborSubtotal;
    
    const currentTaxAmount = currentSubtotal * (Number(data.taxRate) / 100);
    const currentTotalAmount = currentSubtotal + currentTaxAmount - Number(data.discountAmount);

    return {
      subtotal: currentSubtotal,
      taxAmount: currentTaxAmount,
      totalAmount: currentTotalAmount,
    };
  }, []);

  useEffect(() => {
    setInvoiceData(prev => ({
      ...prev,
      ...calculateTotals(prev)
    }));
  }, [invoiceData.lineItems, invoiceData.laborItems, invoiceData.taxRate, invoiceData.discountAmount, calculateTotals]);
  
  // Initialize totals on mount
  useEffect(() => {
    setInvoiceData(prev => ({
        ...prev,
        ...calculateTotals(INITIAL_INVOICE_DATA)
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleInvoiceDataChange = <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setInvoiceData(prev => ({ ...prev, [key]: value }));
  };

  const handleLineItemChange = (index: number, field: keyof LineItem, value: string | number) => {
    const updatedLineItems = invoiceData.lineItems.map((item, i) => {
      if (i === index) {
        const val = (field === 'description') ? value : (Number(value) || 0);
        return { ...item, [field]: val };
      }
      return item;
    });
    setInvoiceData(prev => ({ ...prev, lineItems: updatedLineItems }));
  };

  const handleAddLineItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, { id: Date.now().toString() + 'item', description: '', quantity: 1, unitPrice: 0 }],
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id),
    }));
  };
  
  const handleLaborItemChange = (index: number, field: keyof LaborItem, value: string | number) => {
    const updatedLaborItems = invoiceData.laborItems.map((item, i) => {
      if (i === index) {
        const val = (field === 'description') ? value : (Number(value) || 0);
        return { ...item, [field]: val };
      }
      return item;
    });
    setInvoiceData(prev => ({ ...prev, laborItems: updatedLaborItems }));
  };

  const handleAddLaborItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      laborItems: [...prev.laborItems, { id: Date.now().toString() + 'labor', description: '', hours: 1, rate: 0 }],
    }));
  };

  const handleRemoveLaborItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      laborItems: prev.laborItems.filter(item => item.id !== id),
    }));
  };

  const handlePrint = () => {
    if (!showPreview) setShowPreview(true); // Ensure preview is visible for printing
    // Delay print slightly to ensure DOM updates if preview was just shown
    setTimeout(() => {
      const printContents = document.getElementById('invoice-preview-content')?.innerHTML;
      const originalContents = document.body.innerHTML;
      if (printContents) {
          // Temporarily hide non-print content
          const nonPrintElements = document.querySelectorAll('body > *:not(#invoice-preview-content)');
          nonPrintElements.forEach(el => (el as HTMLElement).style.display = 'none');
          
          // Create a temporary div for printing if needed, or just print the section
          const printableElement = document.getElementById('invoice-preview-content');
          if(printableElement) {
            // Apply specific print styles or clone if needed
          }
          
          document.body.innerHTML = `<div class="p-4">${printContents}</div>`; // Simplified print view
          window.print();
          document.body.innerHTML = originalContents; // Restore original content
          window.location.reload(); // Reload to restore event listeners and React state properly
      } else {
          window.print(); // Fallback to printing the whole page if specific content not found
      }
    }, 100);
  };
  
  const handleResetForm = () => {
    const newInvoiceNumber = `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInvoiceDate = new Date().toISOString().split('T')[0];
    const newDueDate = new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0];

    const resetData = {
        ...INITIAL_INVOICE_DATA,
        invoiceNumber: newInvoiceNumber,
        invoiceDate: newInvoiceDate,
        dueDate: newDueDate,
        lineItems: [{ id: Date.now().toString() + 'item', description: "فیلتر آب", quantity: 1, unitPrice: 500000 }],
        laborItems: [{ id: Date.now().toString() + 'labor', description: "اجرت سرویس کامل", hours: 2, rate: 750000 }],
    };
    
    setInvoiceData({
        ...resetData,
        ...calculateTotals(resetData) // Recalculate totals for the reset data
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <header className="bg-indigo-700 text-white shadow-lg no-print">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">{LABELS_FA.appTitle}</h1>
          <div className="space-x-2 space-x-reverse">
            <Button onClick={handlePrint} variant="primary" className="bg-green-500 hover:bg-green-600 focus:ring-green-400">
              <PrinterIcon className="ml-2 h-5 w-5" />
              {LABELS_FA.printInvoice}
            </Button>
            <Button onClick={handleResetForm} variant="secondary">
              <ResetIcon className="ml-2 h-5 w-5" />
              {LABELS_FA.resetForm}
            </Button>
             <Button 
                onClick={() => setShowPreview(!showPreview)} 
                variant="secondary"
                className="hidden md:inline-flex"
              >
                {showPreview ? "پنهان کردن پیش نمایش" : "نمایش پیش نمایش"}
              </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-2">
         <div className="mt-4 no-print">
            <InvoiceForm
                invoiceData={invoiceData}
                onInvoiceDataChange={handleInvoiceDataChange}
                onLineItemChange={handleLineItemChange}
                onAddLineItem={handleAddLineItem}
                onRemoveLineItem={handleRemoveLineItem}
                onLaborItemChange={handleLaborItemChange}
                onAddLaborItem={handleAddLaborItem}
                onRemoveLaborItem={handleRemoveLaborItem}
            />
        </div>
        
        {showPreview && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4 no-print">{LABELS_FA.previewTitle}</h2>
            <InvoicePreview invoiceData={invoiceData} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
