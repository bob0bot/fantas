// COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     Result
//       ResultItem

const ResultItem = ({ category, name }) =>

  <div className="col-md-6">
    <div className={"category--"+category+" card flex-md-row mb-4 box-shadow h-md-250"}>
    
       <div className="card-body d-flex flex-column align-items-start">
       <strong className="d-inline-block mb-2 text-cat">{category}</strong>
       <h3 className="mb-0">
                <a className="text-dark" href="#"> {name}
          </a>
        </h3>
        <div className="mb-1 text-muted">Level </div>
        <p className="card-text mb-auto">Some description here, the actual challenge.</p>
      </div>
      <img className="card-img-right flex-auto d-none d-md-block" src="http://via.placeholder.com/200x250" alt="Card image cap"/>
    </div>
  </div>;

const Result = ({ state: { products, displayCategory } }) =>
  <div className="row mb-2">
    {products
      .filter(({ category }) =>
          displayCategory === category || displayCategory === "all"
      )
      .map(({ category, name }) =>
        <ResultItem category={category} name={name} />
      )}
  </div>;

const ButtonCategory = ({ setCategory, category }) =>
  
  <button
    className={`btn-${category}`}
    onClick={() => setCategory(category)}
  >
    {category}
  </button>;

const UI = ({
  state,
  state: { productCategories },
  setCategory,
  allProducts
}) =>


//Main render happens here
  <div>
    <div className="aretags">
    <i class="fa fa-filter fa-lg"></i>
      {productCategories.map(category =>
        <ButtonCategory setCategory={setCategory} category={category} />
      )}
    </div>

      <Result state={state} />
    
  </div>;

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
    return <UI setCategory={this.setCategory} state={this.state} />;
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

ReactDOM.render(<Main products={PRODUCTS} />, document.getElementById("root"));
