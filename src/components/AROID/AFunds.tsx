import { Spinner } from "@nextui-org/react";
import { Btn } from "../btns";
import { TitCard } from "../cards";
import { STable } from "../tables";
import { AllText } from "@/lib/allText";
import { currentENVName } from "../ADashboard";
import { useRouter } from "next/navigation";

const AFunds = () => {
  const r = useRouter();


  const rewardsList = [
    ['180 $REACH', <Btn className="h-5">Claim</Btn>, '180 $REACH',],
    ['180 $REACH', <Btn className="h-5">Claim</Btn>, '180 $REACH',],
  ]

  const hirrotyList = [
    ['25-02-02', '12:12:30', 'Claim Rewards', '25 $REACH', '5H73uVr7ZY...mEAzZb1wbn', 'AWJDIVVBOFNZ'],
    ['25-02-02', '12:12:30', 'Claim Rewards', '25 $REACH', '5H73uVr7ZY...mEAzZb1wbn', 'AWJDIVVBOFNZ'],
    ['25-02-02', '12:12:30', 'Claim Rewards', '25 $REACH', '5H73uVr7ZY...mEAzZb1wbn', 'AWJDIVVBOFNZ'],

  ]

  const emptyText = () => {
    return <div>
      Your Jade shards are auto-credited to your account. Visit <button onClick={() => {
        r.push(`?mode=${currentENVName}&tab=stats`)
      }}
        className="underline underline-offset-1">Stats</button> to view your rewards.</div>
  }

  return <div className="flex gap-5 mt-5 flex-col">
    <TitCard
      tit="Rewards & Claim"
      className="flip_item w-full bg-[#6D6D6D66] "
    >
      <STable
        isLoading={false}
        loadingContent={<Spinner />}
        empty={emptyText()}
        head={[
          "Total Claimable",
          "Claim to Address",
          "Total Claimed",
        ]}
        data={[]}
      />
      {/* {pageChunks.length > 1 && (
        <div className="flex items-center">
          <Pagination className="mx-auto" classNames={PaginationClassNames} total={pageChunks.length} page={page} onChange={onSwitchPage} />
        </div>
      )} */}
    </TitCard>
    <TitCard
      tit="History"
      className="flip_item w-full bg-[#6D6D6D66]"
    >
      <STable
        isLoading={false}
        loadingContent={<Spinner />}
        empty={emptyText()}
        head={[
          "Date",
          "Time",
          'Transaction Type',
          "Amount",
          'Address',
          'TXID'
        ]}
        data={[]}
      />
      {/* {pageChunks.length > 1 && (
        <div className="flex items-center">
          <Pagination className="mx-auto" classNames={PaginationClassNames} total={pageChunks.length} page={page} onChange={onSwitchPage} />
        </div>
      )} */}
    </TitCard>
  </div>



}

export default AFunds