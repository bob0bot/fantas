// COMPONENTS
// ----------
// Main
//   UI
//     ButtonCategory
//     Result
//       ResultItem

const ResultItem = ({ category, tagline, level, daretext,imgUrl }) =>
  <div className="col-md-6">
    <div className={"category--"+category+" card flex-md-row mb-4 box-shadow h-md-250"}>
    
       <div className="card-body d-flex flex-column align-items-start">
       <strong className="d-inline-block mb-2 text-cat">{category}</strong>
       <h3 className="mb-0">
                <a className="card-text"> {tagline}
          </a>
        </h3>
        <br/>
        <p className="card-text mb-auto">{daretext}.</p>
        <div className="mb-1 text-muted wap"><a href={"https://api.whatsapp.com/send?&text="+daretext+". *Your turn* Find your pick, here: https://fantas1.herokuapp.com"}><img src='./static/img/24w.png'/></a> </div>
      </div>
      <img className="card-img-right flex-auto d-none d-md-block" src={imgUrl} alt="Card image "/>
    </div>
  </div>;

const Result = ({ state: { products, displayCategory } }) =>
  <div className="row mb-2">
    {products
      .filter(({ category }) =>
          displayCategory === category || displayCategory === "all"
      )
      .map(({ category, tagline, level, daretext, imgUrl }) =>
        <ResultItem category={category} tagline={tagline} level={level} daretext={daretext} imgUrl={imgUrl}/>
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

    console.log("scope updateds!");
    return <UI setCategory={this.setCategory} state={this.state} />;
  }
}

// data

// const PRODUCTS2 = [
//   { category: "Romantic", name: "rommma" },
//   { category: "Adventure", name: "funn" },
//   { category: "Fantasy", name: "fantaa" },
//   { category: "DressUp", name: "yayy" },
//   { category: "Public", name: "centr" },
//   { category: "Submission", name: "Own" },
//   { category: "Party", name: "ibiza" },
//   { category: "Cute", name: "cuddle" }
// ];

challengeDatafromServer =JSON.parse(cdta);
const PRODUCTS = challengeDatafromServer;


// get unique category items
const uniqueItems = (x, i, a) => a.indexOf(x) === i;
const PRODUCT_CATEGORIES = PRODUCTS.map(prod => prod.category).filter(
  uniqueItems
);

PRODUCT_CATEGORIES.push("all");
PRODUCT_CATEGORIES.sort();

ReactDOM.render(<Main products={PRODUCTS} />, document.getElementById("root"));
