/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dist_cook_me_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _dist_anyonecancook_logo_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
// Imports





var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_dist_cook_me_svg__WEBPACK_IMPORTED_MODULE_3__["default"]);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_dist_anyonecancook_logo_svg__WEBPACK_IMPORTED_MODULE_4__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  display: flex;\n  background-color: ffffff;\n  height: 97vh;\n  width: 99vw;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.header-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  height: 50px;\n  margin: 0px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~~fonts~~~~~~~~~~~~~~~~~~~~~~~ */\n/* font-family: 'Edu TAS Beginner'; */\n/* font-family: 'Raleway', sans-serif; */\n/* ~~~~~~~~~~~~~~~~~~~text~~~~~~~~~~~~~~~~~~~~~~~ */\nh1 {\n  display: inline;\n  justify-self: center;\n  align-items: center;\n  font-family: \"Edu TAS Beginner\";\n  font-stretch: expanded;\n  flex-shrink: 2;\n  font-size: 3em;\n  margin: -1%;\n}\n\nh2 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-size: 200%;\n  text-align: center;\n  width: 100%;\n}\n\n.search-header,\n.search-favorite-header {\n  font-size: 220%;\n  font-family: \"Raleway\", sans-serif;\n  margin: 0;\n}\n\n.side-bar-Recipe-title {\n  display: flex;\n  justify-self: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-size: 200%;\n  font-family: \"Raleway\", sans-serif;\n  margin: 0;\n  padding-top: 0.5em;\n}\n\n.list-recipes {\n  display: flex;\n  flex-direction: column;\n  font-family: \"Raleway\", sans-serif;\n  text-align: center;\n  color: white;\n  font-size: 80%;\n  padding-left: 1em;\n}\n\n.tag-names {\n  display: flex;\n  justify-self: flex-start;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  font-size: 200%;\n  font-family: \"Raleway\", sans-serif;\n  margin: 0;\n  padding-top: 0.5em;\n  padding-bottom: 1em;\n}\n\nli {\n  list-style-type: circle;\n  padding-left: 1em;\n  font-size: 14pt;\n}\n\n.p {\n  display: flex;\n  margin: 0%;\n}\n\n.recipes-list {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 40px;\n  cursor: pointer;\n  margin: 2%;\n  padding: 0;\n  font-size: 1.2em;\n  border: 1px groove rgb(93, 93, 93);\n  border-radius: 10px;\n  transition: 0.5s;\n}\n\n.recipes-list:hover {\n  background-color: grey;\n}\n\n/* ~~~~~~~~~~~~~~~~~~images~~~~~~~~~~~~~~~~~~~~~~ */\n.logo-img {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 90%;\n}\n\n.home-img,\n.fav-img {\n  display: flex;\n  height: 60%;\n  margin-right: 5px;\n  padding: 5px;\n  cursor: pointer;\n  border: 1px solid black;\n  border-radius: 10px;\n  transition: 0.3s;\n}\n\n.fav-img:hover {\n  background-color: rgb(255, 84, 84);\n}\n\n.home-img:hover {\n  filter: invert(100);\n  background-color: white;\n}\n\n.icon-1-img,\n.icon-2-img,\n.icon-3-img,\n.icon-4-img,\n.icon-5-img,\n.icon-6-img {\n  flex: 1 0 auto;\n  height: auto;\n  width: 100%;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 8px;\n}\n\n.random-feature-img {\n  height: 120%;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 10px;\n  filter: drop-shadow(5px 10px 3px black);\n}\n\n.easter-egg {\n  display: flex;\n  justify-self: flex-start;\n  align-self: flex-end;\n  height: 30px;\n  width: 30px;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n/* ~~~~~~~~~~~~~~~home page~~~~~~~~~~~~~~~~~~~ */\n.h1-wrapper {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.main-body {\n  display: flex;\n  flex-direction: column;\n  width: 80%;\n}\n\n.header-icons-container,\n.header-logo-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 10%;\n  margin: 0px;\n}\n\n.search-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 20%;\n  width: 100%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  color: white;\n}\n\n.radio-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  height: 30%;\n  width: 45%;\n}\n\n.home-recipe-sidebar {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  width: 18%;\n  border-radius: 10px;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  overflow-y: scroll;\n  scrollbar-color: black;\n  scrollbar-width: thin;\n}\n\n.main-page-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 80%;\n  width: 100%;\n}\n\n.feature-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  height: 60%;\n  width: 70%;\n  border-radius: 10px;\n  margin-bottom: 50px;\n}\n\n.meal-box {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  height: 175px;\n  width: 400px;\n  margin-left: -25%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  filter: drop-shadow(5px 10px 3px black);\n  border-radius: 8px;\n}\n\n.recipe-icon-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-wrap: wrap;\n  height: 100%;\n  width: 30%;\n}\n\n.recipe-icons {\n  display: flex;\n  flex-wrap: wrap;\n  height: 125px;\n  width: 125px;\n  filter: drop-shadow(1px 2px 2px grey);\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.recipe-icons:hover {\n  box-shadow: 4px 4px 4px black;\n}\n\n.side-bar-title-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  height: 100px;\n  width: 100%;\n  color: white;\n  text-decoration: 2px underline;\n}\n\n/* ~~~~~~~~~~~~~~~~~~view recipe user story~~~~~~~~~~~~~~~~~~~~~~ */\n.recipe-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  height: 95%;\n  width: 100%;\n}\n\n.recipe-img-price-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 49%;\n  height: 100%;\n}\n\n.recipe-description-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 49%;\n  background-color: black;\n  color: white;\n  margin: 0;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.recipe-title-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: \"Edu TAS Beginner\";\n  text-align: center;\n  color: white;\n  font-size: 2em;\n  height: 10%;\n  width: 90%;\n  margin-bottom: 0;\n}\n\n.recipe-container-upper-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 50%;\n  width: 100%;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.selected-recipe-img {\n  display: flex;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 10px;\n  height: 100%;\n}\n\n.recipe-container-lower-wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-evenly;\n  height: 50%;\n  width: 100%;\n}\n\n.total-price-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: 1.5em;\n  height: 10%;\n  width: 100%;\n  margin: 0;\n}\n\n.ingredient-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-content: center;\n  height: 98%;\n  width: 100%;\n  color: white;\n  background-color: black;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.ingredient-title-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0%;\n  width: 100%;\n}\n\n.ingredient-title {\n  display: flex;\n  color: white;\n  font-family: \"Edu TAS Beginner\";\n  justify-content: center;\n  text-align: center;\n  font-size: 1.5em;\n  kerning: 4cm;\n  margin: 0%;\n  width: 100%;\n}\n\n.recipe-info-box {\n  display: flex;\n  flex-direction: column;\n  height: 80%;\n  width: 90%;\n  margin: 2px;\n  overflow-y: scroll;\n}\n\n.recipe-instructions {\n  font-size: 1.2em;\n  margin: 0;\n  padding: 0;\n}\n\n.recipe-ingredients,\n.ingredient-prices,\n.ingredient-quantities {\n  margin: 0;\n  padding-left: 3%;\n  border: 0.5px solid white;\n}\n\n.prices,\n.names,\n.quantities {\n  margin: 0;\n  padding: 0;\n}\n\n.ingredient-boxes-container {\n  height: 80%;\n  width: 100%;\n  font-size: 1.2em;\n  display: grid;\n  grid-template-columns: 30% 50% 20%;\n  margin: 0;\n  padding: 0;\n  overflow-y: scroll;\n}\n\n.add-favorite-button {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  margin-right: 2%;\n  font-size: 1.5em;\n  background-color: black;\n}\n\n.favorite-button-container {\n  display: flex;\n  flex-direction: row;\n  height: 70px;\n}\n\n.add-favorites-text {\n  margin-left: 2%;\n}\n\n/* ~~~~~~~~~~~~~~~~~~view favorite recipe user story~~~~~~~~~~~~~~~~~~~~~~ */\n.search-favorite-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 20%;\n  width: 100%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  color: white;\n}\n\n.remove-filters-button-fav,\n.remove-filters-button,\n.add-ingredient-btn,\n.convert-to-id {\n  background-color: black;\n  color: white;\n  margin-left: 3%;\n}\n\n.convert-to-id,\n.add-ingredient-btn {\n  margin: 5px 0px 10px 0px;\n}\n\n.fav-container-lower-wrapper {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  width: 100%;\n  height: 80%;\n  margin-top: 1%;\n  overflow: scroll;\n}\n\n.remove-filters-button:hover {\n  background-color: rgb(42, 40, 40);\n}\n\n.main-favorite-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n  background-repeat: no-repeat;\n  background-position: center;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n}\n\n.favorite-recipe-container,\n.user-info-pantry-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 95%;\n  margin-top: 1%;\n  border: 1px solid black;\n  border-radius: 10px;\n}\n\n.user-info-pantry-container {\n  display: flex;\n  height: 250px;\n}\n\n.favorite-recipe-container {\n  height: 375px;\n}\n\n.favorite-recipe-icons {\n  display: flex;\n  flex-direction: column;\n  justify-self: center;\n  height: 260px;\n  width: 200px;\n  border-radius: 10px;\n  margin-left: 1%;\n  border: 1px solid black;\n}\n\n.favorite-recipe-images {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  height: 175px;\n  width: 175px;\n  border-radius: 10px;\n  margin: 3%;\n  cursor: pointer;\n  margin-bottom: 1%;\n}\n\n.favorite-recipe-icons {\n  display: flex;\n  flex-direction: column;\n  justify-self: center;\n  height: 275px;\n  width: 200px;\n  border-radius: 10px;\n  margin-left: 1%;\n  border: 1px solid black;\n}\n\n.icon-text {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-self: center;\n  justify-self: center;\n  text-align: center;\n  width: 90%;\n  height: 10%;\n  padding: 1%;\n  margin-bottom: 3%;\n}\n\n.button-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.remove-from-favorites-btn, .cook-me-btn {\n  text-align: center;\n  width: 35%;\n  margin: 7%;\n  font-size: 10px;\n}\n\n.user-pantry-title-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n  width: 100%;\n  height: 20%;\n}\n\n.favorite-recipe-title,\n.user-pantry-title,\n.add-ing-title {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  font-family: \"Edu TAS Beginner\";\n  font-size: 25pt;\n  margin: 0%;\n}\n\n.add-ing-title {\n  margin-bottom: 10px;\n}\n\n.pantry-items {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  font-size: 1em;\n}\n\n.pantry-ingredients {\n  display: flex;\n  flex-direction: column;\n  height: 75%;\n  width: 98%;\n  margin: 1px 10px 5px 10px;\n  flex-wrap: wrap;\n  overflow: scroll;\n}\n\n.go-to-form-button,\n.refresh-pantry {\n  margin: 5px 0px 0px 10px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~~add ingredient form~~~~~~~~~~~ */\n.add-pantry-ingredient-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  justify-self: center;\n  border-radius: 10px;\n  padding: 2px 20px 20px 20px;\n  margin: 0;\n  height: 250px;\n  width: 200px;\n  border: 1px solid grey;\n  filter: drop-shadow(1px 2px 2px grey);\n}\n\n/* ~~~~~~~~~~~~~~~~~~aux~~~~~~~~~~~~~~~~~~~~~~ */\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"AAAA;EACE,aAAA;EACA,wBAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA,oDAAA;AACA,qCAAA;AACA,wCAAA;AACA,mDAAA;AACA;EACE,eAAA;EACA,oBAAA;EACA,mBAAA;EACA,+BAAA;EACA,sBAAA;EACA,cAAA;EACA,cAAA;EACA,WAAA;AACF;;AAEA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,kBAAA;EACA,WAAA;AACF;;AAEA;;EAEE,eAAA;EACA,kCAAA;EACA,SAAA;AACF;;AAEA;EACE,aAAA;EACA,wBAAA;EACA,uBAAA;EACA,mBAAA;EACA,eAAA;EACA,kCAAA;EACA,SAAA;EACA,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,kCAAA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,iBAAA;AACF;;AAEA;EACE,aAAA;EACA,wBAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;EACA,kCAAA;EACA,SAAA;EACA,kBAAA;EACA,mBAAA;AACF;;AAEA;EACE,uBAAA;EACA,iBAAA;EACA,eAAA;AACF;;AAEA;EACE,aAAA;EACA,UAAA;AACF;;AAEA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,eAAA;EACA,UAAA;EACA,UAAA;EACA,gBAAA;EACA,kCAAA;EACA,mBAAA;EACA,gBAAA;AACF;;AAEA;EACE,sBAAA;AACF;;AAEA,mDAAA;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;AACF;;AAEA;;EAEE,aAAA;EACA,WAAA;EACA,iBAAA;EACA,YAAA;EACA,eAAA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;AACF;;AAEA;EACE,kCAAA;AACF;;AAEA;EACE,mBAAA;EACA,uBAAA;AACF;;AAEA;;;;;;EAME,cAAA;EACA,YAAA;EACA,WAAA;EACA,iCAAA;EACA,kBAAA;AACF;;AAEA;EACE,YAAA;EACA,iCAAA;EACA,mBAAA;EACA,uCAAA;AACF;;AAEA;EACE,aAAA;EACA,wBAAA;EACA,oBAAA;EACA,YAAA;EACA,WAAA;EACA,yDAAA;AACF;;AACA,gDAAA;AACA;EACE,aAAA;EACA,uBAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,UAAA;AAEF;;AACA;;EAEE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,UAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,WAAA;EACA,gEAAA;EACA,YAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,UAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,YAAA;EACA,UAAA;EACA,mBAAA;EACA,gEAAA;EACA,kBAAA;EACA,sBAAA;EACA,qBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,WAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,UAAA;EACA,mBAAA;EACA,mBAAA;AAEF;;AACA;EACE,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,iBAAA;EACA,gEAAA;EACA,uCAAA;EACA,kBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,6BAAA;EACA,mBAAA;EACA,eAAA;EACA,YAAA;EACA,UAAA;AAEF;;AACA;EACE,aAAA;EACA,eAAA;EACA,aAAA;EACA,YAAA;EACA,qCAAA;EACA,kBAAA;EACA,eAAA;AAEF;;AACA;EACE,6BAAA;AAEF;;AACA;EACE,aAAA;EACA,uBAAA;EACA,uBAAA;EACA,aAAA;EACA,WAAA;EACA,YAAA;EACA,8BAAA;AAEF;;AACA,mEAAA;AACA;EACE,aAAA;EACA,mBAAA;EACA,6BAAA;EACA,WAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,UAAA;EACA,YAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,UAAA;EACA,uBAAA;EACA,YAAA;EACA,SAAA;EACA,uBAAA;EACA,mBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,+BAAA;EACA,kBAAA;EACA,YAAA;EACA,cAAA;EACA,WAAA;EACA,UAAA;EACA,gBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,WAAA;EACA,WAAA;EACA,uBAAA;EACA,mBAAA;AAEF;;AACA;EACE,aAAA;EACA,iCAAA;EACA,mBAAA;EACA,YAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,6BAAA;EACA,WAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,kBAAA;EACA,gBAAA;EACA,WAAA;EACA,WAAA;EACA,SAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,qBAAA;EACA,WAAA;EACA,WAAA;EACA,YAAA;EACA,uBAAA;EACA,uBAAA;EACA,mBAAA;AAEF;;AACA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,UAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,YAAA;EACA,+BAAA;EACA,uBAAA;EACA,kBAAA;EACA,gBAAA;EACA,YAAA;EACA,UAAA;EACA,WAAA;AAEF;;AACA;EACE,aAAA;EACA,sBAAA;EACA,WAAA;EACA,UAAA;EACA,WAAA;EACA,kBAAA;AAEF;;AACA;EACE,gBAAA;EACA,SAAA;EACA,UAAA;AAEF;;AACA;;;EAGE,SAAA;EACA,gBAAA;EACA,yBAAA;AAEF;;AACA;;;EAGE,SAAA;EACA,UAAA;AAEF;;AACA;EACE,WAAA;EACA,WAAA;EACA,gBAAA;EACA,aAAA;EACA,kCAAA;EACA,SAAA;EACA,UAAA;EACA,kBAAA;AAEF;;AACA;EACE,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,gBAAA;EACA,gBAAA;EACA,uBAAA;AAEF;;AACA;EACE,aAAA;EACA,mBAAA;EACA,YAAA;AAEF;;AACA;EACE,eAAA;AAEF;;AACA,4EAAA;AACA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,WAAA;EACA,gEAAA;EACA,YAAA;AAEF;;AACA;;;;EAIE,uBAAA;EACA,YAAA;EACA,eAAA;AAEF;;AACA;;EAEE,wBAAA;AAEF;;AACA;EACE,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,WAAA;EACA,WAAA;EACA,cAAA;EACA,gBAAA;AAEF;;AAEA;EACE,iCAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,2BAAA;EACA,8HAAA;EACA,4BAAA;EACA,2BAAA;EACA,mBAAA;EACA,YAAA;EACA,WAAA;AACF;;AAEA;;EAEE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,UAAA;EACA,cAAA;EACA,uBAAA;EACA,mBAAA;AACF;;AAEA;EACE,aAAA;EACA,aAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,oBAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;EACA,uBAAA;AACF;;AAEA;EACE,aAAA;EACA,oBAAA;EACA,kBAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,UAAA;EACA,eAAA;EACA,iBAAA;AACF;;AAEA;EACE,aAAA;EACA,sBAAA;EACA,oBAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;EACA,eAAA;EACA,uBAAA;AACF;;AAEA;EACE,aAAA;EACA,qBAAA;EACA,uBAAA;EACA,kBAAA;EACA,oBAAA;EACA,kBAAA;EACA,UAAA;EACA,WAAA;EACA,WAAA;EACA,iBAAA;AACF;;AAEA;EACE,aAAA;EACA,mBAAA;EACA,uBAAA;AACF;;AAEA;EACE,kBAAA;EACA,UAAA;EACA,UAAA;EACA,eAAA;AACF;;AAGA;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,oBAAA;EACA,WAAA;EACA,WAAA;AAAF;;AAGA;;;EAGE,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,qBAAA;EACA,+BAAA;EACA,eAAA;EACA,UAAA;AAAF;;AAGA;EACE,mBAAA;AAAF;;AAGA;EACE,aAAA;EACA,eAAA;EACA,SAAA;EACA,UAAA;EACA,cAAA;AAAF;;AAGC;EACC,aAAA;EACA,sBAAA;EACA,WAAA;EACA,UAAA;EACA,yBAAA;EACA,eAAA;EACA,gBAAA;AAAF;;AAGA;;EAEE,wBAAA;AAAF;;AAGA,sDAAA;AAEA;EACE,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,oBAAA;EACA,mBAAA;EACA,2BAAA;EACA,SAAA;EACA,aAAA;EACA,YAAA;EACA,sBAAA;EACA,qCAAA;AADF;;AAIA,gDAAA;AACA;EACE,aAAA;AADF","sourcesContent":["body {\n  display: flex;\n  background-color: ffffff;\n  height: 97vh;\n  width: 99vw;\n}\n\nbutton {\n  cursor: pointer;\n}\n\n.header-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  width: 100%;\n  height: 50px;\n  margin: 0px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~~fonts~~~~~~~~~~~~~~~~~~~~~~~ */\n/* font-family: 'Edu TAS Beginner'; */\n/* font-family: 'Raleway', sans-serif; */\n/* ~~~~~~~~~~~~~~~~~~~text~~~~~~~~~~~~~~~~~~~~~~~ */\nh1 {\n  display: inline;\n  justify-self: center;\n  align-items: center;\n  font-family: 'Edu TAS Beginner';\n  font-stretch: expanded;\n  flex-shrink: 2;\n  font-size: 3em;\n  margin: -1%;\n}\n\nh2 {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  color: white;\n  font-size: 200%;\n  text-align: center;\n  width: 100%;\n}\n\n.search-header,\n.search-favorite-header {\n  font-size: 220%;\n  font-family: 'Raleway', sans-serif;\n  margin: 0;\n}\n\n.side-bar-Recipe-title {\n  display: flex;\n  justify-self: flex-start;\n  justify-content: center;\n  align-items: center;\n  font-size: 200%;\n  font-family: 'Raleway', sans-serif;\n  margin: 0;\n  padding-top: .5em;\n}\n\n.list-recipes {\n  display: flex;\n  flex-direction: column;\n  font-family: 'Raleway', sans-serif;\n  text-align: center;\n  color: white;\n  font-size: 80%;\n  padding-left: 1em;\n}\n\n.tag-names{\n  display: flex;\n  justify-self: flex-start;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  font-size: 200%;\n  font-family: 'Raleway', sans-serif;\n  margin: 0;\n  padding-top: .5em;\n  padding-bottom: 1em;\n}\n\nli {\n  list-style-type: circle;\n  padding-left:1em;\n  font-size: 14pt;\n}\n\n.p {\n  display: flex;\n  margin: 0%;\n}\n\n.recipes-list {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 40px;\n  cursor: pointer;\n  margin: 2%;\n  padding: 0;\n  font-size: 1.2em;\n  border: 1px groove rgb(93, 93, 93);\n  border-radius: 10px;\n  transition: .5s;\n}\n\n.recipes-list:hover {\n  background-color: grey;\n}\n\n/* ~~~~~~~~~~~~~~~~~~images~~~~~~~~~~~~~~~~~~~~~~ */\n.logo-img {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 90%;\n}\n\n.home-img,\n.fav-img {\n  display: flex;\n  height: 60%;\n  margin-right: 5px;\n  padding: 5px;\n  cursor: pointer;\n  border: 1px solid black;\n  border-radius: 10px;\n  transition: .3s;\n}\n\n.fav-img:hover {\n  background-color: rgb(255, 84, 84);\n}\n\n.home-img:hover {\n  filter: invert(100);\n  background-color: white;\n}\n\n.icon-1-img,\n.icon-2-img,\n.icon-3-img,\n.icon-4-img,\n.icon-5-img,\n.icon-6-img {\n  flex: 1 0 auto;\n  height: auto;\n  width: 100%;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 8px;\n}\n\n.random-feature-img {\n  height: 120%;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 10px;\n  filter: drop-shadow(5px 10px 3px black);\n}\n\n.easter-egg{\n  display: flex;\n  justify-self: flex-start;\n  align-self: flex-end;\n  height:30px;\n  width: 30px;\n  background-image: url(\"../dist/cook-me.svg\");\n}\n/* ~~~~~~~~~~~~~~~home page~~~~~~~~~~~~~~~~~~~ */\n.h1-wrapper {\n  display: flex;\n  justify-content: center;\n  width: 100%;\n}\n\n.main-body {\n  display: flex;\n  flex-direction: column;\n  width: 80%;\n}\n\n.header-icons-container,\n.header-logo-container {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  width: 10%;\n  margin: 0px;\n}\n\n.search-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 20%;\n  width: 100%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  color: white;\n}\n\n.radio-wrapper {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  align-items: center;\n  height: 30%;\n  width: 45%;\n}\n\n.home-recipe-sidebar {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  width: 18%;\n  border-radius: 10px;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  overflow-y: scroll;\n  scrollbar-color: black;\n  scrollbar-width: thin;\n}\n\n.main-page-container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  height: 80%;\n  width: 100%;\n}\n\n.feature-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n  height: 60%;\n  width: 70%;\n  border-radius: 10px;\n  margin-bottom: 50px;\n}\n\n.meal-box {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  height: 175px;\n  width: 400px;\n  margin-left: -25%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  filter: drop-shadow(5px 10px 3px black);\n  border-radius: 8px;\n}\n\n.recipe-icon-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-evenly;\n  align-items: center;\n  flex-wrap: wrap;\n  height: 100%;\n  width: 30%;\n}\n\n.recipe-icons {\n  display: flex;\n  flex-wrap: wrap;\n  height: 125px;\n  width: 125px;\n  filter: drop-shadow(1px 2px 2px grey);\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.recipe-icons:hover {\n  box-shadow: 4px 4px 4px black;\n}\n\n.side-bar-title-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  height: 100px;\n  width: 100%;\n  color: white;\n  text-decoration: 2px underline;\n}\n\n/* ~~~~~~~~~~~~~~~~~~view recipe user story~~~~~~~~~~~~~~~~~~~~~~ */\n.recipe-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-around;\n  height: 95%;\n  width: 100%;\n}\n\n.recipe-img-price-container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  width: 49%;\n  height: 100%;\n}\n\n.recipe-description-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  width: 49%;\n  background-color: black;\n  color: white;\n  margin: 0;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.recipe-title-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-family: 'Edu TAS Beginner';\n  text-align: center;\n  color: white;\n  font-size: 2em;\n  height: 10%;\n  width: 90%;\n  margin-bottom: 0;\n}\n\n.recipe-container-upper-wrapper {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 50%;\n  width: 100%;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.selected-recipe-img {\n  display: flex;\n  border: 1px solid rgb(63, 62, 62);\n  border-radius: 10px;\n  height: 100%;\n}\n\n.recipe-container-lower-wrapper {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-evenly;\n  height: 50%;\n  width: 100%;\n}\n\n.total-price-box {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  font-size: 1.5em;\n  height: 10%;\n  width: 100%;\n  margin: 0;\n}\n\n.ingredient-box {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  align-content: center;\n  height: 98%;\n  width: 100%;\n  color: white;\n  background-color: black;\n  border: 1px solid white;\n  border-radius: 10px;\n}\n\n.ingredient-title-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin: 0%;\n  width: 100%;\n}\n\n.ingredient-title {\n  display: flex;\n  color: white;\n  font-family: 'Edu TAS Beginner';\n  justify-content: center;\n  text-align: center;\n  font-size: 1.5em;\n  kerning: 4cm;\n  margin: 0%;\n  width: 100%;\n}\n\n.recipe-info-box {\n  display: flex;\n  flex-direction: column;\n  height: 80%;\n  width: 90%;\n  margin: 2px;\n  overflow-y: scroll;\n}\n\n.recipe-instructions {\n  font-size: 1.2em;\n  margin: 0;\n  padding: 0;\n}\n\n.recipe-ingredients,\n.ingredient-prices,\n.ingredient-quantities {\n  margin: 0;\n  padding-left: 3%;\n  border: .5px solid white;\n}\n\n.prices,\n.names,\n.quantities {\n  margin: 0;\n  padding: 0;\n}\n\n.ingredient-boxes-container {\n  height: 80%;\n  width: 100%;\n  font-size: 1.2em;\n  display: grid;\n  grid-template-columns: 30% 50% 20%;\n  margin: 0;\n  padding: 0;\n  overflow-y: scroll;\n}\n\n.add-favorite-button {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  margin-right: 2%;\n  font-size: 1.5em;\n  background-color: black;\n}\n\n.favorite-button-container {\n  display: flex;\n  flex-direction: row;\n  height: 70px;\n}\n\n.add-favorites-text {\n  margin-left: 2%;\n}\n\n/* ~~~~~~~~~~~~~~~~~~view favorite recipe user story~~~~~~~~~~~~~~~~~~~~~~ */\n.search-favorite-container{\n  display:flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  height: 20%;\n  width: 100%;\n  background-image: linear-gradient(black, rgb(63, 62, 62), black);\n  color: white;\n}\n\n.remove-filters-button-fav,\n.remove-filters-button,\n.add-ingredient-btn,\n.convert-to-id {\n  background-color: black;\n  color: white;\n  margin-left: 3%;\n}\n\n.convert-to-id,\n.add-ingredient-btn {\n  margin: 5px 0px 10px 0px;\n}\n\n.fav-container-lower-wrapper {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  width: 100%;\n  height: 80%;\n  margin-top: 1%;\n  overflow: scroll;\n}\n\n\n.remove-filters-button:hover {\n  background-color: rgb(42, 40, 40);\n}\n\n.main-favorite-container {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(\"../dist/anyonecancook-logo.svg\");\n  background-repeat: no-repeat;\n  background-position: center;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n}\n\n.favorite-recipe-container,\n.user-info-pantry-container{\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  width: 95%;\n  margin-top: 1%;\n  border: 1px solid black;\n  border-radius: 10px;\n}\n\n.user-info-pantry-container {\n  display: flex;\n  height: 250px;\n}\n\n.favorite-recipe-container {\n  height: 375px;\n}\n\n.favorite-recipe-icons {\n  display: flex;\n  flex-direction: column;\n  justify-self: center;\n  height: 260px;\n  width: 200px;\n  border-radius: 10px;\n  margin-left: 1%;\n  border: 1px solid black;\n}\n\n.favorite-recipe-images {\n  display: flex;\n  justify-self: center;\n  align-self: center;\n  height: 175px;\n  width: 175px;\n  border-radius: 10px;\n  margin: 3%;\n  cursor: pointer;\n  margin-bottom: 1%;\n}\n\n.favorite-recipe-icons{\n  display: flex;\n  flex-direction: column;\n  justify-self: center;\n  height: 275px;\n  width: 200px;\n  border-radius: 10px;\n  margin-left: 1%;\n  border: 1px solid black;\n}\n\n.icon-text {\n  display: flex;\n  align-content: center;\n  justify-content: center;\n  align-self: center;\n  justify-self: center;\n  text-align: center;\n  width: 90%;\n  height: 10%;\n  padding: 1%;\n  margin-bottom: 3%;\n}\n\n.button-container {\n  display: flex;\n  flex-direction: row;\n  justify-content: center;\n}\n\n.remove-from-favorites-btn, .cook-me-btn {\n  text-align: center;\n  width: 35%;\n  margin: 7%;\n  font-size: 10px;\n}\n\n\n.user-pantry-title-wrapper{\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  justify-self: center;\n  width: 100%;\n  height: 20%;\n}\n\n.favorite-recipe-title,\n.user-pantry-title,\n.add-ing-title {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  align-content: center;\n  font-family: 'Edu TAS Beginner';\n  font-size: 25pt;\n  margin: 0%;\n}\n\n.add-ing-title {\n  margin-bottom: 10px;\n}\n\n.pantry-items {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0;\n  padding: 0;\n  font-size: 1em;\n}\n\n .pantry-ingredients{\n  display: flex;\n  flex-direction: column;\n  height: 75%;\n  width: 98%;\n  margin: 1px 10px 5px 10px;\n  flex-wrap: wrap;\n  overflow: scroll;\n}\n\n.go-to-form-button,\n.refresh-pantry {\n  margin: 5px 0px 0px 10px;\n}\n\n/* ~~~~~~~~~~~~~~~~~~~add ingredient form~~~~~~~~~~~ */\n\n.add-pantry-ingredient-form {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  justify-self: center;\n  border-radius: 10px;\n  padding: 2px 20px 20px 20px;\n  margin: 0;\n  height: 250px;\n  width: 200px;\n  border: 1px solid grey;\n  filter: drop-shadow(1px 2px 2px grey)\n}\n\n/* ~~~~~~~~~~~~~~~~~~aux~~~~~~~~~~~~~~~~~~~~~~ */\n.hidden {\n  display: none;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/cook-me.svg");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/anyonecancook-logo.svg");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAllData": () => (/* binding */ getAllData)
/* harmony export */ });
const fetchAllData = (dataType) => {
    return fetch(`http://localhost:3001/api/v1/${dataType}`)
    .then(response => response.json())
    .catch(error => console.log(`API error: ${error.message}`));
  }

