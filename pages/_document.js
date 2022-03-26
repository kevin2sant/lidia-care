import Document, { Html, Head, Main, NextScript  } from "next/document";
import Script from 'next/script'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>

          {/* <!-- Metas para el iphone --> */}
          <meta name="theme-color" content="#9BDFE6"/>
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-touch-fullscreen" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="Lidia" />
          <meta name="apple-touch-startup-image" content="(device-width: 	414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" href="%PUBLIC_URL%/login-bg-ios.jpg" />
        </Head>
        <body>
          <Main />
          <NextScript />
          
        </body>
      </Html>
    );
  }
}

export default MyDocument;