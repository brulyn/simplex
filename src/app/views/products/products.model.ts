export class ProductModel {
    name: String = '';
    category_id: String = '';
    subcategory_id: String = '';
    instock: Number = 0;
    outstock: Number = 0;
    threshold: Number = 0;
    selling_cost: Number = 0;
    waiting_selling_cost: Number = 0;
    waiting_purchasing_cost: Number = 0;
    purchasing_cost: Number = 0;
    exempted: Boolean = false;
    stock_countdown: Number = 0;
    shop_id: String = '';
    shop_name: String = '';
}
