

/**
 * External Dependencies.
 */
import axios from 'axios';
import { isArray, isEmpty } from 'lodash';

export default function Home({ products }) {
    if (isEmpty(products) || !isArray(products)) {
        return null;
    }

    return (<div>

        {products.length ? products.map(product => {
            return (<div key={product?.id} >
                <p>{product?.name}</p>
            </div>
            )
        })
            : <div>No products</div>
        }

    </div>


    )
}

export async function getStaticProps() {


    const { data: productsData } = await axios.get('http://localhost:3000/api/get-products');

    return {
        props: {
            products: productsData?.products ?? {}
        },

        /**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
        revalidate: 1,
    };
}