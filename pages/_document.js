import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <meta name="theme-color" content="#fff" />

          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
          
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