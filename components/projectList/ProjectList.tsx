import styles from "./projectList.module.scss";
import { Card, Row, Col, PageHeader, Tag, Typography } from "antd";
import Link from "next/link";

const { Meta } = Card;
const { Text } = Typography;

interface DashboardItem {
  user_id: string;
  username: string;
  setup_id: string;
  setup_title: string;
  setup_description: string;
  setup_type: string;
  setup_created_date: Date;
  created_screen_type: any;
  image_id: string;
  image_url: string;
  image_position: string;
  image_position_number: number;
}

type DashboardProps = {
  projects: Array<DashboardItem>;
};

const ProjectsList = (props: DashboardProps) => {
  const { projects } = props;
  return (
    <div id={styles.ProjectList}>
      <Row gutter={[48, 28]} justify="start">
        {projects
          .sort((a, b) =>
            a.setup_created_date < b.setup_created_date ? 1 : -1
          )
          .map((project, i) => {
            return (
              <div key={i}>
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  lg={{ span: 6 }}
                  className={styles.cardSpacer}
                >
                  <Link href={`/dashboard/analytics/${project.setup_id}`}>
                    <Card
                      hoverable
                      cover={<img alt="Main photo" src={project.image_url} />}
                    >
                      <Meta
                        title={
                          <PageHeader
                            title={[
                              <div key={1}>{project.setup_title} setup</div>,
                            ]}
                          ></PageHeader>
                        }
                        description={
                          <Tag color="blue">{project.setup_type}</Tag>
                        }
                      />
                    </Card>
                  </Link>
                </Col>
              </div>
            );
          })}
      </Row>
    </div>
  );
};
export default ProjectsList;
