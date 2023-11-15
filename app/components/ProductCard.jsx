import { Link } from '@remix-run/react'
import { Money } from '@shopify/hydrogen'
import Image from './Image'
export default function ProductCard({ product }) {
    const { price, compareAtPrice } = product.variants?.nodes[0] || {};
    const isDiscounted = price?.amount < compareAtPrice?.amount;
    return (
        <Link to={`/products/${product.handle}`}>
            <div className="grid gap-4">
                {/* Image Container */}
                <div className='relative '>
                    {isDiscounted && (
                        <label className='absolute top-0 right-0 shadow-sm rounded
                                              p-2
                                              subpixel-antialiased 
                                              text-red-600 
                            '>
                            Sale
                        </label>
                    )}
                    {/* <Image
                        data={product.variants?.nodes[0].image}
                        alt={product.title}
                        width={product.variants?.nodes[0].image.width}
                        height={product.variants?.nodes[0].image.height}
                    /> */}
                    {
                        <Image src={product.variants?.nodes[0].image.url}
                            alt={`Image of ${product.title}`}
                            width={product.variants?.nodes[0].image.width}
                            height={product.variants?.nodes[0].image.height}
                        />
                    }
                </div>
                {/* Price Tag */}
                <div className='grid gap-1'>
                    <h3 className='m-w-prose w-full overflow-hidden whitespace-nowrap text-ellipsis'>
                        {product.title}
                    </h3>
                    <div className="flex gap-4">
                        <span className='flex gap-4 whitespace-pre-wrap'>
                            <Money withoutTrailingZeros data={price} />
                            {isDiscounted && (
                                <Money
                                    className='line-through opacity-50'
                                    withoutTrailingZeros data={compareAtPrice}
                                />
                            )}
                        </span>
                    </div>

                </div>
            </div>

        </Link>
    );
}