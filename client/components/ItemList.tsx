import { Row, Col, Typography, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
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
}

const ItemList = ({
  itemList,
  itemCookieClickFunction,
  subscriptionStatus,
}: Props) => {
  return (
    <div>
      {itemList.map((item: Item, i: number) => {
        return (
          <div key={i}>
            <Row justify="space-between">
              <Col key={i}>
                {i + 1}.{" "}
                <Link
                  onClick={() => itemCookieClickFunction(item.id)}
                  // style={{ color: "black" }}
                  //onhover underline?
                  href={`${item.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              </Col>
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
