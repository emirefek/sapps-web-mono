import { trpc } from "../../lib/trpc";

export default function Dev() {
  const { data } = trpc.demo.get.useQuery();

  return (
    <>
      {/* <HeaderBasic /> */}
      <div>awdawdawdawd</div>
      {JSON.stringify(data)}
    </>
  );
}
