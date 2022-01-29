import { Row, Col, Typography, Divider } from "antd";
import { EyeOutlined } from "@ant-design/icons";
const { Link } = Typography;

const ItemList = ({ itemList, highlightItem }) => {
  return (
    <div>
      {itemList.map((item, i) => {
        return (
          <div key={i} style={{ padding: "1rem 2rem" }}>
            <Row justify="space-between">
              <Col key={i}>
                {i + 1}.{" "}
                <Link
                  href={`${item.href}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </Link>
              </Col>
              <EyeOutlined
                onClick={() => {
                  highlightItem(item.id);
                }}
              />
            </Row>
            {i !== itemList.length - 1 ? <Divider orientation="left" /> : ""}
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
