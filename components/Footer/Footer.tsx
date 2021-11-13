import { Row, Typography, Divider } from "antd";

const { Text } = Typography;

const Footer = () => {
  return (
    <div id="footerContainer" style={{ padding: "0 1rem 1rem 1rem" }}>
      <Divider style={{ margin: 0, marginBottom: "2rem" }} />
      <Row justify="center">
        <Text>© 2021 All rights reserved.</Text>
      </Row>
    </div>
  );
};
export default Footer;