const getAllData = () => {
  const result = Promise.all([fetchAllData('recipes'), fetchAllData('ingredients'), fetchAllData('users')])
    .then(responses => {
      return responses;
    })
    return result;
  }

 



/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class RecipeRepository {
  constructor(recipeData) {
    this.recipeData = recipeData
  }

  filterByTag(tag) {
    let filteredRecipes = this.recipeData.filter(recipe => recipe.tags.includes(tag));
    return filteredRecipes;
  }

  filterByName(name) {
    let filteredRecipes = this.recipeData.filter(recipe => recipe.name.includes(name));
    return filteredRecipes;
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RecipeRepository);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ingredient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);


class Recipe {
  constructor(recipeData, ingredientData) {
    this.id = recipeData.id
    this.image = recipeData.image
    this.ingredients = recipeData.ingredients
    this.instructions = recipeData.instructions
    this.name = recipeData.name
    this.tags = recipeData.tags
    this.ingredientData = ingredientData
  }

    getIngredientNames() {
    const matchedIngredientNames = this.ingredients.map(ingredient => {
      const foundIngredient = this.ingredientData.find(
        data => data.id === ingredient.id
      );
      const newObject = Object.assign(foundIngredient, ingredient);
      const newIngredient = new _Ingredient__WEBPACK_IMPORTED_MODULE_0__["default"](newObject);
      return newIngredient.name
    });
    return matchedIngredientNames
   }

