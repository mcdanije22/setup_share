module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ "11/B":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LoginPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getServerSideProps", function() { return getServerSideProps; });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("F5FC");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("Exp3");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("zr5I");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("4Q3z");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_constants_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("BWgs");
/* harmony import */ var _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("iClM");
/* harmony import */ var _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_context_userContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("p9lH");









const {
  Title,
  Text
} = antd__WEBPACK_IMPORTED_MODULE_2__["Typography"];
function LoginPage() {
  const {
    setUser
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useContext"])(_utils_context_userContext__WEBPACK_IMPORTED_MODULE_7__[/* UserContext */ "a"]);
  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__["useRouter"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_1__["useState"])(false);

  const userLogin = async values => {
    const {
      email,
      password
    } = values;
    setLoading(true);

    try {
      const getUser = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`${_utils_constants_common__WEBPACK_IMPORTED_MODULE_5__[/* BaseAPI */ "a"]}/user/login`, {
        email,
        password
      }, {
        withCredentials: true
      });
      const response = getUser;
      setUser(getUser.data.user);
      antd__WEBPACK_IMPORTED_MODULE_2__["message"].success("Logged in successfully");
      setTimeout(async () => {
        await router.push("/dashboard");
        setLoading(false);
      }, 1000);
    } catch (error) {
      const errorMessage = error.response.data.message;
      antd__WEBPACK_IMPORTED_MODULE_2__["message"].error(errorMessage);
      setLoading(false);
    }
  };

  return /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])("div", {
    id: _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.loginPageContainer,
    children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Row"], {
      justify: "center",
      align: "middle",
      style: {
        minHeight: "100vh"
      },
      children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(antd__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        xs: {
          span: 20
        },
        md: {
          span: 18
        },
        lg: {
          span: 12
        },
        xl: {
          span: 8
        },
        id: _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.formWindow,
        children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])("div", {
          style: {
            textAlign: "center"
          },
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Title, {
            level: 2,
            children: "ShareStation"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Title, {
            level: 3,
            children: "Sign In"
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(Text, {
            children: "To Continue"
          })]
        }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsxs"])(antd__WEBPACK_IMPORTED_MODULE_2__["Form"], {
          labelCol: {
            span: 24
          },
          name: "login",
          onFinish: userLogin // onFinishFailed={onFinishFailed}
          ,
          children: [/*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
            label: "Email",
            name: "email",
            rules: [{
              required: true,
              message: "Please input your email address"
            }],
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Input"], {
              type: "email"
            })
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
            label: "Password",
            name: "password",
            rules: [{
              required: true,
              message: "Please input your password"
            }],
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Input"].Password, {})
          }), /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Form"].Item, {
            children: /*#__PURE__*/Object(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__["jsx"])(antd__WEBPACK_IMPORTED_MODULE_2__["Button"], {
              type: "primary",
              size: "large",
              shape: "round",
              htmlType: "submit",
              style: {
                width: "100%",
                marginTop: ".5rem"
              },
              loading: loading,
              children: "Submit"
            })
          })]
        })]
      })
    })
  });
}
const getServerSideProps = async context => {
  try {
    const cookie = context.req.headers.cookie;
    const response = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`${_utils_constants_common__WEBPACK_IMPORTED_MODULE_5__[/* BaseAPI */ "a"]}/user/pageauth`, {
      cookie
    });
    const data = await response.data; //If logged in already with cookie, redirect to dashboard page

    return {
      redirect: {
        permanent: false,
        destination: "/dashboard"
      }
    };
  } catch (error) {
    return {
      props: {}
    };
  }
};

/***/ }),

/***/ "4Q3z":
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("11/B");


/***/ }),

/***/ "BWgs":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseAPI; });
const BaseAPI = "http://localhost:5000"; // export const BaseAPI = process.env.BASE_API;

/***/ }),

/***/ "Exp3":
/***/ (function(module, exports) {

module.exports = require("antd");

/***/ }),

/***/ "F5FC":
/***/ (function(module, exports) {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "cDcd":
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "iClM":
/***/ (function(module, exports) {

// Exports
module.exports = {
	"loginPageContainer": "login_loginPageContainer__1S_K1",
	"formWindow": "login_formWindow__341N9"
};


/***/ }),

/***/ "p9lH":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserContext; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cDcd");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const UserContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["createContext"])(null);

/***/ }),

/***/ "zr5I":
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ })

/******/ });