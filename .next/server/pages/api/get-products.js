(function() {
var exports = {};
exports.id = 228;
exports.ids = [228];
exports.modules = {

/***/ 908:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ handler; }
});

;// CONCATENATED MODULE: external "nextjs-cors"
var external_nextjs_cors_namespaceObject = require("nextjs-cors");;
var external_nextjs_cors_default = /*#__PURE__*/__webpack_require__.n(external_nextjs_cors_namespaceObject);
;// CONCATENATED MODULE: ./pages/api/get-products.js
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const WooCommerceRestApi = __webpack_require__(968).default;

const api = new WooCommerceRestApi({
  url: "https://masterprof-season.ru",
  consumerKey: process.env.WC_CONSUMER_KEY,
  consumerSecret: process.env.WC_CONSUMER_SECRET,
  version: "wc/v3"
});
let updateTime = 0;
let cache = {};

const updateCache = async () => {
  let newCache = {}; // получить список продуктов по SKU

  const {
    data
  } = await api.get('products', {
    per_page: 50,
    sku: 'ДС.060087,ДС.060092,ДС.060094,ДС.060095,ДС.060096,ДС.060098,ДС.060100,ДС.060101,ДС.060102,ДС.060104,ДС.060106,ДС.060129,ДС.060137,ДС.070951,ДС.070956,ДС.070957,ДС.071355,ДС.071380,ДС.071384,ДС.071643,ДС.070951,ДС.070956,ДС.070957,ДС.071355'
  }); //составить  список ID продуктов

  const productDictionary = {};
  const productIds = [];
  const variationDictionary = {};

  for (let product of data) {
    productDictionary[product.id] = product;
    productIds.push(product.id);
  } //получить варианты по ID продукта в цикле


  for (let productId of productIds) {
    const {
      data
    } = await api.get(`products/${productId}/variations`, {
      per_page: 50
    });

    for (let variation of data) {
      variationDictionary[variation.id] = _objectSpread(_objectSpread({}, variation), {}, {
        productId: productId
      });
    }
  }

  const d = {};

  for (let variantId in variationDictionary) {
    var _variation$attributes, _variation$image$, _product$images$;

    const variation = variationDictionary[variantId];
    const product = productDictionary[variation.productId];
    let attributes = (variation === null || variation === void 0 ? void 0 : (_variation$attributes = variation.attributes[0]) === null || _variation$attributes === void 0 ? void 0 : _variation$attributes.option) || '';

    if (!attributes.match(/[0-9]+/gm)) {
      attributes = null;
    }

    d[variantId] = {
      id: variantId,
      name: product.name + (attributes ? ` (${attributes})` : ''),
      img: (variation === null || variation === void 0 ? void 0 : (_variation$image$ = variation.image[0]) === null || _variation$image$ === void 0 ? void 0 : _variation$image$.src) || (product === null || product === void 0 ? void 0 : (_product$images$ = product.images[0]) === null || _product$images$ === void 0 ? void 0 : _product$images$.src),
      link: (variation === null || variation === void 0 ? void 0 : variation.permalink) || (product === null || product === void 0 ? void 0 : product.permalink),
      price: (variation === null || variation === void 0 ? void 0 : variation.price) || (product === null || product === void 0 ? void 0 : product.price),
      attributes: attributes
    };
  } //составить словарь из продуктов и вариантов с Id варианта


  updateTime = Date.now();
  newCache = {
    d: d,
    updateTime: updateTime
  }; //записать в кеш

  cache = newCache;
};

updateCache();
/**
 * Get Products.
 *
 * Endpoint /api/get-products or '/api/get-products?perPage=2'
 *
 * @param req
 * @param res
 * @return {Promise<void>}
 * {d:{
 * <variantID>:
 *  {name:<variantName>,
 *  price:<variantPrice>,
 *  image:<variantImage>
 * }}}
 * 
 */

async function handler(req, res) {
  var _req$query;

  await external_nextjs_cors_default()(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204

  });

  try {
    // проверить время обновления кеша
    if (Date.now() - updateTime > 1000 * 60 * 60) {
      await updateCache();
    } // если время обновления кеша больше 15 мин назад, то обновить кеш


    res.json(cache); //вернуть кеш
  } catch (e) {
    console.log(e);
  }

  return;
  const responseData = {
    success: false,
    products: []
  };
  const {
    perPage
  } = (_req$query = req === null || req === void 0 ? void 0 : req.query) !== null && _req$query !== void 0 ? _req$query : {};

  try {
    const {
      data
    } = await api.get( // 'products',
    'products/288217/variations', {
      per_page: perPage || 50 //sku: 'ДС.060087,ДС.060092,ДС.060094,ДС.060095,ДС.060096,ДС.060098,ДС.060100,ДС.060101,ДС.060102,ДС.060104,ДС.060106,ДС.060129,ДС.060137,ДС.070951,ДС.070956,ДС.070957,ДС.071355,ДС.071380,ДС.071384,ДС.071643'

    });
    responseData.success = true;
    responseData.products = data;
    console.log(responseData[0]);
    res.json(responseData);
  } catch (error) {
    responseData.error = error.message;
    res.status(500).json(responseData);
  }
}

/***/ }),

/***/ 968:
/***/ (function(module) {

"use strict";
module.exports = require("@woocommerce/woocommerce-rest-api");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = (__webpack_exec__(908));
module.exports = __webpack_exports__;

})();