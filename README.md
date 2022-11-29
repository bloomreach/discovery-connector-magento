# Bloomreach Connector Module

The Connector module provides the option to connect with Bloomreach Search Merchandise and other API and pixel integration.

## Get Magento Started

- Ensure you have installed Docker and it is up to date
- Go to https://marketplace.magento.com and create an account or log into that
  portal
- Navigate to `https://marketplace.magento.com/customer/accessKeys/`
- Have a key ready to be used (create a new one if you need one. Key name does
  not matter)

Please run the `install_magento.sh` script.

- You will be prompted for a user name and password:
  UserName = Public Key from marketplace.magento.com
  Password = Private Key from marketplace.magento.com

Troubleshooting:

All of the videos to understand magento set up via docker is discussed here:

https://courses.m.academy/courses/set-up-magento-2-development-environment-docker/lectures/9064350

## Configure App First

To integrate any options from this extension you need to fill app configuration settings.
To do this you can follow these steps to trigger index.

- Step 1: Login to admin, if not already logged-in
- Step 2: Goto Store->Configuration
- Step 3: Find "Bloomreach" Section
- Step 4: Click on "Settings" Tab under Bloomreach Section
- Step 5: Fill all options: You can get these setting values from your Bloomreach account.
  - Account Id
  - Domain Key: `This may vary for your each store view, if you have multiple locale enable in Magento and you have configured multiple locale in Bloomreach as well.`
  - Auth Key
  - Tracking Cookie
  - Search Endpoint: use this highlighted and replace domain name with `<your_domain_name>` `http://<your_domain_name>/catalogsearch/result/`
  - Autosuggest Endpoint: use this highlighted and replace domain name with `<your_domain_name>` `http://<your_domain_name>/search/ajax/suggest/`

## Trigger Indexing

When you made any changes on catalog at Bloomreach, then you may need to reindex those to reflect on your site.
To do this you can follow these steps to trigger index.

- Step 1: Login to admin, if not already logged-in
- Step 2: Goto Store->Configuration
- Step 3: Find "Bloomreach" Section
- Step 4: Click on "Indexing" Tab under Bloomreach Section
- Step 5: Now click on button named "Trigger Index"

## Search Module Options

### Auto-Suggest

**Enable customers to use fast and secure way to search products, and seamless experience.**
To enable it, you can configure it from admin panel.

- Step 1: Login to admin, if not already logged-in
- Step 2: Goto Store->Configuration
- Step 3: Find "Bloomreach" Section
- Step 4: Click on "Search" Tab under Bloomreach Section
- Step 5: Here you can configure Autosuggest by setting **Yes** for **Enable Autosuggest**
- Step 6: Now enter or cross verify your frontend quick search input selector (id/css path)
- Step 7: Here you can select No. of Terms, products, categories to show by default in quicksearch result popup.
- Step 8: Save configuration and Clean/Flush cache.

### Site Search

**Replace existing search result page with more efficient and fast search results.**
You can follow **above steps from Auto Suggest** both Configuration groups are in same page.

- Step 9: You can configure Site Search i.e site search result page with Bloomreach search page for fast and efficient search result, in this same page where you have autosuggest.
- Step 10: Enable Site search by setting **YES** to **Enable Site Search**

- Step 11: **Do not change "Css Selector" value, until you know what exactly you are going to do**

- Step 12: Configure other options like: No of products to show, Show Variants, Show Layered Navigation etc.

- Step 13: Save configuration and Clear/Flush Cache.

## Category

**Replace existing product listing page/ category view page with Bloomreach product listing page.**

It works similar to site search and have same options as site search have.
Navigate to **Category** Tab under **Bloomreach** Section

- Step 1: Enable Category by setting **YES** to **Enable For Category**

- Step 2: **Do not change "Css Selector" value, until you know what exactly you are going to do**

- Step 3: Configure other options like: No of products to show, Show Variants, Show Layered Navigation etc.

- Step 4: Save configuration and Clear/Flush Cache.

## Pixel

You can enable Bloomreach pixel by just setting **Yes**, under Pixel Tab.
Pixel collect customer's behavioral data, like what they are looking into site (category, products), what they have added to cart and conversion (order placed).

###Pixel mainly collect data for these events, when you:

- Visit Homepage or any CMS page
- Visit Category page
- Visit Product Page
- Search for anything and land into search result page
- Add to cart any product
- Quick view any product (not integrated by default, can be done manually. See below)
- Placed an order and went to order success page after order completion

###Data Bloomreach collect:

- Page url
- User id (logged-in customer unique id encrypted hash)
- Product id
- Product Sku
- Product Name
- Order grand total
- Order item info (sku, qty ordered, name, unit price)
- Event type

You as Admin these data are very useful which gives your insights of your customer needs that you can use for giving more related information and products to customer, and will be used for Personalized Recommendation widget. (will be covering in next section)

Also, There is already pixel integrated for **add to cart event** which you can find in template at this path: **Bloomreach/Connector/view/frontend/templates/product/**, there are 2 files

- list.phtml
- view/addtocart.phtml

sample the code which is added for add to cart event, looks something like this:

```Sample code for Add to cart event
<button type="submit"
        data-blm-add-to-cart
        data-blm-add-to-cart-sku="<?= $block->escapeHtml($_product->getSku()) ?>"
        data-blm-add-to-cart-prod-id="<?=  /* @noEscape */ $_product->getId() ?>"
        data-blm-add-to-cart-prod-name="<?= $block->escapeHtml($_product->getName()) ?>"
        title="<?= $block->escapeHtmlAttr($buttonTitle) ?>"
        class="action primary tocart"
        id="product-addtocart-button">
    <span><?= $block->escapeHtml($buttonTitle) ?></span>
</button>
```

As you may know in Magento there is no **quick view** feature by default, so it is not added. Whilst you can **add Quick View button event** if you have integrated any 3rd party quick view extension. To integrate **quick view event** you can override that 3rd party listing files or any file where quick view button is added. Then **add following attribute to that Quick view button/anchor**.

```
data-blm-quickview
data-blm-quickview-sku="Chair123"
data-blm-quickview-prod-id="60765"
data-blm-quickview-prod-name="Weathered Gray Wood Jozy Dining Chairs Set of 2"
```

**Note: Replace sku, product id, and product name with respective getter of product object.**

It may be look like, something similar:

```
<button type="button"
        data-blm-quickview
        data-blm-quickview-sku="<?= $block->escapeHtml($_product->getSku()) ?>"
        data-blm-quickview-prod-id="<?=  /* @noEscape */ $_product->getId() ?>"
        data-blm-quickview-prod-name="<?= $block->escapeHtml($_product->getName()) ?>"
        title="<?= $block->escapeHtmlAttr($buttonTitle) ?>"
        class="action quick-view">
```

###Note: You can install Bloomreach Pixel Validator in chrome to validate these events

## Recommendation Widget

Allow you as Admin to add widgets into any cms page or block or any part of page.
It has various options:

- Category
- Keyword
- Personalised
- For specific Item etc., Which can be selected at time of inserting this widget.

- Step 1: To enable widget you can Navigate to **Recommendations** Tab under **Bloomreach** Section
- Step 2: Set **Yes** for **Enable Recommendation Widget**
- Step 3: Save configuration and Clean/Flush Cache.

- Step 4: Inset widget in any CMS Page or block and see effect on frontend.

`Note: Please make sure you have already created these widget rules in Bloomreach Main Dashboard, where you will get widget id, which is required to load any widget in magento. For each widget type you will have different widget id in Bloomreach Main Dashboard.`
