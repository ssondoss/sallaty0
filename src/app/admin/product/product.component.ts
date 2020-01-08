import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
 
  private URL:string;
  newProductForm: FormGroup;
  productArray:any;
  categoryArray: any;

  constructor(public formBuilder: FormBuilder, public router: Router, public snackBar: MatSnackBar , private http: HttpClient) { }

  ngOnInit() {
    this.URL=environment.apiUrl+'/product';
    this.getProduct();
    this.getCategories();
    this.newProductForm = this.formBuilder.group({
      'titleEnglish': ['', Validators.required],
      'titleArabic': ['', Validators.required],
      'descriptionEnglish' : ['', Validators.required],
      'descriptionArabic': ['', Validators.required],
      'availability':[ , Validators.required],
      'priceJD':[ , Validators.required],
      'priceSAR':[ , Validators.required],
      'categoryId':[ , Validators.required],
    });
  }
  
  public getProduct():void {
    this.http.get(this.URL).subscribe((data) => {
      this.productArray = data});  
  }

  public onAddProduct(values:Object) {
    if (this.newProductForm.valid)
    this.http.post(this.URL,this.newProductForm.value).subscribe({
      next: response => { this.snackBar.open('New Product was Created Successfully!', 
                         '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 }); this.refresh();},
      error: (response: HttpErrorResponse) => { this.snackBar.open('Sorry , There wan an error while creating the new Product !',
                                             '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 } );}
      });
  else
  this.snackBar.open('all the fields are required',
  'x', {panelClass:'error', verticalPosition: 'top', duration: 3000 });
  }

  public deleteProduct(product:any):void{
    this.http.delete(this.URL+'/'+product.id).subscribe({
      next: response => { this.snackBar.open('Product was Deleted Successfully!', 
      '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      this.refresh();},
      error: (response: HttpErrorResponse) => {
        this.snackBar.open('Sorry , There wan an error while deleting the Product !', 
      '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 } );}
    });
  }
  
  private getCategories():void{
    this.http.get(environment.apiUrl+'/category')
    .subscribe((data) => {
       this.categoryArray = data});  
  }

  private refresh(): void {
    window.location.reload();
  }
}
