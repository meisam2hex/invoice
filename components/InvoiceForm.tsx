
import React from 'react';
import { InvoiceData, LineItem, LaborItem } from '../types';
import { LABELS_FA } from '../constants';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import PlusIcon from './icons/PlusIcon';
import TrashIcon from './icons/TrashIcon';

interface InvoiceFormProps {
  invoiceData: InvoiceData;
  onInvoiceDataChange: <K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => void;
  onLineItemChange: (index: number, field: keyof LineItem, value: string | number) => void;
  onAddLineItem: () => void;
  onRemoveLineItem: (id: string) => void;
  onLaborItemChange: (index: number, field: keyof LaborItem, value: string | number) => void;
  onAddLaborItem: () => void;
  onRemoveLaborItem: (id: string) => void;
}

const SectionCard: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-3 mb-4">{title}</h2>
    {children}
  </div>
);

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoiceData,
  onInvoiceDataChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  onLaborItemChange,
  onAddLaborItem,
  onRemoveLaborItem,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    let processedValue: string | number = value;
    if (type === 'number') {
      processedValue = value === '' ? 0 : parseFloat(value);
    }
    onInvoiceDataChange(name as keyof InvoiceData, processedValue as InvoiceData[keyof InvoiceData]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      <SectionCard title={LABELS_FA.companyDetails}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={LABELS_FA.companyName} id="companyName" name="companyName" value={invoiceData.companyName} onChange={handleInputChange} />
          <Input label={LABELS_FA.companyAddress} id="companyAddress" name="companyAddress" value={invoiceData.companyAddress} onChange={handleInputChange} />
          <Input label={LABELS_FA.companyPhone} id="companyPhone" name="companyPhone" value={invoiceData.companyPhone} onChange={handleInputChange} />
          <Input label={LABELS_FA.companyEmail} id="companyEmail" name="companyEmail" type="email" value={invoiceData.companyEmail} onChange={handleInputChange} />
          <Input label={LABELS_FA.companyLogoUrl} id="companyLogoUrl" name="companyLogoUrl" value={invoiceData.companyLogoUrl || ''} onChange={handleInputChange} placeholder={LABELS_FA.optional}/>
        </div>
      </SectionCard>

      <SectionCard title={LABELS_FA.customerDetails}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={LABELS_FA.customerName} id="customerName" name="customerName" value={invoiceData.customerName} onChange={handleInputChange} required />
          <Input label={LABELS_FA.customerAddress} id="customerAddress" name="customerAddress" value={invoiceData.customerAddress} onChange={handleInputChange} />
          <Input label={LABELS_FA.customerPhone} id="customerPhone" name="customerPhone" value={invoiceData.customerPhone} onChange={handleInputChange} />
          <Input label={LABELS_FA.customerEmail} id="customerEmail" name="customerEmail" type="email" value={invoiceData.customerEmail} onChange={handleInputChange} />
        </div>
      </SectionCard>

      <SectionCard title={LABELS_FA.invoiceDetails}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label={LABELS_FA.invoiceNumber} id="invoiceNumber" name="invoiceNumber" value={invoiceData.invoiceNumber} onChange={handleInputChange} required />
          <Input label={LABELS_FA.invoiceDate} id="invoiceDate" name="invoiceDate" type="date" value={invoiceData.invoiceDate} onChange={handleInputChange} required />
          <Input label={LABELS_FA.dueDate} id="dueDate" name="dueDate" type="date" value={invoiceData.dueDate} onChange={handleInputChange} />
        </div>
      </SectionCard>
      
      <SectionCard title={LABELS_FA.technicianAndMachineDetails}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={LABELS_FA.technicianName} id="technicianName" name="technicianName" value={invoiceData.technicianName} onChange={handleInputChange} />
          <Input label={LABELS_FA.machineMake} id="machineMake" name="machineMake" value={invoiceData.machineMake} onChange={handleInputChange} />
          <Input label={LABELS_FA.machineModel} id="machineModel" name="machineModel" value={invoiceData.machineModel} onChange={handleInputChange} />
          <Input label={LABELS_FA.machineSerial} id="machineSerial" name="machineSerial" value={invoiceData.machineSerial} onChange={handleInputChange} />
        </div>
      </SectionCard>

      <SectionCard title={LABELS_FA.serviceAndItems}>
        <Textarea label={LABELS_FA.serviceSummary} id="serviceSummary" name="serviceSummary" value={invoiceData.serviceSummary} onChange={handleInputChange} />
        
        <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">{LABELS_FA.lineItems}</h3>
        {invoiceData.lineItems.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 mb-3 items-center p-2 border border-gray-200 rounded-md">
            <Input className="col-span-12 sm:col-span-5" placeholder={LABELS_FA.itemDescription} id={`lineItemDesc-${item.id}`} value={item.description} onChange={(e) => onLineItemChange(index, 'description', e.target.value)} />
            <Input className="col-span-4 sm:col-span-2" type="number" placeholder={LABELS_FA.quantity} id={`lineItemQty-${item.id}`} value={item.quantity} onChange={(e) => onLineItemChange(index, 'quantity', parseFloat(e.target.value))} min="0" />
            <Input className="col-span-8 sm:col-span-3" type="number" placeholder={LABELS_FA.unitPrice} id={`lineItemPrice-${item.id}`} value={item.unitPrice} onChange={(e) => onLineItemChange(index, 'unitPrice', parseFloat(e.target.value))} min="0" />
            <div className="col-span-12 sm:col-span-2 flex justify-end sm:justify-center items-center">
              <span className="text-sm text-gray-600 mr-2 sm:hidden">{LABELS_FA.itemTotal}: {(item.quantity * item.unitPrice).toLocaleString('fa-IR')}</span>
              <Button variant="icon" onClick={() => onRemoveLineItem(item.id)} aria-label={LABELS_FA.removeItem}>
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={onAddLineItem} variant="secondary" className="mt-2">
          <PlusIcon className="ml-2 h-4 w-4" /> {LABELS_FA.addItem}
        </Button>

        <h3 className="text-lg font-medium text-gray-700 mt-6 mb-2">{LABELS_FA.labor}</h3>
        {invoiceData.laborItems.map((item, index) => (
          <div key={item.id} className="grid grid-cols-12 gap-2 mb-3 items-center p-2 border border-gray-200 rounded-md">
            <Input className="col-span-12 sm:col-span-5" placeholder={LABELS_FA.laborDescription} id={`laborDesc-${item.id}`} value={item.description} onChange={(e) => onLaborItemChange(index, 'description', e.target.value)} />
            <Input className="col-span-4 sm:col-span-2" type="number" placeholder={LABELS_FA.hours} id={`laborHours-${item.id}`} value={item.hours} onChange={(e) => onLaborItemChange(index, 'hours', parseFloat(e.target.value))} min="0" />
            <Input className="col-span-8 sm:col-span-3" type="number" placeholder={LABELS_FA.rate} id={`laborRate-${item.id}`} value={item.rate} onChange={(e) => onLaborItemChange(index, 'rate', parseFloat(e.target.value))} min="0" />
             <div className="col-span-12 sm:col-span-2 flex justify-end sm:justify-center items-center">
               <span className="text-sm text-gray-600 mr-2 sm:hidden">{LABELS_FA.laborTotal}: {(item.hours * item.rate).toLocaleString('fa-IR')}</span>
              <Button variant="icon" onClick={() => onRemoveLaborItem(item.id)} aria-label={LABELS_FA.removeItem}>
                <TrashIcon />
              </Button>
            </div>
          </div>
        ))}
        <Button onClick={onAddLaborItem} variant="secondary" className="mt-2">
           <PlusIcon className="ml-2 h-4 w-4" /> {LABELS_FA.addLabor}
        </Button>
      </SectionCard>

      <SectionCard title={LABELS_FA.summary}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="text-right p-2 border-b">
                <span className="font-semibold">{LABELS_FA.subtotal}: </span>
                {invoiceData.subtotal.toLocaleString('fa-IR')} ریال
            </div>
            <div></div> {/* Spacer */}
            <Input label={`${LABELS_FA.taxRate} (%)`} id="taxRate" name="taxRate" type="number" value={invoiceData.taxRate} onChange={handleInputChange} min="0" />
            <div className="text-right p-2 border-b">
                <span className="font-semibold">{LABELS_FA.taxAmount}: </span>
                {invoiceData.taxAmount.toLocaleString('fa-IR')} ریال
            </div>
            <Input label={`${LABELS_FA.discountAmount} (ریال)`} id="discountAmount" name="discountAmount" type="number" value={invoiceData.discountAmount} onChange={handleInputChange} min="0" />
             <div className="text-right p-2 font-bold text-lg text-indigo-700">
                <span className="font-semibold">{LABELS_FA.totalAmount}: </span>
                {invoiceData.totalAmount.toLocaleString('fa-IR')} ریال
            </div>
        </div>
      </SectionCard>

      <SectionCard title={LABELS_FA.notesAndTerms}>
        <Textarea label={LABELS_FA.notes} id="notes" name="notes" value={invoiceData.notes} onChange={handleInputChange} />
        <Textarea label={LABELS_FA.termsAndConditions} id="termsAndConditions" name="termsAndConditions" value={invoiceData.termsAndConditions} onChange={handleInputChange} className="mt-4" />
      </SectionCard>
    </div>
  );
};

export default InvoiceForm;
