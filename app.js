require('dotenv').config();

const cors = require('cors');
const express = require('express')
const app = express()
const port = process.env.PORT || 3001;


const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const api = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
    consumerKey: process.env.WC_CONSUMER_KEY,
    consumerSecret: process.env.WC_CONSUMER_SECRET,
    version: "wc/v3"
});

const patchCount1000 = ({ namesD, d, updateTime }) => {
    const newD = {}
    for (let key in d) {
        newD[key] = { ...d[key], stock_quantity: 1000 }
    }
    const newNamesD = {}
    for (let key in namesD) {
        newNamesD[key] = { ...namesD[key], stock_quantity: 1000 }
    }
    return { namesD: newNamesD, d: newD, updateTime }
}

let updateTime = 0;
let cache = {};
const updateCache = async () => {
    let newCache = {};
    // получить список продуктов по SKU
    const { data } = await api.get(
        'products',
        {
            per_page: 100,
            sku: 'ДС.060126,ДС.060087,ДС.060092,ДС.060094,ДС.060095,ДС.060096,ДС.060098,ДС.060100,ДС.060101,ДС.060102,ДС.060104,ДС.060106,ДС.060129,ДС.060137,ДС.070951,ДС.070956,ДС.070957,ДС.071355,ДС.071380,ДС.071384,ДС.071643,ДС.070951,ДС.070956,ДС.070957,ДС.071355'

        }
    );
    //составить  список ID продуктов
    const productDictionary = {};
    const productIds = [];
    const variationDictionary = {};

    for (let product of data) {

        productDictionary[product.id] = product;
        productIds.push(product.id);
    }
    //получить варианты по ID продукта в цикле
    for (let productId of productIds) {
        const { data } = await api.get(
            `products/${productId}/variations`,
            {
                per_page: 70
            }
        );

        if (!data.length) {
            variationDictionary[productId] = { ...productDictionary[productId], productId: productId };

        }

        for (let variation of data) {
            variationDictionary[variation.id] = { ...variation, productId: productId };

        }
    }
    const d = {};
    const namesD = {};
    for (let variantId in variationDictionary) {
        const variation = variationDictionary[variantId];
        const product = productDictionary[variation.productId];
        let attributes = variation?.attributes[0]?.option || '';
        if (!attributes.match(/[0-9]+/gm)) {
            attributes = null;
        }

        d[variantId] = {
            id: variantId,
            name: product.name + (attributes ? ` (${attributes})` : ''),
            img: (variation?.image && (variation?.image[0]?.src)) || product?.images[0]?.src,
            link: variation?.permalink || product?.permalink,
            price: variation?.price || product?.price,
            attributes: attributes,
            stock_quantity: variation?.stock_quantity || product?.stock_quantity || 0,
            sku: variation?.sku || product?.sku,
        };

        const name = d[variantId].sku + '_' + d[variantId].name;
        namesD[name] = d[variantId];

    }

    //составить словарь из продуктов и вариантов с Id варианта
    updateTime = Date.now();
    newCache = {
        namesD: namesD,
        d: d,
        updateTime: updateTime

    };
    //записать в кеш
    cache = patchCount1000(newCache);
}
updateCache();
app.use(cors());

app.get('/api/get-products', async (req, res) => {
    try {
        // проверить время обновления кеша
        if (Date.now() - updateTime > 1000 * 60 * 60) {
            await updateCache();
        }
        // если время обновления кеша больше 60 мин назад, то обновить кеш
        res.json(cache);
        //вернуть кеш
    } catch (e) {
        console.log(e)
    }
    return;
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

