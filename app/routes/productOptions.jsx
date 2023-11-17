import {
    Link,
    useLocation,
    useSearchParams,
    useNavigation,
} from '@remix-run/react'
import { useEffect } from 'react';

export default function ProductOptions({ options, selectedVariant, selectedOptionResult }) {

    const { pathname, search } = useLocation();
    const [currentSearchParams, setCurrentSearchParams] = useSearchParams();
    const navigation = useNavigation();

    // If there is no selected option, use selectedVariant as default
    const paramsWithDefault = (() => {
        // Create copy of currentSearchParams
        const defaultSearchParams = new URLSearchParams(currentSearchParams);
        console.log('currentSearchParams:', currentSearchParams, ', selectedVariant:', selectedVariant);
        // if (!selectedOptionResult) {
        //     // if currentSearchParams has wrong params
        //     // use selected variant..
        //     setCurrentSearchParams({});
        //     for (const { name, value } of selectedVariant.selectedOptions) {
        //         defaultSearchParams.set(name, value);
        //     }
        //     return defaultSearchParams;
        // }
        if (!selectedVariant) {

            return defaultSearchParams;
        }

        for (const { name, value } of selectedVariant.selectedOptions) {
            if (!defaultSearchParams.has(name)) {
                defaultSearchParams.set(name, value);
            }
        }
        return defaultSearchParams;
    })();//self invoke

    useEffect(() => {
        if (!selectedOptionResult && currentSearchParams.toString().length > 0) {
            // if currentSearchParams has wrong params
            // use selected variant..
            setCurrentSearchParams({});
            for (const { name, value } of selectedVariant.selectedOptions) {
                defaultSearchParams.set(name, value);
            }
            return defaultSearchParams;
        }

    }, [])
    // Update the in-flight request data from the navigation in loading status
    // to create the optimistic UI pattern that selects the link before the request is completed 
    // where the navigation status goes to the idle.
    let searchParams = navigation?.location ?
        new URLSearchParams(navigation.location.search) :
        paramsWithDefault;

    console.log('pathname:', pathname, ', search:', search, ', linkParams:', searchParams.toString(), ', navigation:', navigation)
    return (
        <div className='grid gap-4 mb-6'>
            {options.map(option => {

                if (!option.values.length) return;

                //


                // Get the currently selected option value 
                const currentOptionValue = searchParams.get(option.name);
                console.log('option-name:', option.name, ', value:', currentOptionValue);
                return (
                    <div key={option.name} className='flex flex-col flex-wrap gap-y-2 mb-4 last:mb-0'>
                        <h3 className='max-w-prose min-w-[4rem] font-bold whitespace-pre-wrap '>
                            {option.name}
                        </h3>
                        <div className='flex flex-wrap gap-4 items-baseline'>
                            {option.values.map(value => {
                                //Build URLSearchParams object(instance otherwise it'll be overwritten.) 
                                // from the current seach string.
                                // Therefore linkParams are created for each <Link>
                                const linkParams = new URLSearchParams(searchParams);
                                const isSelected = currentOptionValue === value;
                                //Set option name and value,  and overwrite any existing value
                                linkParams.set(option.name, value);

                                console.log('linkParams:', linkParams.toString())
                                return (
                                    <Link to={`${pathname}?${linkParams.toString()}`}
                                        key={value}
                                        preventScrollReset
                                        replace
                                        className={` leading-none border-b-[1.5px] py-1 cursor-pointer hover:no-underline transition-all duration-200
                                                    ${isSelected ? 'border-gray-500' : 'border-neutral-50'}
                                        `}
                                    >
                                        {value}
                                    </Link>
                                )
                            })

                            }
                        </div>
                    </div>
                );
            })

            }
        </div>
    );
}