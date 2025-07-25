import { Spinner } from "@nextui-org/react"
import { TitCard } from "../cards"
import { STable } from "../tables"
import backendApi from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import _ from "lodash"

const ALeaderboard = () => {

  const { data, isFetching, refetch, isLoading } = useQuery({
    queryKey: ["Top100"],
    enabled: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    refetchOnMount: false,
    refetchInterval: 60000,
    queryFn: () => backendApi.getTop100User()

  });


  const datas = useMemo(() => {
    const nodes = data || [];

    return nodes.map((item, i) => {
      let earn = 0;
      if (i === 0) {
        earn = 10000;
      } else if (i >= 1 && i <= 3) {
        earn = 3000;
      } else if (i >= 4 && i <= 53) {
        earn = 200;
      }

      return [
        item.twitterAccountInfo?.name ?
          <a key={item.name} className="underline underline-offset-1" href={`https://x.com/${item.twitterAccountInfo?.name}`}>
            {item?.twitterAccountInfo?.name}
          </a>
          : <span>{item.email}</span>
        ,
        `${parseFloat(item.referralPoint)} Jades`,
        `${(item.inviteV1Length || 0) + (item.inviteV2Length)} (${item.inviteV1Length} Tier 1 + ${item.inviteV2Length} Tier 2)`,
        `$${earn}`,
      ];
    });
  }, [data]);
  const pageChunks = useMemo(() => _.chunk(datas, 100), [datas]);

  return <>
    <TitCard
      tit="Leaderboard"
      className="flip_item w-full mt-[1.875rem] bg-[#6D6D6D66]"
    >
      <STable
        isLoading={isLoading}
        loadingContent={<Spinner />}
        empty="No Data"
        head={[
          "Username",
          "Referral Bonus Earned",
          'Referral Count',
          "Rewards to Earn",

        ]}
        data={pageChunks[1 - 1] || []}
      />
    </TitCard>
  </>

}

export default ALeaderboard