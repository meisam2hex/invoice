
import { InvoiceData } from './types';

export const LABELS_FA = {
  // App Title
  appTitle: "مولد فاکتور خدمات قهوه ساز",

  // Company Details
  companyDetails: "مشخصات شرکت شما",
  companyName: "نام شرکت",
  companyAddress: "آدرس شرکت",
  companyPhone: "تلفن شرکت",
  companyEmail: "ایمیل شرکت",
  companyLogoUrl: "URL لوگوی شرکت (اختیاری)",

  // Customer Details
  customerDetails: "مشخصات مشتری",
  customerName: "نام مشتری",
  customerAddress: "آدرس مشتری",
  customerPhone: "تلفن مشتری",
  customerEmail: "ایمیل مشتری",

  // Invoice Details
  invoiceDetails: "اطلاعات فاکتور",
  invoiceTitle: "فاکتور خدمات و تعمیرات",
  invoiceNumber: "شماره فاکتور",
  invoiceDate: "تاریخ فاکتور",
  dueDate: "تاریخ سررسید",

  // Technician & Machine
  technicianAndMachineDetails: "اطلاعات تکنسین و دستگاه",
  technicianName: "نام تکنسین",
  machineMake: "سازنده دستگاه",
  machineModel: "مدل دستگاه",
  machineSerial: "شماره سریال دستگاه",

  // Service & Items
  serviceAndItems: "خدمات و اقلام",
  serviceSummary: "خلاصه خدمات انجام شده",
  lineItems: "اقلام/قطعات مصرفی",
  addItem: "افزودن آیتم",
  removeItem: "حذف آیتم",
  itemDescription: "شرح کالا/خدمت",
  quantity: "تعداد",
  unitPrice: "قیمت واحد (ریال)",
  itemTotal: "مجموع (ریال)",

  // Labor
  labor: "دستمزد",
  addLabor: "افزودن دستمزد",
  laborDescription: "شرح دستمزد",
  hours: "ساعات",
  rate: "نرخ (ریال/ساعت)",
  laborTotal: "مجموع دستمزد (ریال)",

  // Totals
  summary: "خلاصه مالی",
  subtotal: "جمع کل (بدون مالیات)",
  taxRate: "نرخ مالیات بر ارزش افزوده (%)",
  taxAmount: "مبلغ مالیات (ریال)",
  discountAmount: "میزان تخفیف (ریال)",
  totalAmount: "مبلغ نهایی قابل پرداخت (ریال)",

  // Notes & Terms
  notesAndTerms: "یادداشت ها و شرایط",
  notes: "یادداشت ها",
  termsAndConditions: "شرایط و ضوابط",

  // Actions
  printInvoice: "چاپ فاکتور",
  resetForm: "بازنشانی فرم",

  // Placeholders
  enterHere: "اینجا وارد کنید...",
  datePlaceholder: "YYYY-MM-DD",
  optional: "(اختیاری)",

  // Invoice Preview Headers
  previewTitle: "پیش نمایش فاکتور",
  billTo: "صورتحساب برای:",
  from: "از طرف:",
  invoice: "فاکتور",
  paymentDetails: "جزئیات پرداخت",
  thankYou: "از انتخاب شما سپاسگزاریم!",
  preparedBy: "تنظیم کننده:",
};

export const INITIAL_INVOICE_DATA: InvoiceData = {
  companyName: "کافه تکنیک آریا",
  companyAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
  companyPhone: "۰۲۱-۸۸۸۸۸۸۸۸",
  companyEmail: "info@cafetechnic.ir",
  companyLogoUrl: "https://picsum.photos/seed/coffeelogo/150/50",

  customerName: "",
  customerAddress: "",
  customerPhone: "",
  customerEmail: "",

  invoiceNumber: `INV-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`,
  invoiceDate: new Date().toISOString().split('T')[0],
  dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split('T')[0],

  technicianName: "",
  machineMake: "",
  machineModel: "",
  machineSerial: "",

  serviceSummary: "سرویس دوره ای و عیب یابی دستگاه قهوه ساز صنعتی",

  lineItems: [{ id: Date.now().toString() + 'item', description: "فیلتر آب", quantity: 1, unitPrice: 500000 }],
  laborItems: [{ id: Date.now().toString() + 'labor', description: "اجرت سرویس کامل", hours: 2, rate: 750000 }],

  subtotal: 0, // Will be calculated
  taxRate: 9, 
  taxAmount: 0, // Will be calculated
  discountAmount: 0,
  totalAmount: 0, // Will be calculated

  notes: "لطفا مبلغ فاکتور را ظرف ۱۵ روز تسویه فرمایید.",
  termsAndConditions: "قطعات تعویض شده شامل ۳ ماه گارانتی می باشند. گارانتی شامل نواقص ناشی از استفاده نادرست نمی شود.",
};