   getAmountOfIngredients() {
    const matchedIngredientQuantities = this.ingredients.map(ingredient => {
      const foundIngredient = this.ingredientData.find(
        data => data.id === ingredient.id
      );
      const newObject = Object.assign(foundIngredient, ingredient);
      return `${newObject.quantity.amount} ${newObject.quantity.unit}`
    })
    return matchedIngredientQuantities
  }

  getCostOfIngredients() {
    const matchedIngredientCost = this.ingredients.map(ingredient => {
      const foundIngredient = this.ingredientData.find(
        data => data.id === ingredient.id
      );
      const newObject = Object.assign(foundIngredient, ingredient);
      return newObject.estimatedCostInCents * newObject.quantity.amount
    })
    return matchedIngredientCost
  }

  getCostOfIngredientsInDollars() {
    let ingredientCostInDollars = this.getCostOfIngredients().map(cost => {
      return `$${(cost/100).toFixed(2)}`
    })
    return ingredientCostInDollars
  }

  getCostOfRecipe() {
    const recipeCost = this.getCostOfIngredients().reduce((sum, cost) => {
      return sum += cost
    }, 0);
    return `$${(recipeCost/100).toFixed(2)}`
  }

  returnRecipeInstructions() {
    const instructions = this.instructions.reduce((list, instruction, index) => {
      list[index] = `${instruction.number}: ${instruction.instruction}`
      return list;
    }, []);
    return instructions;
  }

};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recipe);


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ingredient {
  constructor(ingredientData) {
    this.id = ingredientData.id;
    this.name = ingredientData.name;
    this.estimatedCostInCents = ingredientData.estimatedCostInCents;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ingredient);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Recipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _Pantry__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);



