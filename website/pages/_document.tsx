import { Html, Head, Main, NextScript } from "next/document";

const GOOGLE_ID = process.env.GOOGLE_ID;
const DATAPULSE_ID = process.env.DATAPULSE_ID;
const isProd = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🦋</text></svg>"
        />

        {isProd && !!DATAPULSE_ID && (
          <script
            defer
            type="text/javascript"
            src="https://datapulse.app/datapulse.min.js"
            id="datapulse"
            data-endpoint="https://datapulse.app/api/v1/event"
            data-workspace={DATAPULSE_ID}
          ></script>
        )}

        {isProd && !!GOOGLE_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ID}`}
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GOOGLE_ID}');
              `,
              }}
              async
              id="gtag-init"
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
