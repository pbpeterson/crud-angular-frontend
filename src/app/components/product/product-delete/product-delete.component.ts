import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(private productService: ProductService, private routes: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.readById(id!).subscribe(product => {
      this.product = product
    })
  }

  deleteProduct(): void {
    this.productService.delete(String(this.product.id)).subscribe(() => {
      this.productService.showMessage('Produto excluído com sucesso!')
      this.routes.navigate(['/products'])
    })
  }

  cancel(): void {
    this.routes.navigate(['/products'])
  }

}
