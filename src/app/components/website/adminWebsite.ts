import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { GenericService, GlobalEventsManager } from '../../services';
import { SectionDetails } from './sectionDetails';
import { SectionList } from './sectionList';
import { SectionItemDetails } from './sectionItemDetails';
import { SectionItemList } from './sectionItemList';
import { EmployeeDetails } from '../employeeDetails';
import { CompanyDetails } from '../companyDetails';
import { ContactDetails } from '../contactDetails';
import { SliderList } from './sliderList';
import { SliderDetails } from './sliderDetails';
import { SliderTextList } from './sliderTextList';
import { SliderTextDetails } from './sliderTextDetails';
import { FundDetails } from '../stock/fundDetails';
import { FundList } from '../stock/fundList';
import { ReferenceList } from '../common/referenceList';
import { ReferenceDetails } from '../common/referenceDetails';
import { PaymentDetails } from '../stock/paymentDetails';
import { PaymentList } from '../stock/paymentList';
import { SupplierDetails } from '../stock/supplierDetails';
import { SupplierList } from '../stock/supplierList';
import { PurchaseDetails } from '../stock/purchaseDetails';
import { PurchaseList } from '../stock/purchaseList';
import { ContractLaborDetails } from '../stock/contractLaborDetails';
import { ContractLaborList } from '../stock/contractLaborList';
import { QuoteDetails } from '../stock/quoteDetails';
import { QuoteList } from '../stock/quoteList';
import { EmployeeList } from '../employeeList';




@Component({
  selector: 'app-admin-website',
  templateUrl: '../../pages/website/adminWebsite.html',
  providers: [GenericService ]
})
// tslint:disable-next-line:component-class-suffix
export class AdminWebsite implements OnInit, OnDestroy {
  [x: string]: any;

  @ViewChild(SectionDetails, {static: false}) sectionDetails: SectionDetails;
  @ViewChild(SectionList, {static: false}) sectionList: SectionList;
  @ViewChild(SliderDetails, {static: false}) sliderDetails: SliderDetails;
  @ViewChild(SliderList, {static: false}) sliderList: SliderList;
  @ViewChild(FundDetails, {static: false}) fundDetails: FundDetails;
  @ViewChild(FundList, {static: false}) fundList: FundList;
  @ViewChild(SliderTextDetails, {static: false}) sliderTextDetails: SliderTextDetails;
  @ViewChild(SliderTextList, {static: false}) sliderTextList: SliderTextList;
  @ViewChild(SectionItemDetails, {static: false}) sectionItemDetails: SectionItemDetails;
  @ViewChild(SectionItemList, {static: false}) sectionItemList: SectionItemList;
  @ViewChild(EmployeeDetails, {static: false}) employeeDetails: EmployeeDetails;
  @ViewChild(EmployeeList, {static: false}) employeeList: EmployeeList;
  @ViewChild(CompanyDetails, {static: false}) companyDetails: CompanyDetails;
  @ViewChild(ContactDetails, {static: false}) contactDetails: ContactDetails;
  @ViewChild(ReferenceDetails, {static: false}) referenceDetails: ReferenceDetails;
  @ViewChild(ReferenceList, {static: false}) referenceList: ReferenceList;
  @ViewChild(PaymentDetails, {static: false}) paymentDetails: PaymentDetails;
  @ViewChild(PaymentList, {static: false}) paymentList: PaymentList;
  @ViewChild(SupplierDetails, {static: false}) supplierDetails: SupplierDetails;
  @ViewChild(SupplierList, {static: false}) supplierList: SupplierList;
  @ViewChild(PurchaseDetails, {static: false}) purchaseDetails: PurchaseDetails;
  @ViewChild(PurchaseList, {static: false}) purchaseList: PurchaseList;
  @ViewChild(ContractLaborDetails, {static: false}) contractLaborDetails: ContractLaborDetails;
  @ViewChild(ContractLaborList, {static: false}) contractLaborList: ContractLaborList;
  @ViewChild(QuoteDetails, {static: false}) quoteDetails: QuoteDetails;
  @ViewChild(QuoteList, {static: false}) quoteList: QuoteList;


  public activeTab = 0;
  public activeEmployeeTab = 1;
  public activeCompanyTab = 1;
  public activeSliderTab = 0;
  public activeStockTab = 0;