class User{
    constructor(userData) {
      this.name = userData.name;
      this.id = userData.id;
      this.pantry = new _Pantry__WEBPACK_IMPORTED_MODULE_1__["default"](userData.pantry)
      this.recipesToCook = [];  
    }


   addRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
     this.recipesToCook.push(recipe)
    }
   }

   removeRecipesToCook(recipeId) {
    this.recipesToCook.forEach((recipe, index) => {
      if (recipe.id === recipeId) {
        this.recipesToCook.splice(index, 1)
      } 
    })
   }

    filterSavedRecipesByTag(tag) {
      let filteredRecipes = this.recipesToCook.filter(recipe => recipe.tags.includes(tag));
      return filteredRecipes;
    }

    filterSavedRecipesByName(name) {
      let filteredRecipes = this.recipesToCook.filter(recipe => recipe.name.includes(name));
      return filteredRecipes;
    }
};


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (User);

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Pantry {
  constructor(pantry) {
    this.ingredientsInPantry = JSON.parse(JSON.stringify(pantry));
  };

  getIngredientDetails(ingredientData) {
    const pantryIngredients = this.ingredientsInPantry.map(ingredient => {
      const foundIngredient = ingredientData.find(data => {
        return data.id === ingredient.ingredient;
      });
      return {
            'id': ingredient.ingredient,
            'name': foundIngredient.name,
            'amount': ingredient.amount,
            }
    });
      return pantryIngredients;
  };

  findRequiredIngredients(recipe) {
    let requiredIngredients = recipe.ingredients.map(ingredient => {
        let ingredientsData = {};
        ingredientsData.id = ingredient.id;
        ingredientsData.amount = ingredient.quantity.amount;
        return ingredientsData;
    });
    return requiredIngredients;
  };

  checkIfUserCanCookRecipe(recipe) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let availableIngredients = [];
    requiredIngredients.forEach(ingredient => {
      this.ingredientsInPantry.forEach(ing => {
        if ((ing.ingredient === ingredient.id) && (ing.amount >= ingredient.amount)) {
          availableIngredients.push(ing.ingredient);
        }
      })
    });
    return requiredIngredients.every(ingredient => availableIngredients.includes(ingredient.id));
  };

  getMissingIngredients(recipe, ingredientData) {
    let requiredIngredients = this.findRequiredIngredients(recipe);
    let missingIngredients = [];
    requiredIngredients.forEach(item => {
      let pantryIngredient = this.ingredientsInPantry.find(ing => item.id === ing.ingredient);
      if (!pantryIngredient) {
        let diffItem = {
          id: item.id,
          name: ingredientData.find(ingData => ingData.id === item.id).name,
          amount: item.amount
        }
        missingIngredients.push(diffItem);
      } else if (pantryIngredient.amount < item.amount) {
        let diffItem = {
          id: item.id,
          name: ingredientData.find(ingData => ingData.id === item.id).name,
          amount: item.amount - pantryIngredient.amount
        }
        missingIngredients.push(diffItem);
      }
    })
    return missingIngredients;
  };

  cookRecipe(recipe) {
      let requiredIngredients = this.findRequiredIngredients(recipe)
      requiredIngredients.forEach(ingredient => {
        this.ingredientsInPantry.forEach(ing => {
          if (ing.ingredient === ingredient.id) {
            ing.amount -= ingredient.amount
          }
        })
      })
  }

  addIngredient(id, amount) {
    this.ingredientsInPantry.forEach(ing => {
      if (id === ing.ingredient) {
        ing.amount += amount
      }
    })
    if (this.ingredientsInPantry.every(ing => ing.ingredient !== id)) {
      this.ingredientsInPantry.push({ingredient: id, amount: amount})
    }
  }

};




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pantry);



