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
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/login.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pageStyles/login.module.scss":
/*!**************************************!*\
  !*** ./pageStyles/login.module.scss ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Exports\nmodule.exports = {\n\t\"loginPageContainer\": \"login_loginPageContainer__1S_K1\",\n\t\"formWindow\": \"login_formWindow__341N9\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlU3R5bGVzL2xvZ2luLm1vZHVsZS5zY3NzPzNmMDYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3BhZ2VTdHlsZXMvbG9naW4ubW9kdWxlLnNjc3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFeHBvcnRzXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0XCJsb2dpblBhZ2VDb250YWluZXJcIjogXCJsb2dpbl9sb2dpblBhZ2VDb250YWluZXJfXzFTX0sxXCIsXG5cdFwiZm9ybVdpbmRvd1wiOiBcImxvZ2luX2Zvcm1XaW5kb3dfXzM0MU45XCJcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./pageStyles/login.module.scss\n");

/***/ }),

/***/ "./pages/login.tsx":
/*!*************************!*\
  !*** ./pages/login.tsx ***!
  \*************************/
/*! exports provided: default, getServerSideProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return LoginPage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerSideProps\", function() { return getServerSideProps; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ \"antd\");\n/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _utils_constants_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/constants/common */ \"./utils/constants/common.tsx\");\n/* harmony import */ var _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../pageStyles/login.module.scss */ \"./pageStyles/login.module.scss\");\n/* harmony import */ var _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _utils_context_userContext__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/context/userContext */ \"./utils/context/userContext.tsx\");\n\nvar _jsxFileName = \"/Users/joshmcdaniel/Documents/work/repos/setup_share/client/pages/login.tsx\";\n\n\n\n\n\n\n\nconst {\n  Title,\n  Text\n} = antd__WEBPACK_IMPORTED_MODULE_2__[\"Typography\"];\nfunction LoginPage() {\n  const {\n    setUser\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_utils_context_userContext__WEBPACK_IMPORTED_MODULE_7__[\"UserContext\"]);\n  const router = Object(next_router__WEBPACK_IMPORTED_MODULE_4__[\"useRouter\"])();\n  const {\n    0: loading,\n    1: setLoading\n  } = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(false);\n\n  const userLogin = async values => {\n    const {\n      email,\n      password\n    } = values;\n    setLoading(true);\n\n    try {\n      const getUser = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`${_utils_constants_common__WEBPACK_IMPORTED_MODULE_5__[\"BaseAPI\"]}/user/login`, {\n        email,\n        password\n      }, {\n        withCredentials: true\n      });\n      const response = getUser;\n      setUser(getUser.data.user);\n      antd__WEBPACK_IMPORTED_MODULE_2__[\"message\"].success(\"Logged in successfully\");\n      setTimeout(async () => {\n        await router.push(\"/dashboard\");\n        setLoading(false);\n      }, 1000);\n    } catch (error) {\n      const errorMessage = error.response.data.message;\n      antd__WEBPACK_IMPORTED_MODULE_2__[\"message\"].error(errorMessage);\n      setLoading(false);\n    }\n  };\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    id: _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.loginPageContainer,\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Row\"], {\n      justify: \"center\",\n      align: \"middle\",\n      style: {\n        minHeight: \"100vh\"\n      },\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Col\"], {\n        xs: {\n          span: 20\n        },\n        md: {\n          span: 18\n        },\n        lg: {\n          span: 12\n        },\n        xl: {\n          span: 8\n        },\n        id: _pageStyles_login_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a.formWindow,\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n          style: {\n            textAlign: \"center\"\n          },\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Title, {\n            level: 2,\n            children: \"ShareStation\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 61,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Title, {\n            level: 3,\n            children: \"Sign In\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 62,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Text, {\n            children: \"To Continue\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 63,\n            columnNumber: 13\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 60,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Form\"], {\n          labelCol: {\n            span: 24\n          },\n          name: \"login\",\n          onFinish: userLogin // onFinishFailed={onFinishFailed}\n          ,\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Item, {\n            label: \"Email\",\n            name: \"email\",\n            rules: [{\n              required: true,\n              message: \"Please input your email address\"\n            }],\n            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Input\"], {\n              type: \"email\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 81,\n              columnNumber: 15\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 71,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Item, {\n            label: \"Password\",\n            name: \"password\",\n            rules: [{\n              required: true,\n              message: \"Please input your password\"\n            }],\n            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Input\"].Password, {}, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 90,\n              columnNumber: 15\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 83,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Form\"].Item, {\n            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(antd__WEBPACK_IMPORTED_MODULE_2__[\"Button\"], {\n              type: \"primary\",\n              size: \"large\",\n              shape: \"round\",\n              htmlType: \"submit\",\n              style: {\n                width: \"100%\",\n                marginTop: \".5rem\"\n              },\n              loading: loading,\n              children: \"Submit\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 93,\n              columnNumber: 15\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 92,\n            columnNumber: 13\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 65,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 53,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 52,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 51,\n    columnNumber: 5\n  }, this);\n}\nconst getServerSideProps = async context => {\n  try {\n    const cookie = context.req.headers.cookie;\n    const response = await axios__WEBPACK_IMPORTED_MODULE_3___default.a.post(`${_utils_constants_common__WEBPACK_IMPORTED_MODULE_5__[\"BaseAPI\"]}/user/pageauth`, {\n      cookie\n    });\n    const data = await response.data; //If logged in already with cookie, redirect to dashboard page\n\n    return {\n      redirect: {\n        permanent: false,\n        destination: \"/dashboard\"\n      }\n    };\n  } catch (error) {\n    return {\n      props: {}\n    };\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9sb2dpbi50c3g/ZDc1ZiJdLCJuYW1lcyI6WyJUaXRsZSIsIlRleHQiLCJUeXBvZ3JhcGh5IiwiTG9naW5QYWdlIiwic2V0VXNlciIsInVzZUNvbnRleHQiLCJVc2VyQ29udGV4dCIsInJvdXRlciIsInVzZVJvdXRlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidXNlU3RhdGUiLCJ1c2VyTG9naW4iLCJ2YWx1ZXMiLCJlbWFpbCIsInBhc3N3b3JkIiwiZ2V0VXNlciIsImF4aW9zIiwicG9zdCIsIkJhc2VBUEkiLCJ3aXRoQ3JlZGVudGlhbHMiLCJyZXNwb25zZSIsImRhdGEiLCJ1c2VyIiwibWVzc2FnZSIsInN1Y2Nlc3MiLCJzZXRUaW1lb3V0IiwicHVzaCIsImVycm9yIiwiZXJyb3JNZXNzYWdlIiwic3R5bGVzIiwibG9naW5QYWdlQ29udGFpbmVyIiwibWluSGVpZ2h0Iiwic3BhbiIsImZvcm1XaW5kb3ciLCJ0ZXh0QWxpZ24iLCJyZXF1aXJlZCIsIndpZHRoIiwibWFyZ2luVG9wIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsImNvb2tpZSIsInJlcSIsImhlYWRlcnMiLCJyZWRpcmVjdCIsInBlcm1hbmVudCIsImRlc3RpbmF0aW9uIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLE1BQU07QUFBRUEsT0FBRjtBQUFTQztBQUFULElBQWtCQywrQ0FBeEI7QUFPZSxTQUFTQyxTQUFULEdBQXFCO0FBQ2xDLFFBQU07QUFBRUM7QUFBRixNQUFjQyx3REFBVSxDQUFNQyxzRUFBTixDQUE5QjtBQUNBLFFBQU1DLE1BQU0sR0FBR0MsNkRBQVMsRUFBeEI7QUFDQSxRQUFNO0FBQUEsT0FBQ0MsT0FBRDtBQUFBLE9BQVVDO0FBQVYsTUFBd0JDLHNEQUFRLENBQUMsS0FBRCxDQUF0Qzs7QUFFQSxRQUFNQyxTQUFTLEdB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ZCxXQUFPO0FBQ0xtQixXQUFLLEVBQUU7QUFERixLQUFQO0FBR0Q7QUFDRixDQWpCTSIsImZpbGUiOiIuL3BhZ2VzL2xvZ2luLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZVN0YXRlLCB1c2VDb250ZXh0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBSb3csIENvbCwgRm9ybSwgSW5wdXQsIEJ1dHRvbiwgbWVzc2FnZSwgVHlwb2dyYXBoeSB9IGZyb20gXCJhbnRkXCI7XG5pbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyBHZXRTZXJ2ZXJTaWRlUHJvcHMgfSBmcm9tIFwibmV4dFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvcm91dGVyXCI7XG5pbXBvcnQgeyBCYXNlQVBJIH0gZnJvbSBcIi4uL3V0aWxzL2NvbnN0YW50cy9jb21tb25cIjtcbmltcG9ydCBzdHlsZXMgZnJvbSBcIi4uL3BhZ2VTdHlsZXMvbG9naW4ubW9kdWxlLnNjc3NcIjtcbmltcG9ydCB7IFVzZXJDb250ZXh0IH0gZnJvbSBcIi4uL3V0aWxzL2NvbnRleHQvdXNlckNvbnRleHRcIjtcblxuY29uc3QgeyBUaXRsZSwgVGV4dCB9ID0gVHlwb2dyYXBoeTtcblxuaW50ZXJmYWNlIFVzZXIge1xuICBlbWFpbDogc3RyaW5nO1xuICBwYXNzd29yZDogc3RyaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBMb2dpblBhZ2UoKSB7XG4gIGNvbnN0IHsgc2V0VXNlciB9ID0gdXNlQ29udGV4dDxhbnk+KFVzZXJDb250ZXh0KTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCB1c2VyTG9naW4gPSBhc3luYyAodmFsdWVzOiBVc2VyKSA9PiB7XG4gICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHZhbHVlcztcbiAgICBzZXRMb2FkaW5nKHRydWUpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBnZXRVc2VyID0gYXdhaXQgYXhpb3MucG9zdChcbiAgICAgICAgYCR7QmFzZUFQSX0vdXNlci9sb2dpbmAsXG4gICAgICAgIHtcbiAgICAgICAgICBlbWFpbCxcbiAgICAgICAgICBwYXNzd29yZCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gZ2V0VXNlcjtcbiAgICAgIHNldFVzZXIoZ2V0VXNlci5kYXRhLnVzZXIpO1xuICAgICAgbWVzc2FnZS5zdWNjZXNzKFwiTG9nZ2VkIGluIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICAgIHNldFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCByb3V0ZXIucHVzaChcIi9kYXNoYm9hcmRcIik7XG4gICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlO1xuICAgICAgbWVzc2FnZS5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBpZD17c3R5bGVzLmxvZ2luUGFnZUNvbnRhaW5lcn0+XG4gICAgICA8Um93IGp1c3RpZnk9XCJjZW50ZXJcIiBhbGlnbj1cIm1pZGRsZVwiIHN0eWxlPXt7IG1pbkhlaWdodDogXCIxMDB2aFwiIH19PlxuICAgICAgICA8Q29sXG4gICAgICAgICAgeHM9e3sgc3BhbjogMjAgfX1cbiAgICAgICAgICBtZD17eyBzcGFuOiAxOCB9fVxuICAgICAgICAgIGxnPXt7IHNwYW46IDEyIH19XG4gICAgICAgICAgeGw9e3sgc3BhbjogOCB9fVxuICAgICAgICAgIGlkPXtzdHlsZXMuZm9ybVdpbmRvd31cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgc3R5bGU9e3sgdGV4dEFsaWduOiBcImNlbnRlclwiIH19PlxuICAgICAgICAgICAgPFRpdGxlIGxldmVsPXsyfT5TaGFyZVN0YXRpb248L1RpdGxlPlxuICAgICAgICAgICAgPFRpdGxlIGxldmVsPXszfT5TaWduIEluPC9UaXRsZT5cbiAgICAgICAgICAgIDxUZXh0PlRvIENvbnRpbnVlPC9UZXh0PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxGb3JtXG4gICAgICAgICAgICBsYWJlbENvbD17eyBzcGFuOiAyNCB9fVxuICAgICAgICAgICAgbmFtZT1cImxvZ2luXCJcbiAgICAgICAgICAgIG9uRmluaXNoPXt1c2VyTG9naW59XG4gICAgICAgICAgICAvLyBvbkZpbmlzaEZhaWxlZD17b25GaW5pc2hGYWlsZWR9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZvcm0uSXRlbVxuICAgICAgICAgICAgICBsYWJlbD1cIkVtYWlsXCJcbiAgICAgICAgICAgICAgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgcnVsZXM9e1tcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIGlucHV0IHlvdXIgZW1haWwgYWRkcmVzc1wiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF19XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwiZW1haWxcIiAvPlxuICAgICAgICAgICAgPC9Gb3JtLkl0ZW0+XG4gICAgICAgICAgICA8Rm9ybS5JdGVtXG4gICAgICAgICAgICAgIGxhYmVsPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgICBuYW1lPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgICBydWxlcz17W1xuICAgICAgICAgICAgICAgIHsgcmVxdWlyZWQ6IHRydWUsIG1lc3NhZ2U6IFwiUGxlYXNlIGlucHV0IHlvdXIgcGFzc3dvcmRcIiB9LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SW5wdXQuUGFzc3dvcmQgLz5cbiAgICAgICAgICAgIDwvRm9ybS5JdGVtPlxuICAgICAgICAgICAgPEZvcm0uSXRlbT5cbiAgICAgICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJwcmltYXJ5XCJcbiAgICAgICAgICAgICAgICBzaXplPVwibGFyZ2VcIlxuICAgICAgICAgICAgICAgIHNoYXBlPVwicm91bmRcIlxuICAgICAgICAgICAgICAgIGh0bWxUeXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogXCIxMDAlXCIsIG1hcmdpblRvcDogXCIuNXJlbVwiIH19XG4gICAgICAgICAgICAgICAgbG9hZGluZz17bG9hZGluZ31cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFN1Ym1pdFxuICAgICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDwvRm9ybS5JdGVtPlxuICAgICAgICAgIDwvRm9ybT5cbiAgICAgICAgPC9Db2w+XG4gICAgICA8L1Jvdz5cbiAgICA8L2Rpdj5cbiAgKTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldFNlcnZlclNpZGVQcm9wczogR2V0U2VydmVyU2lkZVByb3BzID0gYXN5bmMgKGNvbnRleHQ6IGFueSkgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGNvb2tpZSA9IGNvbnRleHQucmVxLmhlYWRlcnMuY29va2llO1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MucG9zdChgJHtCYXNlQVBJfS91c2VyL3BhZ2VhdXRoYCwgeyBjb29raWUgfSk7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmRhdGE7XG4gICAgLy9JZiBsb2dnZWQgaW4gYWxyZWFkeSB3aXRoIGNvb2tpZSwgcmVkaXJlY3QgdG8gZGFzaGJvYXJkIHBhZ2VcbiAgICByZXR1cm4ge1xuICAgICAgcmVkaXJlY3Q6IHtcbiAgICAgICAgcGVybWFuZW50OiBmYWxzZSxcbiAgICAgICAgZGVzdGluYXRpb246IFwiL2Rhc2hib2FyZFwiLFxuICAgICAgfSxcbiAgICB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBwcm9wczoge30sXG4gICAgfTtcbiAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/login.tsx\n");

