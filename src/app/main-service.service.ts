import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  end_point_online = 'https://vast-dawn-75785.herokuapp.com';
  end_point_local = 'http://localhost:3000';
  end_point = this.end_point_online;
  constructor(private _http: Http) { }

  // Shops
  public getShops() {
    const url = this.end_point + '/api/shops';
    return this._http.get(url);
  }

  // Stores
  public getStores() {
    const url = this.end_point + '/api/stores';
    return this._http.get(url);
  }
  public createStore(store) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/stores/';
    return this._http.post(url, store, options);
  }
  public deleteStore(id) {
    const url = this.end_point + '/api/stores/' + id;
    return this._http.delete(url);
  }
  public updateStore(id, store) {
    const url = this.end_point + '/api/stores/' + id
      + '?name=' + store.name
      + '&address=' + store.address
      + '&telephone=' + store.telephone
      + '&shop_id=' + store.shop_id
      + '&manager=' + store.manager;
    return this._http.put(url, {});
  }
  // Categories
  public getCategories() {
    const url = this.end_point + '/api/categories';
    return this._http.get(url);
  }
  public createCategory(category) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/categories/';
    return this._http.post(url, category, options);
  }
  public deleteCategory(id) {
    const url = this.end_point + '/api/categories/' + id;
    return this._http.delete(url);
  }
  public updateCategory(id, category) {
    const url = this.end_point + '/api/categories/' + id
      + '?name=' + category.name
      + '&shop_id=' + category.shop_id;
    return this._http.put(url, {});
  }

  // Subcategories
  public getSubcategories() {
    const url = this.end_point + '/api/subcategories';
    return this._http.get(url);
  }
  public createSubcategory(subcategory) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/subcategories/';
    return this._http.post(url, subcategory, options);
  }
  public deleteSubcategory(id) {
    const url = this.end_point + '/api/subcategories/' + id;
    return this._http.delete(url);
  }
  public updateSubcategory(id, subcategory) {
    const url = this.end_point + '/api/subcategories/' + id
      + '?name=' + subcategory.name
      + '&category_id=' + subcategory.category_id;
    return this._http.put(url, {});
  }

  // Products
  public getProducts() {
    const url = this.end_point + '/api/products';
    return this._http.get(url);
  }
  public createProduct(product) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/products/';
    return this._http.post(url, product, options);
  }
  public deleteProduct(id) {
    const url = this.end_point + '/api/products/' + id;
    return this._http.delete(url);
  }
  public updateProduct(id, product) {
    const url = this.end_point + '/api/products/' + id
      + '?name=' + product.name
      + '&category_id=' + product.category_id
      + '&subcategory_id=' + product.subcategory_id
      + '&instock=' + product.instock
      + '&outstock=' + product.outstock
      + '&threshold=' + product.threshold
      + '&selling_cost=' + product.selling_cost
      + '&waiting_selling_cost=' + product.waiting_selling_cost
      + '&waiting_purchasing_cost=' + product.waiting_purchasing_cost
      + '&purchasing_cost=' + product.purchasing_cost
      + '&exempted=' + product.exempted
      + '&stock_countdown=' + product.stock_countdown
      + '&shop_id=' + product.shop_id;
    return this._http.put(url, {});
  }

  // Sales
  public getSales() {
    const url = this.end_point + '/api/sales';
    return this._http.get(url);
  }
  public createSale(sale) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/subcategories/';
    return this._http.post(url, sale, options);
  }
  public deleteSale(id) {
    const url = this.end_point + '/api/subcategories/' + id;
    return this._http.delete(url);
  }
  public updateSale(id, sale) {
    const url = this.end_point + '/api/subcategories/' + id
      + '?recipient=' + sale.recipient
      + '&product_id=' + sale.product_id
      + '&quantity=' + sale.quantity
      + '&total=' + sale.total
      + '&sale_date=' + sale.sale_date
      + '&payment_type=' + sale.payment_type
      + '&vat=' + sale.vat
      + '&no_vat=' + sale.no_vat
      + '&nettotal=' + sale.nettotal
      + '&paid=' + sale.paid
      + '&due=' + sale.due
      + '&profit=' + sale.profit
      + '&employee_id=' + sale.employee_id
      + '&month_year=' + sale.month_year
      + '&store_id=' + sale.store_id;
    return this._http.put(url, {});
  }

  // Expenses
  public getExpenses() {
    const url = this.end_point + '/api/expenses';
    return this._http.get(url);
  }
  public createExpense(expense) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/expenses/';
    return this._http.post(url, expense, options);
  }
  public deleteExpense(id) {
    const url = this.end_point + '/api/expenses/' + id;
    return this._http.delete(url);
  }
  public updateExpense(id, expense) {
    const url = this.end_point + '/api/expenses/' + id
      + '?product_id=' + expense.product_id
      + '&quantity=' + expense.quantity
      + '&total=' + expense.total
      + '&expense_date=' + expense.expense_date
      + '&employee_id=' + expense.employee_id
      + '&store_id=' + expense.store_id
      + '&supplier_id=' + expense.supplier_id
      + '&cost=' + expense.cost
      + '&month_year=' + expense.month_year;
    return this._http.put(url, {});
  }

  // Users
  public getUsers() {
    const url = this.end_point + '/api/users';
    return this._http.get(url);
  }
  public createUser(user) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/users/';
    return this._http.post(url, user, options);
  }
  public deleteUser(id) {
    const url = this.end_point + '/api/users/' + id;
    return this._http.delete(url);
  }
  public updateUser(id, user) {
    const url = this.end_point + '/api/users/' + id
      + '?names=' + user.names
      + '&username=' + user.username
      + '&email=' + user.email
      + '&password=' + user.password
      + '&store_id=' + user.store_id;
    return this._http.put(url, {});
  }


  // Customers
  public getCustomers() {
    const url = this.end_point + '/api/customers';
    return this._http.get(url);
  }
  public createCustomer(customer) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/customers/';
    return this._http.post(url, customer, options);
  }
  public deleteCustomer(id) {
    const url = this.end_point + '/api/customers/' + id;
    return this._http.delete(url);
  }
  public updateCustomer(id, customer) {
    const url = this.end_point + '/api/customers/' + id
      + '?names=' + customer.names
      + '&address=' + customer.address
      + '&email=' + customer.email
      + '&telephone=' + customer.telephone;
    return this._http.put(url, {});
  }

  // Suppliers
  public getSuppliers() {
    const url = this.end_point + '/api/suppliers';
    return this._http.get(url);
  }
  public createSupplier(supplier) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    const url = this.end_point + '/api/suppliers/';
    return this._http.post(url, supplier, options);
  }
  public deleteSupplier(id) {
    const url = this.end_point + '/api/suppliers/' + id;
    return this._http.delete(url);
  }
  public updateSupplier(id, supplier) {
    const url = this.end_point + '/api/suppliers/' + id
      + '?names=' + supplier.names
      + '&address=' + supplier.address
      + '&email=' + supplier.email
      + '&telephone=' + supplier.telephone;
    return this._http.put(url, {});
  }

}
