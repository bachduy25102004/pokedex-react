import { Card, Stack } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function SkeletonTemplate() {
  return (
    // <div className="grid grid-cols-4 grid-rows-5 gap-[45px] ml-[120px] mr-[120px]">
    //     <div className="rounded-[8px] bg-gray-300" />
    // </div>
    // <>

    //     <div

    //       className="rounded-xl bg-white shadow-md border border-gray-200 pb-4 flex flex-col items-center gap-3 animate-pulse"
    //     >

    //       <div className="w-50 h-56  rounded-lg bg-gray-300" />

    //       <div className="w-3/4 h-4 rounded bg-gray-300" />

    //       <div className="w-1/2 h-3 rounded bg-gray-300" />
    //     </div>

    // </>
    // <Stack gap={1.5} height={478} justifyItems={"center"} alignItems={"center"}>
    <Card className="flex flex-col gap-5 justify-center pb-4">
      <Skeleton variant="rounded" height={329} className="rounded-[20px]" />
      <Skeleton
        variant="rectangular"
        height={21}
        width={64}
        className="m-auto"
      />
      <Skeleton
        variant="rectangular"
        height={38}
        width={170}
        className="m-auto"
      />
      <div className="flex flex-row items-center justify-center gap-4">
        <Skeleton variant="rounded" height={30} width={100} />
        <Skeleton variant="rounded" height={30} width={100} />
      </div>
    </Card>
    // </Stack>
  );
}
