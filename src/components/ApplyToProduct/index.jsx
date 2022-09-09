import { gql, useQuery } from "@apollo/client";
import {
  Card,
  Icon,
  Modal,
  RadioButton,
  Stack,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { SearchMajor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

const PRODUCTS_QUERY = gql`
  query {
    products(first: 30) {
      edges {
        node {
          id
          title
          images(first: 1) {
            edges {
              node {
                id
                url
              }
            }
          }
        }
      }
    }
  }
`;

function ApplyToProduct() {
  // page state
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("disabled");
  const [isShowSearchProduct, setIsShowSearchProduct] = useState(false);

  const { data, loading } = useQuery(PRODUCTS_QUERY);

  console.log("data: ", data);

  const handleRadioButtonChange = useCallback((_checked, newValue) => {
    setValue(newValue);
    if (newValue === "specific_products") {
      setIsShowSearchProduct(true);
    } else {
      setIsShowSearchProduct(false);
    }
  }, []);

  const handleChangeStatusModal = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleScrollBottom = useCallback(() => {}, []);

  return (
    <>
      <Card title="Apply to Product" sectioned>
        <Stack vertical>
          <RadioButton
            label="All products"
            checked={value === "all_products"}
            id="all_products"
            name="all_products"
            onChange={handleRadioButtonChange}
          />
          <RadioButton
            label="Specific products"
            id="specific_products"
            name="specific_products"
            checked={value === "specific_products"}
            onChange={handleRadioButtonChange}
          />
          {isShowSearchProduct && (
            <TextField
              placeholder="Search product"
              onFocus={handleChangeStatusModal}
            />
          )}
          <RadioButton
            label="Product collections"
            id="product_collections"
            name="product_collections"
            checked={value === "product_collections"}
            onChange={handleRadioButtonChange}
          />
          <RadioButton
            label="Product Tags"
            id="product_tags"
            name="product_tags"
            checked={value === "product_tags"}
            onChange={handleRadioButtonChange}
          />
        </Stack>
        <Modal
          open={active}
          title={
            <div style={{ textAlign: "center", fontWeight: 500 }}>
              SELECT SPECIFIC PRODUCTS
            </div>
          }
          onClose={handleChangeStatusModal}
          onScrolledToBottom={handleScrollBottom}
          primaryAction={{
            content: "Select",
          }}
        >
          <Modal.Section>
            <TextField prefix={<Icon source={SearchMajor} color="base" />} />
            {loading && <h2>Loading...</h2>}
            {!loading &&
              data.products.edges.map((product, index) => {
                return (
                  <TextContainer key={index}>{product.title}</TextContainer>
                );
              })}
          </Modal.Section>
        </Modal>
      </Card>
    </>
  );
}

export default ApplyToProduct;