/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _classes_Recipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(11);
/* harmony import */ var _classes_User__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(13);






// ***** Query Selectors ***** //

const homePage = document.querySelector('.main-page-container');
const recipePage = document.querySelector('.recipe-container');
const favoritesPage = document.querySelector('.main-favorite-container');
const searchContainer = document.querySelector('.search-container');
const searchFavoritesContainer = document.querySelector('.search-favorite-container');
const recipeSidebarList = document.querySelector('.list-recipes');
const recipeIconContainer = document.querySelector('.recipe-icon-container');
const icon1Img = document.querySelector('.icon-1-img');
const icon2Img = document.querySelector('.icon-2-img');
const icon3Img = document.querySelector('.icon-3-img');
const icon4Img = document.querySelector('.icon-4-img');
const icon5Img = document.querySelector('.icon-5-img');
const icon6Img = document.querySelector('.icon-6-img');
const featureImage = document.querySelector('.random-feature-img');
const selectedRecipeImg = document.querySelector('.selected-recipe-img');
const recipeNameBox = document.querySelector('.recipe-title-box');
const totalPriceBox = document.querySelector('.total-price-box');
const recipeDetailsBox = document.querySelector('.recipe-info-box');
const searchValue = document.querySelector('.search-input');
const favoriteSearchValue = document.querySelector('.search-favorite-input');
const quantities = document.querySelector('.quantities');
const names = document.querySelector('.names');
const prices = document.querySelector('.prices');
const favoriteRecipeImages = document.querySelector('.fav-container-lower-wrapper');
const nameRadioBtnFavorite = document.querySelector('.name-search-favorite');
const tagRadioBtnFavorite = document.querySelector('.tag-search-favorite');
const removeFavFiltersBtn = document.querySelector('.remove-filters-button-fav');
const homeButton = document.querySelector('.home-img');
const favoritePageBtn = document.querySelector('.fav-img');
const searchButton = document.querySelector('.search-button');
const favoriteSearchBtn = document.querySelector('.favorite-search-button');
const addFavoriteBtn = document.querySelector('.add-favorite-button');
const addToFavoritesText = document.querySelector('.add-favorites-text')
const userWelcomeMessage = document.querySelector('.user-welcome-message');
const nameRadioBtn = document.querySelector('.name-search');
const removeFiltersBtn = document.querySelector('.remove-filters-button');
const tagRadioBtn = document.querySelector('.tag-search');
const sideBarTitle = document.querySelector('.side-bar-title-wrapper');
const userPantryContainer = document.querySelector('.pantry-ingredients');
const convertToId = document.querySelector('.convert-to-id');
const getIngId2 = document.querySelector('.get-ing-id2');
const ingredientForm = document.querySelector('.add-pantry-ingredient-form');
const addIngBtn = document.querySelector('.add-ingredient-btn');
const goToFormButton = document.querySelector('.go-to-form-button');
const userPantryIngredients = document.querySelector('.user-info-pantry-container');
const ingIdInput = document.querySelector('.ingredient-id-input');
const ingQInput = document.querySelector('.ingredient-quantity')
const pantryTitle = document.querySelector('.user-pantry-title');
const errorMsg = document.querySelector('.post-error-message');
const refreshPantry = document.querySelector('.refresh-pantry');

