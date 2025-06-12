
export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface LaborItem {
  id: string;
  description: string;
  hours: number;
  rate: number;
}

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  companyLogoUrl?: string;

  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;

  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;

  technicianName: string;
  machineMake: string;
  machineModel: string;
  machineSerial: string;

  serviceSummary: string;

  lineItems: LineItem[];
  laborItems: LaborItem[];

  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;

  notes: string;
  termsAndConditions: string;
}
