import Head from "next/head";
import { Button, Upload, message, Form } from "antd";
import { ConsoleSqlOutlined, InboxOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [imageList, setFileList] = useState([]);
  const [uploading, setUploadingStatus] = useState(false);
  const { Dragger } = Upload;

  const uploadFile = async (values) => {
    const data = new FormData();
    data.append("image-file", values.imageFile.file.originFileObj);
    await axios
      .post("http://localhost:5000/images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        message.success("sucess");
      })
      .catch((error) => {
        message.error(error);
      });
  };
  const dummyRequest = (values) => {
    setFileList([...imageList, values]);
  };
  console.log(imageList);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Form name="file-upload-form" onFinish={uploadFile}>
          <Form.Item name="imageFile">
            <Dragger
              name="image"
              multiple={true}
              maxCount={3}
              customRequest={dummyRequest}
              fileList={imageList}
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
            <Button type="primary" htmlType="submit">
              submit
            </Button>
          </Form.Item>
        </Form>
        {/* <img src="https://share-set-up-uploads.s3.us-east-2.amazonaws.com/front+view" /> */}
      </main>

      <footer></footer>
    </div>
  );
}
