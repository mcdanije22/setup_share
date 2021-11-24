import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { GetServerSideProps } from "next";

interface Props {
  id: number;
}

export default function SetupPage(props: Props) {
  useEffect(() => {
    console.log(props);
  });
  return (
    <Layout>
      <div id="setupPageContainer">{props.id}</div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const data = await axios.get(`${process.env.BASE_API}/setup/1`);
  const response = data;
  return {
    props: { id },
  };
};
