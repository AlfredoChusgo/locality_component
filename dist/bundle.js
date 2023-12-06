(()=>{"use strict";var e={n:t=>{var n=t&&t.__esModule?()=>t.default:()=>t;return e.d(n,{a:n}),n},d:(t,n)=>{for(var a in n)e.o(n,a)&&!e.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:n[a]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};const t=require("react");var n=e.n(t);const a=require("@mui/material"),o=require("@reduxjs/toolkit");var i=function(e,t,n,a){return new(n||(n=Promise))((function(o,i){function r(e){try{l(a.next(e))}catch(e){i(e)}}function c(e){try{l(a.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}l((a=a.apply(e,t||[])).next())}))},r=function(e,t){var n,a,o,i,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(l){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(r=0)),r;)try{if(n=1,a&&(o=2&c[0]?a.return:c[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,c[1])).done)return o;switch(a=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return r.label++,{value:c[1],done:!1};case 5:r.label++,a=c[1],c=[0];continue;case 7:c=r.ops.pop(),r.trys.pop();continue;default:if(!(o=r.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){r=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){r.label=c[1];break}if(6===c[0]&&r.label<o[1]){r.label=o[1],o=c;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(c);break}o[2]&&r.ops.pop(),r.trys.pop();continue}c=t.call(e,r)}catch(e){c=[6,e],a=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}},c=(function(){function e(e){this.remoteRepository=e,this.list=[]}e.prototype.getById=function(e){return i(this,void 0,void 0,(function(){var t,n;return r(this,(function(a){switch(a.label){case 0:return 0!=this.list.length?[3,2]:(t=this,[4,this.remoteRepository.getAll()]);case 1:t.list=a.sent(),a.label=2;case 2:if(n=this.list.find((function(t){return t.id===e})))return[2,Promise.resolve(n)];throw new Error("Localidad con id:".concat(e," no fue encontrada"))}}))}))},e.prototype.getAll=function(){return i(this,void 0,void 0,(function(){var e;return r(this,(function(t){switch(t.label){case 0:return 0!=this.list.length?[3,2]:(e=this,[4,this.remoteRepository.getAll()]);case 1:e.list=t.sent(),t.label=2;case 2:return[2,this.list]}}))}))}}(),function(){function e(){}e.prototype.getDistance=function(e,t){return i(this,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return[4,new Promise((function(e){return setTimeout(e,500)}))];case 1:return e.sent(),[2,{value:100*Math.random()+1,unit:"km"}]}}))}))}}(),function(){function e(e){this.apiKey=e}return e.prototype.getDistance=function(e,t){return i(this,void 0,void 0,(function(){var n,a,o,i,c,l,s,u,d;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,3,,4]),n=e.lat,a=e.long,o=t.lat,i=t.long,"https://cors-anywhere.herokuapp.com/",c="https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=".concat(n,",").concat(a,"&destinations=").concat(o,",").concat(i,"&key=").concat(this.apiKey),[4,fetch("https://cors-anywhere.herokuapp.com/"+c)];case 1:return[4,r.sent().json()];case 2:if("OK"===(l=r.sent()).status)return s=l.rows[0].elements[0].distance.text,u=l.rows[0].elements[0].duration.text,console.log("Distance: ".concat(s)),console.log("Duration: ".concat(u)),[2,{value:100*Math.random()+1,unit:"km"}];throw console.error("Error: ".concat(l.status)),Error(l.status);case 3:throw d=r.sent(),console.error("Error fetching data:",d),Error("error");case 4:return[2]}}))}))},e}()),l=function(){function e(e){this.list=[],this.list=e}return e.prototype.getById=function(e){return i(this,void 0,void 0,(function(){var t;return r(this,(function(n){if(t=this.list.find((function(t){return t.id===e})))return[2,Promise.resolve(t)];throw new Error("Localidad con id:".concat(e," no fue encontrada"))}))}))},e.prototype.getAll=function(){return i(this,void 0,void 0,(function(){return r(this,(function(e){switch(e.label){case 0:return[4,new Promise((function(e){return setTimeout(e,500)}))];case 1:return e.sent(),[2,this.list]}}))}))},e}(),s=function(){return s=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},s.apply(this,arguments)},u={apiKey:"default_api_key",localidadList:[]};var d={localidadRepository:new l(u.localidadList),distanceCalculatorService:new c(u.apiKey)};const f=d;var p,h={id:1,displayName:"Gobernacion de Scz",geoPoint:{lat:-17.78206732611228,long:-63.187405038749645}},g=function(e,t,n,a){return new(n||(n=Promise))((function(o,i){function r(e){try{l(a.next(e))}catch(e){i(e)}}function c(e){try{l(a.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,c)}l((a=a.apply(e,t||[])).next())}))},m=function(e,t){var n,a,o,i,r={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(c){return function(l){return function(c){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,c[0]&&(r=0)),r;)try{if(n=1,a&&(o=2&c[0]?a.return:c[0]?a.throw||((o=a.return)&&o.call(a),0):a.next)&&!(o=o.call(a,c[1])).done)return o;switch(a=0,o&&(c=[2&c[0],o.value]),c[0]){case 0:case 1:o=c;break;case 4:return r.label++,{value:c[1],done:!1};case 5:r.label++,a=c[1],c=[0];continue;case 7:c=r.ops.pop(),r.trys.pop();continue;default:if(!(o=r.trys,(o=o.length>0&&o[o.length-1])||6!==c[0]&&2!==c[0])){r=0;continue}if(3===c[0]&&(!o||c[1]>o[0]&&c[1]<o[3])){r.label=c[1];break}if(6===c[0]&&r.label<o[1]){r.label=o[1],o=c;break}if(o&&r.label<o[2]){r.label=o[2],r.ops.push(c);break}o[2]&&r.ops.pop(),r.trys.pop();continue}c=t.call(e,r)}catch(e){c=[6,e],a=0}finally{n=o=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,l])}}},y=function(e,t,n){if(n||2===arguments.length)for(var a,o=0,i=t.length;o<i;o++)!a&&o in t||(a||(a=Array.prototype.slice.call(t,0,o)),a[o]=t[o]);return e.concat(a||Array.prototype.slice.call(t))},v={localidadAutoCompleteList:[],selectedLocalidadList:[],totalDistance:{unit:"km",value:0},startingPoint:h,loading:!1,error:""},L=(0,o.createAsyncThunk)("locationPicker/fetchLocalities",(function(){return g(void 0,void 0,void 0,(function(){return m(this,(function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,f.localidadRepository.getAll()];case 1:return[2,e.sent()];case 2:throw e.sent();case 3:return[2]}}))}))})),b=(0,o.createAsyncThunk)("locationPicker/addLocationToSelectedLocalidad",(function(e,t){var n=e.targetLocalidadId;return g(void 0,void 0,void 0,(function(){var e,a,o,i,r;return m(this,(function(c){switch(c.label){case 0:return c.trys.push([0,3,,4]),e=t.getState().locationPicker,[4,f.localidadRepository.getById(n)];case 1:if(a=c.sent(),o=h,!e.startingPoint)return t.dispatch(P(a)),[2,e.selectedLocalidadList];if(0===e.selectedLocalidadList.length&&e.startingPoint&&(o=e.startingPoint),e.selectedLocalidadList.length>0&&(o=e.selectedLocalidadList[e.selectedLocalidadList.length-1].targetLocalidad),o.id===a.id)throw Error("La localidad de destino no puede tener el mismo valor que la localidad de origen");return[4,f.distanceCalculatorService.getDistance(o.geoPoint,a.geoPoint)];case 2:return i=c.sent(),r={distance:i,sourceLocalidad:o,targetLocalidad:a},[2,y(y([],e.selectedLocalidadList,!0),[r],!1)];case 3:throw c.sent();case 4:return[2]}}))}))})),w=(0,o.createSlice)({name:"locationPicker",initialState:v,reducers:{setStartingPoint:function(e,t){e.startingPoint=t.payload},resetState:function(e){e.selectedLocalidadList=[],e.startingPoint=h,e.loading=!1,e.error=""},removeStartingPoint:function(e){0==e.selectedLocalidadList.length&&(e.startingPoint=void 0)},removeLastLocalidadSelected:function(e){var t=e.selectedLocalidadList.filter((function(e,t,n){return t<n.length-1}));e.selectedLocalidadList=t;var n=t.reduce((function(e,t){return e+t.distance.value}),0);e.totalDistance={unit:"km",value:n}}},extraReducers:function(e){e.addCase(L.pending,(function(e){e.loading=!0})).addCase(L.fulfilled,(function(e,t){e.loading=!1,e.localidadAutoCompleteList=t.payload})).addCase(L.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||"something happened"})),e.addCase(b.pending,(function(e){e.loading=!0})).addCase(b.fulfilled,(function(e,t){e.loading=!1,e.selectedLocalidadList=t.payload;var n=t.payload.reduce((function(e,t){return e+t.distance.value}),0);e.totalDistance={unit:"km",value:n}})).addCase(b.rejected,(function(e,t){e.loading=!1,e.error=t.error.message||"something happened"}))}}),P=(p=w.actions).setStartingPoint,E=p.resetState,k=p.removeLastLocalidadSelected,S=p.removeStartingPoint;const x=w.reducer,C=require("react-redux");var A=(0,o.configureStore)({reducer:{locationPicker:x}}),I=C.useDispatch;const N=A,D=require("@mui/icons-material/Delete");var T=e.n(D);const O=require("@mui/material/Unstable_Grid2");var j=e.n(O);const R=require("@mui/icons-material/Restore");var q=e.n(R),B=function(){return B=Object.assign||function(e){for(var t,n=1,a=arguments.length;n<a;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},B.apply(this,arguments)};function K(){var e=I,o=(0,C.useSelector)((function(e){return e.locationPicker})),i=o.localidadAutoCompleteList,r=o.loading,c=(o.error,o.selectedLocalidadList),l=o.startingPoint,s=o.totalDistance;(0,t.useEffect)((function(){N.dispatch(L())}),[e]);var u=c.map((function(e,t){var o="".concat(e.sourceLocalidad.displayName," - ").concat(e.targetLocalidad.displayName),i="".concat(Number(e.distance.value.toFixed(2))," ").concat(e.distance.unit),r="".concat(e.sourceLocalidad.id,"-").concat(e.targetLocalidad.id),l=t==c.length-1?n().createElement(a.IconButton,{edge:"end","aria-label":"delete",onClick:function(){N.dispatch(k())}},n().createElement(T(),null)):null;return n().createElement(a.ListItem,{key:r,secondaryAction:l},n().createElement(a.ListItemText,{primary:o,secondary:i}))})),d=n().createElement(a.Stack,{spacing:1},n().createElement(a.Skeleton,{variant:"rounded",height:60}),n().createElement(a.Skeleton,{variant:"rounded",height:60}),n().createElement(a.Skeleton,{variant:"rounded",height:60}),n().createElement(a.Skeleton,{variant:"rounded",height:30})),f=n().createElement("div",null,n().createElement(j(),{container:!0,spacing:2},n().createElement(j(),{xs:12},n().createElement("h1",null,"LocationComponent")),n().createElement(j(),{xs:11},n().createElement(a.Autocomplete,{disablePortal:!0,id:"localidad-combo",options:i,loading:r,getOptionLabel:function(e){return e.displayName},renderInput:function(e){return n().createElement(a.TextField,B({},e,{label:"Localidades"}))},onChange:function(e,t){t&&N.dispatch(b({targetLocalidadId:t.id}))}})),n().createElement(j(),{xs:1},n().createElement(a.Tooltip,{title:"Reiniciar"},n().createElement(a.IconButton,{edge:"end","aria-label":"Reiniciar",onClick:function(){N.dispatch(E())}},n().createElement(q(),null)))),n().createElement(j(),{xs:12,spacing:1},n().createElement(a.List,null,!r&&null!=p()&&p(),!r&&u,r&&d)),n().createElement(j(),{xs:8},n().createElement(a.Typography,{variant:"subtitle1",component:"span"},"Distancia total : ".concat(Math.round(100*s.value)/100," ").concat(s.unit," ")))));return n().createElement("div",null,f);function p(){var e=0==c.length?n().createElement(a.IconButton,{edge:"end","aria-label":"delete",onClick:function(){N.dispatch(S())}},n().createElement(T(),null)):null,t=n().createElement(a.ListItem,{key:null==l?void 0:l.id,secondaryAction:e,style:{backgroundColor:"#40F99B"}},n().createElement(a.ListItemText,{primary:null==l?void 0:l.displayName,secondary:"Punto de partida"}));return l?t:null}}const _=function(){return n().createElement("div",{className:"App"},n().createElement(j(),{container:!0,spacing:2},n().createElement(j(),{xs:4},n().createElement(K,null))))};var M;M={apiKey:"AIzaSyC-iXTDITl6AvQJUU3_O4q8PkJ8yD9Zy_8",localidadList:[{id:2,displayName:"Montero",geoPoint:{lat:-17.3399,long:-63.2548}},{id:3,displayName:"Warnes",geoPoint:{lat:-17.4921,long:-63.1528}},{id:4,displayName:"Cotoca",geoPoint:{lat:-17.7682,long:-63.1843}},{id:5,displayName:"Portachuelo",geoPoint:{lat:-17.3543,long:-63.4057}},{id:6,displayName:"San Ignacio de Velasco",geoPoint:{lat:-16.3708,long:-60.9605}},{id:7,displayName:"Samaipata",geoPoint:{lat:-18.18,long:-63.8663}},{id:8,displayName:"Colpa Bélgica",geoPoint:{lat:-16.4704,long:-62.0509}},{id:9,displayName:"Buena Vista",geoPoint:{lat:-17.4528,long:-63.6424}},{id:10,displayName:"San José de Chiquitos",geoPoint:{lat:-17.7765,long:-60.7566}}]},u=s(s({},u),M),d.localidadRepository=new l(u.localidadList),d.distanceCalculatorService=new c(u.apiKey);_()})();