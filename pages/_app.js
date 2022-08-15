import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/answer.css";

export default function MyApp({Component, pageProps}) {
    return (
        <>
            <Component {...pageProps} />
            <style jsx global>{
                `*{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: 'Roboto', sans-serif;
                }`
            }</style>
        </>
    )
}