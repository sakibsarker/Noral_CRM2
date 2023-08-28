// utils/models.ts

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: Date;
    idAdress: number;
    email?: string;
    phoneNumber: number;
    situationId: number;
    disabled: boolean;
    photo: string;
  }
  
  export interface Salaries {
    id: number;
    employeeId: number;
    year: number;
    month: number;
    currency: string;
    salaryNet: number;
    salaryBrut: number;
  }
  
  export interface Contracts {
    id: number;
    employeeId: number;
    idCompany: number;
    contractTypeId: number;
    jobTypeId: number;
    jobTitleId: number;
    description: string;
    startDate: Date;
    endDate?: Date;
  }
  
  export interface DropdownValues {
    id: number;
    idCategory: number;
    labelCategory: string;
    idListed: number;
    icon: string;
    label: string;
  }
  
  export interface Product {
    id: number;
    idCategory: number;
    name: string;
    description: string;
    licenceId?: number;
    preorderPrice?: number;
    sellPrice?: number;
    buyPrice?: number;
    currency: string;
    quantityProduced?: number;
    quantityInStock?: number;
    quantitySoldDirect?: number;
    quantitySoldPro?: number;
    percentageDirect?: number;
    percentagePro?: number;
    percentageSav?: number;
    discountForPro?: number;
    dateOfPreOrder?: Date;
    dateOfOrder?: Date;
    dateOfArrival?: Date;
    dateOfDelivery?: Date;
    dateOfDiscontinuation?: Date;
  }
  
  export interface Licence {
    id: number;
    name: string;
    description?: string;
    logo?: string;
  }
  
  export interface Service {
    id: number;
    idCategory: number;
    name: string;
    description: string;
    price?: number;
    currency: string;
    availableFrom?: Date;
    availableUntil?: Date;
    discountForPro?: number;
    dateOfOrder?: Date;
    dateOfCompletion?: Date;
    dateOfDelivery?: Date;
  }
  
  export interface Production {
    id: number;
    productId: number;
    materialCosts?: number;
    laborCosts?: number;
    shippingCosts?: number;
    packagingCosts?: number;
    otherCosts?: number;
    prototypingCosts?: number;
    totalCosts?: number;
    factoryPrice?: number;
    margin?: number;
    sellPrice?: number;
    shippingPrice?: number;
    productionStartDate?: Date;
    shippingDate?: Date;
    notes?: string;
  }
  
  export interface DepensesCat {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface DepensesDetailsGroups {
    id: number;
    depensesCatId: number;
    name: string;
    description?: string;
  }
  
  export interface DepensesDetails {
    id: number;
    depensesDetailsGroupsId: number;
    name: string;
    description?: string;
    depensesCatId?: number;
  }
  
  export interface Depenses {
    id: number;
    idDepensesCat: number;
    idDepensesDetails: number;
    name: string;
    year: number;
    month: number;
    currency: string;
    htValue: number;
    ttcValue: number;
    description?: string;
  }
  
  export interface Node {
    id: number;
    name: string;
    projectId: number;
    code: string;
    isopen: boolean;
    positionX: string;
    positionY: string;
    color: string;
    icon: string;
    iconSize: number;
    nodeStyle: string;
    nodeType: string;
    parentId?: number;
  }
  
  export interface NodeProject {
    id: number;
    label: string;
    description?: string;
    type: string;
  }
  
  export interface NodeContent {
    id: number;
    nodeId: number;
    contentXS: string;
    contentS: string;
    contentM: string;
    contentL: string;
    contentXL: string;
  }
  
  export interface NodeLink {
    id: number;
    label: string;
    source: number;
    target: number;
    sourceWidth: number;
    targetWidth: number;
    strokeColor: string;
    strokeThickness: number;
    showLabel: boolean;
    labelColor: string;
    labelFontSize: number;
    baselineShift: number;
  }
  
  export interface NFT {
    id: number;
    tokenId: string;
    name: string;
    imageUrl: string;
    characteristics: any;
    description: string;
    descriptionEn: string;
    descriptionTr: string;
    descriptionKr: string;
  }
  
  export interface Job {
    id: number;
    company: string;
    date: Date;
    imageUrl: string;
    defaultLanguage: string;
    secondaryImageUrl: string;
    link: string;
    createdBy: string;
    tags: string;
    createdAt: Date;
    updatedAt: Date;
    boutonSiteEmploi: boolean;
    lienEmploi: string;
  }
  
  export interface JobDescription {
    id: number;
    jobId: number;
    language: string;
    title: string;
    description: string;
  }
  