// ***** Event Listeners ***** //
window.addEventListener('load', _apiCalls__WEBPACK_IMPORTED_MODULE_1__.getAllData);
recipeSidebarList.addEventListener('click', viewRecipe);
recipeSidebarList.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    viewRecipe(event);
  }
});
recipeIconContainer.addEventListener('click', viewRecipeFromIcon);
favoriteRecipeImages.addEventListener('click', viewRecipeFromIcon);
favoriteRecipeImages.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    viewRecipeFromIcon(event);
  }
});
homeButton.addEventListener('click', showHomePage);
homeButton.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    showHomePage();
  }
});
searchButton.addEventListener('click', filterRecipe);
favoriteSearchBtn.addEventListener('click', filterFavoriteRecipes);
favoritePageBtn.addEventListener('click', showFavoritesPage);
favoritePageBtn.addEventListener('keypress', function(event) {
  if (event.keyCode === 13) {
    showFavoritesPage();
  }
});
addFavoriteBtn.addEventListener('click', addToFavorites);
removeFavFiltersBtn.addEventListener('click', showFavoritesPage);
removeFiltersBtn.addEventListener('click', displayAllNames);
convertToId.addEventListener('click', getIngredientId);
goToFormButton.addEventListener('click', goToFormView);
addIngBtn.addEventListener('click', makeNewIngredientToPost);
refreshPantry.addEventListener('click', refreshPantryList);

