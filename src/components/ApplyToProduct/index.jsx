import { gql, useQuery } from "@apollo/client";
import {
  Banner,
  Card,
  Combobox,
  Heading,
  Icon,
  Listbox,
  Modal,
  RadioButton,
  ResourceItem,
  ResourceList,
  Stack,
  TextField,
  TextStyle,
  Thumbnail,
} from "@shopify/polaris";
import { CirclePlusMinor, SearchMajor } from "@shopify/polaris-icons";
import { useCallback, useState } from "react";

import placeholderImage from "../../assets/placeholder.png";

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
    collections(first: 30) {
      edges {
        node {
          id
          title
          image {
            id
            url
          }
        }
      }
    }
    shop {
      productTags(first: 100) {
        edges {
          cursor
          node
        }
      }
    }
  }
`;

function ApplyToProduct() {
  // page state
  const [searchSpecificProducts, setSearchSpecificProducts] = useState("");
  const [searchProductCollections, setSearchProductCollections] = useState("");
  const [searchProductTags, setSearchProductTags] = useState("");
  const [active, setActive] = useState(false);
  const [value, setValue] = useState("disabled");
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedOptionsCollection, setSelectedOptionsCollection] = useState(
    []
  );
  const [selectedOptionsTag, setSelectedOptionsTag] = useState([]);

  const [isShowSearchs, setIsShowSearchs] = useState({
    specificProducts: false,
    productCollections: false,
    productTags: false,
  });

  const { data, loading } = useQuery(PRODUCTS_QUERY);

  const handleRadioButtonChange = useCallback((_checked, newValue) => {
    setValue(newValue);
    if (newValue === "all_products") {
      setIsShowSearchs({
        specificProducts: false,
        productCollections: false,
        productTags: false,
      });
    } else if (newValue === "specific_products") {
      setIsShowSearchs({
        specificProducts: true,
        productCollections: false,
        productTags: false,
      });
    } else if (newValue === "product_collections") {
      setIsShowSearchs({
        specificProducts: false,
        productCollections: true,
        productTags: false,
      });
    } else if (newValue === "product_tags") {
      setIsShowSearchs({
        specificProducts: false,
        productCollections: false,
        productTags: true,
      });
    }
  }, []);

  const handleChangeStatusModal = useCallback(() => {
    setActive(!active);
  }, [active]);

  const handleScrollBottom = useCallback(() => {}, []);

  const handleBannerSelectedItemClick = (id) => {
    const newSelectedItems = selectedItems.filter((item) => item !== id);
    setSelectedItems(newSelectedItems);
  };

  const handleBannerSelectedOptionClick = (id) => {
    const newSelectedOptions = selectedOptionsCollection.filter(
      (item) => item !== id
    );
    setSelectedOptionsCollection(newSelectedOptions);
  };
  const handleBannerSelectedOptionTagClick = (id) => {
    const newSelectedOptions = selectedOptionsTag.filter((item) => item !== id);
    setSelectedOptionsTag(newSelectedOptions);
  };

  const updateSelectionCollection = useCallback((selected) => {
    setSelectedOptionsCollection([...selectedOptionsCollection, selected]);
  }, []);
  const updateSelectionTag = useCallback((selected) => {
    console.log("selected: ", selected);
    setSelectedOptionsTag([...selectedOptionsTag, selected]);
  }, []);

  const optionsMarkup = !loading
    ? data.collections.edges.map((item) => {
        const { id, title } = item.node;

        return (
          <Listbox.Option key={`${id}`} value={id} acessibilityLabel={title}>
            {title}
          </Listbox.Option>
        );
      })
    : null;

  const optionsMarkupTag = !loading
    ? data.shop.productTags.edges.map((item, index) => {
        return (
          <Listbox.Option
            key={item.node}
            value={item.node}
            acessibilityLabel={item.node}
          >
            {item.node}
          </Listbox.Option>
        );
      })
    : null;

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
          {/* search specific products */}
          {isShowSearchs.specificProducts && (
            <TextField
              placeholder="Search product"
              onFocus={handleChangeStatusModal}
              value={searchSpecificProducts}
            />
          )}
          {/* selected items */}
          {isShowSearchs.specificProducts &&
            selectedItems.length > 0 &&
            selectedItems.map((item, index) => (
              <Banner
                key={index}
                onDismiss={() => handleBannerSelectedItemClick(item)}
              >
                <Heading>{item}</Heading>
              </Banner>
            ))}
          <RadioButton
            label="Product collections"
            id="product_collections"
            name="product_collections"
            checked={value === "product_collections"}
            onChange={handleRadioButtonChange}
          />
          {/* search product collections */}
          {!loading && isShowSearchs.productCollections && (
            <Combobox
              allowMultiple
              activator={
                <Combobox.TextField
                  placeholder="Vintage, cotton, summer"
                  value={searchProductCollections}
                  onChange={(value) => setSearchProductCollections(value)}
                />
              }
            >
              {optionsMarkup ? (
                <Listbox
                  autoSelection="NONE"
                  onSelect={updateSelectionCollection}
                >
                  <Listbox.Header>SUGGESTED COLLECTIONS</Listbox.Header>

                  {optionsMarkup}
                </Listbox>
              ) : null}
            </Combobox>
          )}
          {isShowSearchs.productCollections &&
            selectedOptionsCollection.length > 0 &&
            selectedOptionsCollection.map((item, index) => (
              <Banner
                key={index}
                onDismiss={() => handleBannerSelectedOptionClick(item)}
              >
                <Heading>{item}</Heading>
              </Banner>
            ))}
          <RadioButton
            label="Product Tags"
            id="product_tags"
            name="product_tags"
            checked={value === "product_tags"}
            onChange={handleRadioButtonChange}
          />
        </Stack>
        {/* search product tags */}
        {!loading && isShowSearchs.productTags && (
          <Combobox
            allowMultiple
            activator={
              <Combobox.TextField
                placeholder="Vintage, cotton, summer"
                value={searchProductTags}
                onChange={(value) => setSearchProductTags(value)}
              />
            }
          >
            {optionsMarkupTag ? (
              <Listbox autoSelection="NONE" onSelect={updateSelectionTag}>
                <Listbox.Action
                  value="ActionValue"
                  disabled={searchProductTags ? false : true}
                >
                  <Stack spacing="tight">
                    <Icon
                      source={CirclePlusMinor}
                      color={searchProductTags ? "base" : "subdued"}
                    />
                    <div>Add</div>
                  </Stack>
                </Listbox.Action>
                <Listbox.Header>SUGGESTED TAGS</Listbox.Header>
                {optionsMarkupTag}
              </Listbox>
            ) : null}
          </Combobox>
        )}
        {isShowSearchs.productTags &&
          selectedOptionsTag.length > 0 &&
          selectedOptionsTag.map((item, index) => (
            <Banner
              key={index}
              onDismiss={() => handleBannerSelectedOptionTagClick(item)}
            >
              <Heading>{item}</Heading>
            </Banner>
          ))}
        {/* specific products modal */}
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
            onAction: () => {
              setActive(false);
            },
          }}
        >
          <Modal.Section>
            <TextField
              prefix={<Icon source={SearchMajor} color="base" />}
              value={searchSpecificProducts}
              onChange={(value) => setSearchSpecificProducts(value)}
            />
            {loading && <h2>Loading...</h2>}
            {!loading && (
              <ResourceList
                selectable
                resourceName={{
                  singular: "product",
                  plural: "products",
                }}
                selectedItems={selectedItems}
                onSelectionChange={setSelectedItems}
                items={data.products.edges}
                renderItem={(item) => (
                  <ResourceItem
                    id={item.node.id}
                    media={
                      <Thumbnail
                        source={
                          item.node.images.edges.length > 0
                            ? item.node.images.edges[0].node.url
                            : placeholderImage
                        }
                        alt={item.node.title}
                      />
                    }
                  >
                    <TextStyle variation="strong">{item.node.title}</TextStyle>;
                  </ResourceItem>
                )}
              />
            )}
          </Modal.Section>
        </Modal>
      </Card>
    </>
  );
}

export default ApplyToProduct;
