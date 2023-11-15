

const Image = ({ src, alt, width, height }) => {
    return (
        <div className="  rounded-lg overflow-hidden">
            <img
                src={src}
                srcSet={`${src}&width=165 165w, ${src}&width=330 330w, ${src}&width=535 535w, ${src}&width=750 750w, ${src}&width=1000 1000w, ${src}&width=1024 1024w`}
                // srcSet={`${src}&width=165 165w,`}
                sizes="(min-width: 1200px) 336px, (min-width: 750px) calc((100vw - 10rem) / 2), calc(100vw - 3rem)"
                // sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 900px"
                width={width}
                height={height}
                loading="lazy"
                alt={alt}
                className="w-full h-full object-cover object-center 
                transition-transform duration-[0.5s] ease-[cubic-bezier(.15, .57, .63, .45)]
                hover:scale-[1.03]
                "
            />
        </div>
    )
}
Image.defaultProps = {
    width: 1024,
    height: 1024,
}

export default Image