// ***** Global Variables ***** //
let ingredientData;
let userData;
let user;
let recipeData;
let selectedRecipeName;
let selectedRecipeIcon;
let selectedRecipe;
let recipeRepository;
let allRecipes;
let newIngredientToPost;

// ***** Functions ***** //

(0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getAllData)().then(responses => {
  recipeData = responses[0];
  ingredientData = responses[1];
  userData = responses[2];
  user = new _classes_User__WEBPACK_IMPORTED_MODULE_4__["default"](userData[getRandomIndex(userData)]);
  allRecipes = recipeData.map(recipe => new _classes_Recipe__WEBPACK_IMPORTED_MODULE_3__["default"](recipe, ingredientData));
  recipeRepository =  new _classes_RecipeRepository__WEBPACK_IMPORTED_MODULE_2__["default"](allRecipes);
  updateMainPageRecipeIcons();
  displayAllNames();
});

//~~~~~~~~~Post Request~~~~~~~~~~~~~~

const addNewIngredient = (newIngredient) => {
  fetch('http://localhost:3001/api/v1/users', {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newIngredient)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json();
    }   
  })
  .then(ingredient => {
    user.pantry.addIngredient(newIngredient['ingredientID'], newIngredient['ingredientModification']);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.getAllData)();
    showFavoritesPage();
  })
  .catch(err => {
    errorMsg.innerText = err.message;
  });
 }

