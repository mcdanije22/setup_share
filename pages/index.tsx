import Head from "next/head";
import React from "react";
import { Button, Upload, message, Form } from "antd";
import { ConsoleSqlOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";
import dynamic from "next/dynamic";

export default function Home() {
  const Map = React.useMemo(
    () =>
      dynamic(
        () => import("../components/Map"), // replace '@components/map' with your component's location
        {
          loading: () => <p>A map is loading</p>,
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );

  const [imageList, setFileList] = useState([]);
  const [isLoading, setLoadingStatus] = useState(false);
  const { Dragger } = Upload;

  const uploadFile = async (values) => {
    setLoadingStatus(true);
    const data = new FormData();
    data.append("image-file", values.imageFile.file.originFileObj);
    try {
      const result = await axios.post("http://localhost:5000/images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        />
        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
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
        <Map />
        {/* <img src="https://share-set-up-uploads.s3.us-east-2.amazonaws.com/front+view" /> */}
      </main>

      <footer></footer>
    </div>
  );
}
