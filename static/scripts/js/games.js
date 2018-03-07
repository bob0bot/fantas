(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
// COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     Result
//       ResultItem

const ResultItem = ({ category, name }) =>

  React.createElement("div", {className: "col-md-6"}, 
    React.createElement("div", {className: "category--"+category+" card flex-md-row mb-4 box-shadow h-md-250"}, 
    
       React.createElement("div", {className: "card-body d-flex flex-column align-items-start"}, 
       React.createElement("strong", {className: "d-inline-block mb-2 text-cat"}, category), 
       React.createElement("h3", {className: "mb-0"}, 
                React.createElement("a", {className: "text-dark", href: "#"}, " ", name
          )
        ), 
        React.createElement("div", {className: "mb-1 text-muted"}, "Level "), 
        React.createElement("p", {className: "card-text mb-auto"}, "Some description here, the actual challenge.")
      ), 
      React.createElement("img", {className: "card-img-right flex-auto d-none d-md-block", src: "http://via.placeholder.com/200x250", alt: "Card image cap"})
    )
  );

const Result = ({ state: { products, displayCategory } }) =>
  React.createElement("div", {className: "row mb-2"}, 
    products
      .filter(({ category }) =>
          displayCategory === category || displayCategory === "all"
      )
      .map(({ category, name }) =>
        React.createElement(ResultItem, {category: category, name: name})
      )
  );

const ButtonCategory = ({ setCategory, category }) =>
  
  React.createElement("button", {
    className: `btn-${category}`, 
    onClick: () => setCategory(category)
  }, 
    category
  );

const UI = ({
  state,
  state: { productCategories },
  setCategory,
  allProducts
}) =>


//Main render happens here
  React.createElement("div", null, 
    React.createElement("div", {className: "aretags"}, 
    React.createElement("i", {class: "fa fa-filter fa-lg"}), 
      productCategories.map(category =>
        React.createElement(ButtonCategory, {setCategory: setCategory, category: category})
      )
    ), 

      React.createElement(Result, {state: state})
    
  );

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCategory: "all",
      products: PRODUCTS,
      productCategories: PRODUCT_CATEGORIES
    };
    this.setCategory = this.setCategory.bind(this);
  }
  setCategory(category) {
    this.setState({
      displayCategory: category
    });
  }
  render() {
    return React.createElement(UI, {setCategory: this.setCategory, state: this.state});
  }
}

// data
const PRODUCTS = [
  { category: "Romantic", name: "rommma" },
  { category: "Adventure", name: "funn" },
  { category: "Fantasy", name: "fantaa" },
  { category: "DressUp", name: "yayy" },
  { category: "Public", name: "centr" },
  { category: "Submission", name: "Own" },
  { category: "Party", name: "ibiza" },
  { category: "Cute", name: "cuddle" }
];

// get unique category items
const uniqueItems = (x, i, a) => a.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(
  uniqueItems
);

PRODUCT_CATEGORIES.push("all");
PRODUCT_CATEGORIES.sort();

ReactDOM.render(React.createElement(Main, {products: PRODUCTS}), document.getElementById("root"));

},{}]},{},[1]);