function makeNewIngredientToPost(event) {
  event.preventDefault();
  newIngredientToPost = { userID: user.id,
                          ingredientID: parseFloat(ingIdInput.value),
                          ingredientModification: parseFloat(ingQInput.value) }
  addNewIngredient(newIngredientToPost);
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function updateUserWelcome(user) {
  userWelcomeMessage.innerText = `Welcome \n ${user.name}, \n ready to cook?`;
}

function changeToUpperCase(data) {
  data.forEach(recipe => {
    let wordsInName = recipe.name.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    recipe.name = capitalizedWords.join(' ');
  });
}

function updateMainPageRecipeIcons() {
  let numbers = [];
  let randomNumber;
  allRecipes.forEach(recipe => {
    randomNumber = getRandomIndex(allRecipes);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  });
  icon1Img.src = allRecipes[numbers[0]].image;
  icon2Img.src = allRecipes[numbers[1]].image;
  icon3Img.src = allRecipes[numbers[2]].image;
  icon4Img.src = allRecipes[numbers[3]].image;
  icon5Img.src = allRecipes[numbers[4]].image;
  icon6Img.src = allRecipes[numbers[5]].image;
  featureImage.src = allRecipes[numbers[6]].image;
  updateUserWelcome(user);
}

function displayRecipeNames(recipes) {
  recipeSidebarList.innerHTML = '';
  const recipeNames = recipes.map(recipe => recipe.name);
  recipeNames.forEach(name => {
    recipeSidebarList.innerHTML += `<p class="recipes-list" tabindex=0 role='button'>${name}</p>`;
  });
}

function displayAllNames() {
  recipeRepository.recipeData.forEach(recipe => {
    let wordsInName = recipe.name.split(' ');
    let capitalizedWords = wordsInName.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    recipe.name = capitalizedWords.join(' ');
  })
  displayRecipeNames(recipeRepository.recipeData);
  show(sideBarTitle);
}

function showHomePage() {
  hide(recipePage);
  hide(favoritesPage);
  hide(searchFavoritesContainer);
  show(homePage);
  show(searchContainer);
}

function showFavoritesPage() {
  hide(homePage);
  hide(searchContainer);
  hide(recipePage);
  hide(ingredientForm);
  show(userPantryIngredients);
  show(favoritesPage);
  show(searchFavoritesContainer);
  showFavoriteRecipeImages(user.recipesToCook);
  show(userPantryContainer);
  displayPantryIngredients();
  pantryTitle.innerText = 'User\'s Pantry Ingredients';
}

function viewRecipe(event) {
  displayRecipeByClickTag(event);
  if (event.target.classList.contains('recipes-list')) {
    selectedRecipeName = event.target.innerText;
    selectedRecipe = allRecipes.filter(recipe => selectedRecipeName === recipe.name)[0];
    viewRecipesHelperFunction();
  }
}

function viewRecipeFromIcon(event) {
  if (event.target.classList.contains('icon')) {
    selectedRecipeIcon = event.target.src;
    selectedRecipe = allRecipes.filter(recipe => selectedRecipeIcon === recipe.image)[0];
    viewRecipesHelperFunction();
  }
  if(event.target.classList.contains('remove-from-favorites-btn')) {
    removeFromFavorites(event);
  }
  if(event.target.classList.contains('cook-me-btn')) {
    cookRecipe(event);
  }
}

function viewRecipesHelperFunction() {
  hide(homePage);
  hide(searchContainer);
  hide(favoritesPage);
  hide(searchFavoritesContainer);
  show(recipePage);
  displaySelectedRecipeName();
  displayRecipeInstructions();
  displayIngredientNames();
  displayIngredientCosts();
  displayIngredientQuantities();
  displayTotalCostOfAllIngredients();
  displaySelectedRecipeImg();
  toggleFavoritesButton();
}

function displaySelectedRecipeName() {
  recipeNameBox.innerText = selectedRecipe.name;
}

function displaySelectedRecipeImg() {
  selectedRecipeImg.src = selectedRecipe.image;
}

function displayRecipeInstructions() {
  recipeDetailsBox.innerHTML = '';
  selectedRecipe.returnRecipeInstructions().forEach(instruction => {
  recipeDetailsBox.innerHTML += `<p class='recipe-instructions'>Step ${instruction} </p></br>`;
  });
}

function displayIngredientNames() {
  names.innerHTML = '';
  selectedRecipe.getIngredientNames().forEach(ingredient => {
  names.innerHTML += `<p class='recipe-ingredients'> ${ingredient} </p>`;
  });
}

function displayIngredientCosts() {
  prices.innerHTML = '';
  selectedRecipe.getCostOfIngredientsInDollars().forEach(cost => {
  prices.innerHTML += `<p class='ingredient-prices'> ${cost} </p>`;
  });
}

function displayIngredientQuantities() {
  quantities.innerHTML = '';
  selectedRecipe.getAmountOfIngredients().forEach(amount => {
  quantities.innerHTML += `<p class='ingredient-quantities'> ${amount} </p>`;
  });
}

function displayTotalCostOfAllIngredients() {
  totalPriceBox.innerText = selectedRecipe.getCostOfRecipe();
}

function filterRecipe(event) {
  event.preventDefault();
  if (tagRadioBtn.checked) {
    filterRecipeByTag(searchValue.value);
  } else if (nameRadioBtn.checked) {
    filterRecipeByName(searchValue.value);
  }
}

function filterRecipeByTag(tag) {
  let input = tag.toLowerCase();
  let filteredRecipes = recipeRepository.filterByTag(input);
  displayRecipeNames(filteredRecipes);
  show(sideBarTitle);
  if (filteredRecipes.length === 0) {
    hide(sideBarTitle);
    recipeSidebarList.innerHTML = 
    `<p class="tag-names">No recipes found, try one of these tags: </p> 
     <ul> 
        <br> <li class="tag"> Antipasti </li>
        <br> <li class="tag"> Starter </li>
        <br> <li class="tag"> Snack </li>
        <br> <li class="tag"> Appetizer </li>
        <br> <li class="tag"> Antipasto </li>
        <br> <li class="tag"> Hor d'oeuvre </li>
        <br> <li class="tag"> Lunch </li>
        <br> <li class="tag"> Main course </li>
        <br> <li class="tag"> Main dish </li>
        <br> <li class="tag"> Dinner </li>
        <br> <li class="tag"> Side dish </li>
        <br> <li class="tag"> Salad </li>
        <br> <li class="tag"> Condiment </li>
        <br> <li class="tag"> Dip </li>
        <br> <li class="tag"> Spread </li>
        <br> <li class="tag"> Sauce </li>
      </ul>`;
  }
}

function displayRecipeByClickTag(event) {
  if(event.target.classList.contains('tag')){
    filterRecipeByTag(event.target.innerText);
  }
}

function filterRecipeByName(name) {
  let input = name.toLowerCase();
  recipeRepository.recipeData.forEach(recipe => {
    recipe.name = recipe.name.toLowerCase();
  });
  let filteredRecipes = recipeRepository.filterByName(input);
  changeToUpperCase(filteredRecipes);
  displayRecipeNames(filteredRecipes);
  if (filteredRecipes.length === 0) {
    recipeSidebarList.innerHTML = `<p>No recipes found, try a different name/keyword.</p>`;
  }
}

function addToFavorites() {
  user.addRecipesToCook(selectedRecipe);
  toggleFavoritesButton();
}

function toggleFavoritesButton() {
  if (user.recipesToCook.includes(selectedRecipe)) {
    hide(addFavoriteBtn);
    addToFavoritesText.innerText = 'Favorite';
  } else {
    show(addFavoriteBtn);
    addToFavoritesText.innerText = 'Add to Favorites';
  }
}

function filterFavoriteRecipes(event) {
  event.preventDefault();
  if (tagRadioBtnFavorite.checked) {
    filterFavoriteRecipesByTag(favoriteSearchValue.value);
  } else if (nameRadioBtnFavorite.checked) {
    filterFavoriteRecipesByName(favoriteSearchValue.value);
  }
}

function filterFavoriteRecipesByTag(tag) {
  let input = tag.toLowerCase();
  let filteredRecipes = user.filterSavedRecipesByTag(input);
  showFavoriteRecipeImages(filteredRecipes);
  if (filteredRecipes.length === 0) {
    favoriteRecipeImages.innerHTML = `<p>No recipes found, try a different tag.</p>`;
  }
}

function filterFavoriteRecipesByName(name) {
  let input = name.toLowerCase();
  user.recipesToCook.forEach(recipe => {
    recipe.name = recipe.name.toLowerCase();
  });
  let filteredRecipes = user.filterSavedRecipesByName(input);
  changeToUpperCase(filteredRecipes);
  showFavoriteRecipeImages(filteredRecipes);
  if (filteredRecipes.length === 0) {
    favoriteRecipeImages.innerHTML = `<p>No recipes found, try a different name/keyword.</p>`;
  }
}

function showFavoriteRecipeImages(recipes) {
  changeToUpperCase(user.recipesToCook);
  favoriteRecipeImages.innerHTML = '';
  recipes.forEach(recipe => {
  favoriteRecipeImages.innerHTML +=
  `
  <section class="favorite-recipe-icons">
    <p class="icon-text">${recipe.name}</p>
    <img class="favorite-recipe-images icon" src=${recipe.image} id=${recipe.id} tabindex="0">
    <section class= "button-container"> 
    <button class="cook-me-btn" id = ${recipe.id}>cook me!</button> 
    <button class="remove-from-favorites-btn" id=${recipe.id}>delete</button>
    </section>
  </section>`;
  });
}

function removeFromFavorites(event) {
  let recipe = event.target;
  if(recipe.classList.contains("remove-from-favorites-btn")) {
    user.removeRecipesToCook(parseInt(recipe.id));
  }
  showFavoriteRecipeImages(user.recipesToCook);
}

function displayPantryIngredients() {
  userPantryContainer.innerHTML = '';
  let pantryIngredients = user.pantry.getIngredientDetails(ingredientData);
  pantryIngredients.forEach(pantryIngredient => {
    userPantryContainer.innerHTML += `<p class='pantry-items'> ${pantryIngredient.amount} -- ${pantryIngredient.name}</p>`;
  });
}

function convertIngNameToId(name) {
  ingredientData.forEach(ing => {
    if (ing.name === name) {
      ingIdInput.value = ing.id;
    }
  })
  if (ingredientData.every(ing => ing.name !== name)) {
    getIngId2.value = 'Ingredient not found';
  }
}

function getIngredientId(event) {
  event.preventDefault(event);
  convertIngNameToId(getIngId2.value);
}

function goToFormView() {
  hide(userPantryIngredients);
  show(ingredientForm);
}
  
function cookRecipe(event) {
  let selectedRecipe;
  allRecipes.forEach(recipe => {
    if((parseInt(event.target.id)) === recipe.id) {
      selectedRecipe = recipe;
    }
  })
    if (!user.pantry.checkIfUserCanCookRecipe(selectedRecipe)) {
      displayMissingIngredients(selectedRecipe);
   } else {
      user.pantry.cookRecipe(selectedRecipe);
      pantryTitle.innerText = 'Pantry amounts updated';
      displayPantryIngredients();
   }
}

function displayMissingIngredients(selectedRecipe) {
  pantryTitle.innerText = 'Oops, these ingredients are still needed:';
  userPantryContainer.innerHTML = '';
  let missingIngredients = user.pantry.getMissingIngredients(selectedRecipe, ingredientData);
  missingIngredients.forEach(pantryIngredient => {
    userPantryContainer.innerHTML += `<p class='pantry-items'>${pantryIngredient.amount} -- ${pantryIngredient.name}</p>`;
  })
}

function refreshPantryList() {
  showFavoritesPage();
}

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map