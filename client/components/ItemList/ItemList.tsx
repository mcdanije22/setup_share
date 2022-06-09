import { Row, Col, Typography, Divider } from "antd";
import { EyeOutlined, SelectOutlined } from "@ant-design/icons";
const { Link } = Typography;

interface Item {
  coords: number[];
  href: string;
  id: string;
  name: string;
  preFillColor: string;
  shape: string;
}
interface Props {
  itemList: Array<Item>;
  subscriptionStatus: boolean;
  itemCookieClickFunction: (id: string) => void;
  handleModalOpen: any;
}

const ItemList = ({
  itemList,
  itemCookieClickFunction,
  subscriptionStatus,
  handleModalOpen,
}: Props) => {
  return (
    <div>
      {itemList.map((item: Item, i: number) => {
        return (
          <div key={i}>
            <Row justify="space-between">
              <Col key={i} style={{ fontSize: "1.2rem" }}>
                {i + 1}. {item.name}
              </Col>
              {subscriptionStatus && (
                <Col style={{ alignSelf: "end" }}>
                  <SelectOutlined
                    style={{ fontSize: "1rem" }}
                    // onClick={() => {
                    //   handleModalOpen(item);
                    //   itemCookieClickFunction(item.id);
                    // }}
                    onClick={() => handleModalOpen(item)}
                  />
                </Col>
              )}
              {/* <EyeOutlined */}
              {/*   onClick={() => { */}
              {/*     highlightItem(item.id); */}
              {/*   }} */}
              {/* /> */}
            </Row>
            {i !== itemList.length - 1 ? <Divider /> : ""}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
