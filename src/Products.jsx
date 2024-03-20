import { useEffect, useState } from "react";

function Products() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');

    const productsPerPage = 12;

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await fetch("https://dummyjson.com/products/?limit=100");
            const data = await result.json();
            setProducts(data.products);
        } catch (error) {
            console.log("failed to fetch products", error);
        }
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );


    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handelSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    return (
        <div>
            <div className="container">
                <div className="search">
                    <input type="text" onChange={handelSearch} value={search} placeholder="Search Products" />
                </div>
                {currentProducts.map((product) => (
                    <div className="card" key={product.id}>
                        <img src={product.thumbnail} alt={product.description} />
                        <p>{product.title}</p>
                        <button>Buy Now</button>
                    </div>
                ))}
            </div>
            {products.length > 0 && (
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map((pageNumber) => (
                        <span key={pageNumber + 1} onClick={() => handlePageChange(pageNumber + 1)} className={currentPage === pageNumber + 1 ? 'selectedPage' : ''}>{pageNumber + 1}</span>
                    ))}
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={indexOfLastProduct >= products.length}>Next</button>
                </div>
            )}
        </div>
    );
}

export default Products;
