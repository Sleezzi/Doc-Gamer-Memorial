import { useEffect, useState } from "react";
import styles from "../cdn/css/blackmarket.module.css";

function BlackMarket() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch("/black-market.json").then(response => response.json()).then(fetchedProducts => {
            fetchedProducts.forEach((product, index) => {
                fetch("/user.json"/*`https://users.roproxy.com/v1/users/${product.seller}`*/).then(response => response.json()).then(response => {
                    fetchedProducts[index].seller = {
                        id: product.seller,
                        username: response.displayName,
                        avatar: undefined
                    }
                });
                fetch("/avatar.json"/*`https://users.roproxy.com/v1/users/${product.seller}`*/).then(response => response.json()).then(response => {
                    fetchedProducts[index].seller.avatar = response.data[0].imageUrl;
                });
            });
            setProducts(fetchedProducts);
        });
    }, []);
    return (<div className={styles.products}>
        {products.length > 0 ?
            products.map((product, index) => (
                <div key={product.id} className={styles.product}>
                    <p className={styles.price}>{product.price} $</p>
                    <img src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630" alt={product.name} />
                    <h3>{product.name && product.name.length > 27 ? `${product.name.slice(0, 24)}...` : product.name}</h3>
                    <div>
                        <div className={`${styles.raretyContainer} ${styles[product.rarety.toLowerCase()]}`}>
                            <div className={styles.rarety}></div>
                            <code>{product.rarety}</code>
                        </div>
                        <div className={styles.profile}>
                            <img src={product.seller.avatar} alt={product.seller.username} className={styles.avatar} />
                            <div>
                                <h5>{product.seller.username && product.seller.username.length > 12 ? `${product.seller.username.slice(0, 9)}...` : product.seller.username}</h5>
                                <p>Level: 110</p>
                            </div>
                        </div>
                        <button type="submit">
                            <img src="/cdn/img/icon/shop.png" alt="Buy" />
                        </button>
                    </div>
                </div>
            )) : <div>
                <h1>Loading...</h1>
            </div>
        }
    </div>)
}

export default BlackMarket;