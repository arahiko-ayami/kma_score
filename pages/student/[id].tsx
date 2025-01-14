import Table from "../../components/Table";
import Head from "next/head";
import StudentService from "../../services/Student.service";
import { Student as StudentModel } from "../../models/Student.model";

export async function getServerSideProps(context: { params: { id: string } }) {
  const id = context.params.id;

  const TABLE_HEADERS = [
    {
      label: "Tên môn học",
      valueRender: "name",
    },
    {
      label: "Điểm thành phần 1",
    },
    {
      label: "Điểm thành phần 2",
    },
    {
      label: "Điểm thi",
    },
    {
      label: "Điểm tổng kết",
    },
    {
      label: "Điểm chữ",
    },
  ];

  try {
    const { data } = await StudentService.getScores(id);
    return {
      props: {
        data,
        columns: TABLE_HEADERS,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

export default function Student({
  data,
  columns,
}: {
  data: StudentModel;
  columns: any[];
}) {
  return (
    <>
      <Head>
        <title>{`./kma_score - ${data?.name}`}</title>
        <meta property="og:title" content={`./kma_score - ${data?.name}`} />
        <meta
          name="description"
          content={`Điểm số của ${data?.id} - ${data?.name}`}
        />
        <meta
          name="og:description"
          content={`Điểm số của ${data?.id} - ${data?.name}`}
        />
      </Head>
      <div className="p-5 space-y-5">
        <h2>{data?.name}</h2>
        <div className="space-x-2">
          <p className="btn btn-outline btn-success">{data?.id}</p>
          <p className="btn btn-outline btn-error">{data?.class}</p>
        </div>

        <div className="stats shadow w-full bg-primary/20 stats-vertical md:stats-horizontal">
          <div className="stat">
            <div className="stat-figure text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-8 h-8 stroke-current"
                viewBox="0 0 512 512"
              >
                <title>Số môn đã hoàn thành</title>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
                />
              </svg>
            </div>
            <div className="stat-title">Số môn đã hoàn thành</div>
            <div className="stat-value text-success">
              {data?.passedSubjects}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-8 h-8 stroke-current"
                viewBox="0 0 512 512"
              >
                <title>Số môn còn nợ</title>
                <path
                  d="M256 80c-8.66 0-16.58 7.36-16 16l8 216a8 8 0 008 8h0a8 8 0 008-8l8-216c.58-8.64-7.34-16-16-16z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
                <circle
                  cx="256"
                  cy="416"
                  r="16"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
            </div>
            <div className="stat-title">Số môn còn nợ</div>
            <div className="stat-value text-secondary">
              {data?.failedSubjects}
            </div>
          </div>

          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-8 h-8 stroke-current"
                viewBox="0 0 512 512"
              >
                <title>Pulse</title>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M48 320h64l64-256 64 384 64-224 32 96h64"
                />
                <circle
                  cx="432"
                  cy="320"
                  r="32"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
            </div>
            <div className="stat-title">GPA</div>
            <div className="stat-value text-primary">{data?.avgScore}</div>
          </div>
        </div>
        <Table columns={columns} data={data?.scores} />
      </div>
    </>
  );
}
