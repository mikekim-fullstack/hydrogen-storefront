import ProductCard from "./ProductCard";

export default function ProductGrid({ collection, url }) {
    return (
        <section className="grid gap-4 w-full md:gap-6">
            <div className="grid grid-flow-row gap-2 gap-y-6
                            md:gap-4 md:grid-cols-3
                            lg:gap-6 lg:grid-cols-4
            ">
                {
                    collection.products.nodes.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </section>)
}