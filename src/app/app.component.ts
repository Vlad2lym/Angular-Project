import { Component, OnInit } from '@angular/core';
import { IProduct } from './moduls/product';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular app';
  products: IProduct[] = []
  loading = false
  term = ''

  constructor (private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.loading = true
    this.productsService.getAll().subscribe(product => {
      this.products = product
      this.loading = false
    })
  }
}
