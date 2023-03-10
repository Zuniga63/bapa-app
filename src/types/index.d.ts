//-----------------------------------------------------------------------------
// GENERAL TYPES
//-----------------------------------------------------------------------------
export interface IImage {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}

export interface IValidationErrors {
  [key?: string]: {
    message: string;
    value: unknown;
    children?: {
      index: string;
      errors: {
        message: string;
        value: unknown;
      };
    };
  };
}

export interface IValidationErrorResponse {
  ok: boolean;
  message: string;
  validationErrors: IValidationErrors;
}

export * from 'src/features/Auth/types';
export * from 'src/features/CategoryPage/types';
export * from 'src/features/BoxPage/types';
export * from 'src/features/InvoicePage/types';

//-----------------------------------------------------------------------------
// DASHBOARD PAGE
//-----------------------------------------------------------------------------
export interface ICategoryReport {
  category: {
    id: string;
    mainCategory: string;
    name: string;
    level: number;
    subCategories: string[];
  };
  amount: number;
  tags: [];
}

export interface IDailyReport {
  fromDate: string;
  toDate: string;
  categories: ICategoryReport[];
  tags: [];
  amount: number;
}

export interface IMonthlyReport extends IDailyReport {
  name: string;
  dailyReports: IDailyReport[];
}

export interface IAnnualReport extends IDailyReport {
  year: number;
  monthlyReports: IMonthlyReport[];
}

export interface IDailyCreditEvolution {
  date: string;
  credits: number;
  payments: number;
  balance: number;
}

export interface ICreditEvolutionReport {
  initialBalance: number;
  dailyReports: IDailyCreditEvolution[];
}
//-----------------------------------------------------------------------------
// CUSTOMER
//-----------------------------------------------------------------------------
export interface ICustomerContact {
  id: string;
  phone: string;
  description?: string;
  createdAt: strig;
  updatedAt: string;
}

export interface ICustomer {
  id: string;
  user?: string;
  firstName: string;
  lastName?: string;
  fullName: string;
  alias?: string;
  observation?: string;
  email?: string;
  contacts: ICustomerContact[];
  address?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  profilePhoto?: IImage;
  invoice: string[];
  balance?: number;
  firstPendingInvoice?: string;
  lastPendingInvoice?: string;
  lastPayment?: string;
  createdAt: strig;
  updatedAt: string;
}

export interface ICustomerStore {
  firstName: string;
  lastName?: string;
  alias?: string;
  observation?: string;
  email?: string;
  address?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  contacts: {
    phone: string;
    description: string;
  }[];
}

//-----------------------------------------------------------------------------
// PRODUCTS
//-----------------------------------------------------------------------------
export interface IProduct {
  id: string;
  categories: string[];
  tags: string[];
  colors: string[];
  sizes: string[];
  name: string;
  slug: string;
  ref?: string;
  barcode?: string;
  description?: string;
  image?: IImage;
  images?: string[];
  isInventoriable: boolean;
  stock: number;
  price: number;
  hasDiscount?: boolean;
  priceWithDiscount?: number;
  productIsNew?: boolean;
  published?: boolean;
  sold?: number;
  returned?: number;
  createdAt: strig;
  updatedAt: string;
}

export interface IProductWithCategories extends IProduct {
  categories: {
    id: string;
    name: string;
  }[];
}

export interface ISaleHistory {
  id: string;
  operationDate: string;
  operationType:
    | 'sale'
    | 'credit'
    | 'separate'
    | 'credit_payment'
    | 'separate_payment';
  description?: string;
  amount: number;
}
