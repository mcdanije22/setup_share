import Head from "next/head";
import React, { useState } from "react";
import { Button, Upload, message, Form } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import CanvasImg from "../components/CanvasImg";

export default function Home() {
  const [imageList, setFileList] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);

  const { Dragger } = Upload;

  const uploadFile = async (values) => {
    setLoadingStatus(true);
    const data = new FormData();
    data.append("image-file", values.imageFile.file.originFileObj);
    try {
      // const result = await axios.post("http://localhost:5000/images", data, {
      const result = await axios.post(
        "http://localhost:5000/image/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(result);
      message.success("sucess");
    } catch (error) {
      console.log(error);
    }
    setLoadingStatus(false);
    //likely wont need this list tracking, will look to have custom preview images and single uploads
    // setFileList([...imageList, values.imageFile.file.originFileObj]);
  };
  const dummyRequest = (file) => {
    console.log(file);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/maphilight/1.4.0/jquery.maphilight.min.js"
        ></script>
      </Head>
      <main>
        <Form name="file-upload-form" onFinish={uploadFile}>
          <Form.Item name="imageFile">
            <Dragger
              name="image"
              multiple={false}
              maxCount={1}
              customRequest={dummyRequest}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              submit
            </Button>
          </Form.Item>
        </Form>
        {/* <Map /> */}

        {/* <img src="https://share-set-up-uploads.s3.us-east-2.amazonaws.com/front+view" /> */}
      </main>

      <footer></footer>
    </div>
  );
}
