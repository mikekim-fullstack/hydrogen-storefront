export function meta() {
    return [
        { title: 'Hydrogen' },
        { description: 'A custom storefront powered by Hydrogen' },
    ];
}
export async function loader({ request, params, context }) {

    // console.log('---request', request, '----params', params, '-----context', context)
    console.log('route-index-loader: url-', request.url)
    return {}

}
export default function Index() {
    return (
        <div>
            {console.log('---route-index-client----')}
            <h1>Hello from the home page!</h1>
        </div>
    );
}
