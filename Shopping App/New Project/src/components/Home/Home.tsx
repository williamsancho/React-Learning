import ProductList from "../ProductList/ProductList";
import SearchComponent from "../SearchComponent/SearchComponent";

export default function Home() {


    return (
        <>
            <div className="component-grid">
                <SearchComponent />
                <ProductList />
            </div>
        </>

    )
}