  constructor (
    private globalEventsManager: GlobalEventsManager,
  ) {

  }

  ngOnInit() {
    this.globalEventsManager.showMenu = true;
  }

  ngOnDestroy () {
    this.sectionDetails = null;
    this.sectionList = null;
    this.sectionItemDetails = null;
    this.sectionItemList = null;
  }

  onSectionSelected($event) {
      const sectionId = $event;
      this.sectionDetails.getSection(sectionId);
  }
  onSectionItemSelected($event) {
      const sectionItemId = $event;
      this.sectionItemDetails.getSectionItem(sectionItemId);
  }

  onEmployeeSelected($event) {
      this.activeEmployeeTab = 0;
      const employeeId = $event;
      this.employeeDetails.getEmployee(employeeId);
  }
  onEmployeeSaved($event) {
	  this.employeeList.updateTable($event);
  }

  onCompanySelected($event) {
      this.activeCompanyTab = 0;
      const companyId = $event;
      this.companyDetails.getCompany(companyId);

  }

  onContactSelected($event) {
      const contactId = $event;
      this.contactDetails.getContact(contactId);
  }

  onSliderSelected($event) {
      const sliderId = $event;
      this.sliderDetails.getSlider(sliderId);
  }

  onFundSaved($event) {
	  this.fundList.updateTable($event);
  }

  onFundSelected($event) {
      const fundId = $event;
      this.fundDetails.getFund(fundId);
  }

  onSliderTextSelected($event) {
      const sliderTextId = $event;
      this.sliderTextDetails.getSliderText(sliderTextId);
  }

  onReferenceSelected($event, referenceType) {
    const referenceId = $event;
    this.referenceDetails.getReference(referenceId, referenceType);
  }

  onReferenceSaved($event) {
	  this.referenceList.updateTable($event);
  }

  onQuoteSelected($event) {
    const quoteId = $event;
    this.quoteDetails.getQuote(quoteId);
  }
  onQuoteSaved($event) {
	  this.quoteList.updateTable($event);
  }

  onContractLaborSelected($event) {
    const contractLaborId = $event;
    this.contractLaborDetails.getContractLabor(contractLaborId);
  }
  onContractLaborSaved($event) {
	  this.contractLaborList.updateTable($event);
  }

  onPaymentSelected($event) {
    const paymentId = $event;
    this.paymentDetails.getPayment(paymentId);
  }
  onPaymentSaved($event) {
	  this.paymentList.updateTable($event);
  }

  onPurchaseSelected($event) {
    const purchaseId = $event;
    this.purchaseDetails.getPurchase(purchaseId);
  }
  onPurchaseSaved($event) {
	  this.purchaseList.updateTable($event);
  }

  onSupplierSelected($event) {
    const supplierId = $event;
    this.supplierDetails.getSupplier(supplierId);
  }
  onSupplierSaved($event) {
	  this.supplierList.updateTable($event);
  }

  onTabChange(evt) {
    this.activeTab = evt.index;
    setTimeout(() => {
        if (evt.index === 0) {
        } else if (evt.index === 1) {
        }
    }, 0);
  }

  onEmployeeTabChange(evt) {
    this.activeEmployeeTab = evt.index;
  }

   onCompanyTabChange(evt) {
    this.activeCompanyTab = evt.index;
  }

  onSliderTabChange(evt) {
    this.activeSliderTab = evt.index;
  }

  onStockTabChange(evt) {
    this.activeStockTab = evt.index;
    if (evt.index === 1) {
      this.processReference(null, 'com.wack.model.stock.PaymentType', 'PAYMENT_TYPE');
    } else if (evt.index === 6) {
      this.processReference(null, 'com.wack.model.stock.Supplier', 'SUPPLIER');
    } else if (evt.index === 7) {
      this.processReference(null, 'com.wack.model.stock.Product', 'PRODUCT');
    }

  }

  processReference(categoryNumber: number, referenceType: string, listLabel: string) {
    this.globalEventsManager.selectedParentId = categoryNumber;
    this.globalEventsManager.selectedReferenceType = referenceType;
    setTimeout(() => {
      this.referenceList.updateCols(listLabel);
      this.referenceList.getAll();
    }, 10);

  }
}
