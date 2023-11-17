import { useLoaderData, Link, NavLink } from "@remix-run/react";
import Image from "~/components/Image";

export function meta() {
    return [
        { title: 'Hydrogen' },
        { description: 'A custom storefront powered by Hydrogen' },
    ];
}
export async function loader({ request, params, context }) {

    // console.log('---request', request, '----params', params, '-----context', context)
    // console.log('route-index-loader: url-', request.url)

    return await context.storefront.query(COLLECTIONS_QUERY);

}
export default function Index() {
    const { collections } = useLoaderData();
    // console.log('loaderData: ', collections);
    return (
        <section className=" grid w-full gap-4 font-[Poppins-light]" >
            {/* Test whiteSpace */}
            {/* <div className="whitespace-pre" style={{ whiteSpace: 'pre-line' }}>
                {
                    `
                    This is some text. This is some text. This is some text.
                    This is some text. This is some text. This is some text.
                    This is some text. This is some text. This is some text.
                    This is some text. This is some text. This is some text.
                    `
                }
            </div> */}
            <h2 className="whitespace-pre-wrap max-w-prose font-[Poppins-bold] text-xl text-left">
                {`Collections`}
            </h2>
            {console.log(collections.nodes.length)}
            <div className={`grid grid-flow-row gap-2 gap-y-6 
                            sm:grid-cols-2
                            md:gap-4
                            lg:grid-cols-3
                            lg:gap-6
            `}>
                {
                    collections.nodes.map((collection) => {
                        return (
                            <NavLink to={`/collections/${collection.handle}`} key={collection.id}
                                className="hover:text-purple-900 hover:no-underline">
                                <div className="grid gap-4">
                                    {
                                        collection?.image && <Image
                                            alt={`Image of ${collection.title}`}
                                            src={collection.image.url}
                                        />
                                    }

                                </div>
                                <h2 className="whitespace-pre-wrap max-w-prose text-medium text-lg ">
                                    {collection.title}
                                </h2>
                            </NavLink>
                        )
                    })
                }

            </div>


        </section>
    );
}
const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        image {
            altText
            width
            height
            url
          }
      }
    }
  }
`;