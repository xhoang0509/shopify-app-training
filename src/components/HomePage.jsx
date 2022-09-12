import { Heading, Layout, Page } from "@shopify/polaris";

import General from "./General";
import ApplyToProduct from "./ApplyToProduct/index";
import CustomPrice from "./CustomPrice";
import { ProductsCard } from "./ProductsCard";

export function HomePage() {
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Heading element="h1" style={{ marginBottom: "10px" }}>
            New Pricing Rule
          </Heading>
          <General />
          <ApplyToProduct />
          <CustomPrice />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
