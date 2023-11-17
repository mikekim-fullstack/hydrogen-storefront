import { useLoaderData } from '@remix-run/react'
import { json } from '@shopify/remix-oxygen';
import ProductGrid from '~/components/ProductGrid';

import { getPaginationVariables } from '@shopify/hydrogen';


const seo = ({ data }) => {
    // console.log('---- seo -----')
    return {
        title: data?.collection?.title,
        description: data?.collection?.description.substr(0, 154),
    }
};

export const handle = {
    seo,
};

export function meta({ data }) {
    // console.log('---- meta -----')
    return [
        { title: data?.collection?.title ?? 'Collection' },
        { description: data?.collection?.description },
    ];
}

export async function loader({ params, request, context }) {
    // console.log('-----loader---');
    const { handle } = params;
    try {
        const paginationVariables = getPaginationVariables(request, {
            pageBy: 4,
        });
        const { collection } = await context.storefront.query(COLLECTION_QUERY, {
            variables: {
                ...paginationVariables,
                handle,
            }
        });
        if (!collection) throw new Response(null, { status: 404 });
        // if (!collection) return json(null, { status: 404 });
        return json({ collection }, { status: 200 });
    } catch (error) {
        return json({ error: error.message }, { status: 404 })
    }
}
export default function Collection() {
    const { collection } = useLoaderData();
    // console.log('collection-data:', collection);

    return (<>
        <header className='grid w-full gap-8 py-8 justify-items-start'>
            <h1 className='inline-block text-4xl font-[Poppins-bold]'>
                {collection.title}
            </h1>
            {
                collection.description && (
                    <div className='text-justify w-full items-baseline sm:max-w-md'>
                        <div>
                            <p className='inline-block m-w-md whitespace-pre-wrap '>
                                {collection.description}
                            </p>
                        </div>
                    </div>
                )
            }
        </header>
        <ProductGrid collection={collection} url={`/collections/${collection.handle}`} />
    </>);
}
const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
      ) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }

  `;
const COLLECTION_QUERY1 = `#graphql
    query CollectionDetails(
        $handle: String!
        $first:Int 
        $last:Int 
        $startCursor:String 
        $endCursor:String 
        ) {
        collection(handle: $handle){
            title 
            description 
            handle
            products(
                first:$first 
                last:$last 
                before:$startCursor 
                after:$endCursor
                ){
                #-----------------------
                nodes{
                    id 
                    title 
                    publishedAt 
                    handle 
                    variants(first: 1){
                        nodes{
                            id 
                            #-- image subtree
                            image{
                                url 
                                altText 
                                width 
                                height
                            }
                            #-- price subtree
                            price{
                                amount 
                                currencyCode
                            }
                            #-- compared price subtree
                            compareAtPrice{
                                amount 
                                currencyCode
                            }

                        }
                        
                    }
                }
                #------------------------
                pageInfo{
                    hasPreviousPage 
                    hasNextPage 
                    startCursor 
                    endCursor 
                }
                #-------------------------
            }
        }
    }
`