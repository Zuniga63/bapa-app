import { createGetInitialProps } from '@mantine/next';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Provider } from 'react-redux';
import { store } from 'src/store';

const getInitialProps = createGetInitialProps();

class MyDocument extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Provider store={store}>
        <Html lang="es" className="dark">
          <Head>
            <link
              href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Roboto:ital,wght@0,400;0,500;0,700;1,400&family=Zen+Dots&display=swap"
              rel="stylesheet"
            />
            <link
              rel="shortcut icon"
              href={process.env.NEXT_PUBLIC_BRAND_LOGO_URL || ''}
              type="image/x-icon"
            />
          </Head>
          <body className="bg-light dark:bg-defaul-body">
            <Main />
            <NextScript />
          </body>
        </Html>
      </Provider>
    );
  }
}

export default MyDocument;
