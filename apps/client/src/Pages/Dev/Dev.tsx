import { trpc } from "../../lib/trpc";
import HeaderBasic from "src/Components/Partial/Header";

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
