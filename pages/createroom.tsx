import React, { useState } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  PageHeader,
  Typography,
  Space,
} from "antd";
import axios from "axios";
import CreateSetupStepOneForm from "../components/CreateSetupForms/CreateSetupStepOneForm";

const { Title } = Typography;

export default function CreateRoomPage() {
  const [stepOneForm, setStepOneForm] = useState({});
  const [stepTwoForm, setStepTwoForm] = useState({});
  const [stepThreeForm, setStepThreeForm] = useState({});
  console.log(stepOneForm);
  return (
    <div id="container">
      <Row justify="center">
        <Col xs={{ span: 20 }} sm={{ span: 16 }}>
          <CreateSetupStepOneForm setStepOneForm={setStepOneForm} />
        </Col>
      </Row>
    </div>
  );
}