/***/ }),

/***/ "./utils/constants/common.tsx":
/*!************************************!*\
  !*** ./utils/constants/common.tsx ***!
  \************************************/
/*! exports provided: BaseAPI */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BaseAPI\", function() { return BaseAPI; });\nconst BaseAPI = \"http://localhost:5000\"; // export const BaseAPI = process.env.BASE_API;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9jb25zdGFudHMvY29tbW9uLnRzeD8wNTY4Il0sIm5hbWVzIjpbIkJhc2VBUEkiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBTyxNQUFNQSxPQUFPLEdBQUcsdUJBQWhCLEMsQ0FDUCIsImZpbGUiOiIuL3V0aWxzL2NvbnN0YW50cy9jb21tb24udHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IEJhc2VBUEkgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6NTAwMFwiO1xuLy8gZXhwb3J0IGNvbnN0IEJhc2VBUEkgPSBwcm9jZXNzLmVudi5CQVNFX0FQSTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/constants/common.tsx\n");

/***/ }),

/***/ "./utils/context/userContext.tsx":
/*!***************************************!*\
  !*** ./utils/context/userContext.tsx ***!
  \***************************************/
/*! exports provided: UserContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"UserContext\", function() { return UserContext; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"])(null);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi91dGlscy9jb250ZXh0L3VzZXJDb250ZXh0LnRzeD9hN2Q5Il0sIm5hbWVzIjpbIlVzZXJDb250ZXh0IiwiY3JlYXRlQ29udGV4dCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVPLE1BQU1BLFdBQVcsZ0JBQUdDLDJEQUFhLENBQU0sSUFBTixDQUFqQyIsImZpbGUiOiIuL3V0aWxzL2NvbnRleHQvdXNlckNvbnRleHQudHN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3JlYXRlQ29udGV4dCwgRGlzcGF0Y2gsIFNldFN0YXRlQWN0aW9uIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBjb25zdCBVc2VyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQ8YW55PihudWxsKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./utils/context/userContext.tsx\n");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"antd\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbnRkXCI/MDhhYSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiJhbnRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW50ZFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///antd\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"axios\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJheGlvc1wiPzcwYzYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiYXhpb3MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///axios\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next/router\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiP2Q4M2UiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoibmV4dC9yb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L3JvdXRlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next/router\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });