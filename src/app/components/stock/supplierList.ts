import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { GenericService, GlobalEventsManager } from '../../services';
import { TranslateService, LangChangeEvent} from '@ngx-translate/core';
import { Fund, Supplier } from 'src/app/models';

@Component({
  selector: 'app-supplier-list',
  templateUrl: '../../pages/stock/supplierList.html',
  providers: [GenericService]
})
// tslint:disable-next-line:component-class-suffix
export class SupplierList implements OnInit, OnDestroy {

  suppliers: Supplier[] = [];
  selectedSupplier: Supplier;
  cols: any[];

  @Output() supplierIdEvent = new EventEmitter<string>();


  constructor
    (
    private genericService: GenericService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    public globalEventsManager: GlobalEventsManager,
    private router: Router,
    ) {
  }

  ngOnInit(): void {

    this.cols = [
            { field: 'name', header: 'Name', headerKey: 'COMMON.NAME', type: 'string',
                  style: {width: '20%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} },
            { field: 'contact', header: 'Contact', headerKey: 'COMMON.CONTACT',
                  style: {width: '20%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} },
            { field: 'phone', header: 'Phone', headerKey: 'COMMON.PHONE',
                  style: {width: '10%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} },
            { field: 'email', header: 'Email', headerKey: 'COMMON.EMAIL',
                  style: {width: '15%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} },
            { field: 'address', header: 'Address', headerKey: 'COMMON.ADDRESS',
                  style: {width: '25%', 'text-align': 'center'},
                  textstyle: {'text-overflow': 'ellipsis', 'overflow': 'hidden', 'white-space': 'nowrap'} }
        ];

    this.route
        .queryParams
        .subscribe(params => {

          const parameters: string [] = [];

          this.genericService.getAllByCriteria('com.wack.model.stock.Supplier', parameters)
            .subscribe((data: Supplier[]) => {
              this.suppliers = data;
            },
            error => console.log(error),
            () => console.log('Get all Supplier complete'));
     });


    this.updateCols();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.updateCols();
    });
  }


  updateCols() {
    // tslint:disable-next-line:forin
    for (const index in this.cols) {
      const col = this.cols[index];
      this.translate.get(col.headerKey).subscribe((res: string) => {
        col.header = res;
      });
    }
  }


  ngOnDestroy() {
    this.suppliers = null;
  }

  edit(supplier: Supplier) {
      this.supplierIdEvent.emit(supplier.id + '');
      this.selectedSupplier = supplier;
  }

  delete(supplierId: number) {
  
  }

  updateTable(supplier: Supplier) {
		const index = this.suppliers.findIndex(x => x.id === supplier.id);

		if (index === -1) {
			this.suppliers.push(supplier);
		} else {
			this.suppliers[index] = supplier;
		}

  }
  
 }
