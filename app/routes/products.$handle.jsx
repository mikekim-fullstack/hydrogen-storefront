import { json } from '@shopify/remix-oxygen'
import { Money, ShopPayButton } from '@shopify/hydrogen-react'
import { useLoaderData } from '@remix-run/react';
// import { Image } from '@shopify/hydrogen-react'
import Image from '~/components/Image';
import ProductOptions from './productOptions';

const seo = ({ data }) => ({
    title: data?.product?.title ?? 'Product',
    descprition: data.product?.description.substr(0, 154),
});
export const handle = { seo, };

export async function loader({ params, request, context }) {
    const { handle } = params;
    const searchParams = new URL(request.url).searchParams;
    const selectedOptions = [];

    // Set selectedOptions from searchParams
    searchParams.forEach((value, name) => {
        selectedOptions.push({ name, value });
    })
    console.log('searchParams', searchParams, 'selectedOptions', selectedOptions);
    const { product } = await context.storefront.query(PRODUCT_QUERY, {
        variables: {
            handle,
            selectedOptions,
        },
    });
    if (!product?.id) {
        throw new Error(null, { status: 404 });
    }
    // console.log(product);
    const selectedVariant = product?.variants?.nodes[0];
    return json({ product, selectedVariant });
}
export default function ProductsHandle() {
    const { product, selectedVariant } = useLoaderData();
    // console.log('data-product', product, selectedVariant);
    return (
        <section className='w-full border grid gap-4 px-6 md:gap-8 md:px-8 lg:px-12'>
            {/* --------- Grid Container -------- */}
            <div className='grid items-start gap-6 md:grid-cols-2  lg:gap-20'>
                {/* --- Image section--- */}
                <div className=''>
                    {/* <h2>TODO Product Image</h2> */}
                    {/* <Image
                        className={`w-full h-full aspect-square object-cover`}
                        data={product?.selectedVariant?.image || product.featuredImage}
                    /> */}
                    <Image
                        src={product?.selectedOptionResult?.image?.url || product.featuredImage.url}
                        alt={`Image of ${product.title}`}

                        width={product?.selectedOptionResult?.image?.width || product.featuredImage.width}
                        hight={product?.selectedOptionResult?.image?.hight || product.featuredImage.hight}
                    />
                </div>
                {/* --- Text section --- */}
                <div className='grid max-w-xl gap-2 p-0 md:sticky'>
                    {/* Title */}
                    <div className='grid gap-2'>
                        <h1 className='text-4xl font-bold leading-10 whitespace-normal'>
                            {product.title}
                        </h1>
                        <span className='max-w-prose font-medium opacity-50 whitespace-pre-wrap'>
                            {product.vendor}
                        </span>
                    </div>
                    {/* <h3>TODO Product Option</h3> */}
                    <ProductOptions options={product.options} selectedVariant={selectedVariant} selectedOptionResult={product?.selectedOptionResult} />
                    {/* Money from shopify */}
                    <div className='flex gap-x-5 items-start'>
                        {
                            (product?.selectedOptionResult?.compareAtPrice || selectedVariant?.compareAtPrice) && (
                                <Money
                                    data={selectedVariant.compareAtPrice || selectedVariant?.compareAtPrice}
                                    className='text-xl text-neutral-500 line-through font-semibold mb-2 '
                                />
                            )
                        }
                        <Money
                            data={product?.selectedOptionResult?.price || selectedVariant.price}
                            className='text-xl font-semibold mb-2'
                        />

                    </div>
                    {/* PayButton  from shopify */}
                    {/* Description Html */}
                    <div className='border-t border-gray-200 pt-6 text-black text-md'
                        dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}></div>
                </div>
            </div>

        </section>);
}

const PRODUCT_QUERY = `
    query Product($handle: String!, $selectedOptions:[SelectedOptionInput!]!){
        product(handle: $handle){
            id 
            title 
            handle 
            vendor
            description 
            descriptionHtml 
            featuredImage{
                id 
                url 
                altText 
                width 
                height
            }
            #Array type
            options{
                name
                values
            }
            #When option is selected, next query response with this.
            selectedOptionResult: variantBySelectedOptions(selectedOptions: $selectedOptions){
                id 
                availableForSale 
                sku
                title 

                #Array type
                selectedOptions{
                    name 
                    value
                }
                image{
                    id 
                    url 
                    altText
                    width
                    height
                }
                price{
                    amount
                    currencyCode
                }
                compareAtPrice{
                    amount 
                    currencyCode
                }
                unitPrice{
                    amount
                    currencyCode
                }
                product{
                    title 
                    handle
                }
                
            }
            #Array type
                variants(first: 1){
                    #Array type
                    nodes{
                        id 
                        title 
                        availableForSale 
                        price{
                            amount 
                            currencyCode 
                        }
                        compareAtPrice{
                            amount
                            currencyCode
                        }
                        #Array type
                        selectedOptions{
                            name
                            value
                        }
                    }
                }
        }
    }
`