import Link from "next/link";
import classNames from "classnames";
import { observer } from "mobx-react-lite";
import { FunctionComponent } from "react";
import { PoolAssetsIcon, PoolAssetsName } from "../assets";
import { PoolAssetInfo } from "../assets/types";
import { Metric } from "../types";
import { CustomClasses } from "../types";
import { useWindowSize } from "../../hooks";
import { useTranslation } from "react-multi-lang";

export const PoolCard: FunctionComponent<
  {
    poolId: string;
    poolAssets: PoolAssetInfo[];
    poolMetrics: Metric[];
    isSuperfluid?: boolean;
    mobileShowFirstLabel?: boolean;
    onClick?: () => void;
  } & CustomClasses
> = observer(
  ({
    poolId,
    poolAssets,
    poolMetrics,
    isSuperfluid,
    mobileShowFirstLabel = false,
    onClick,
    className,
  }) => {
    const { isMobile } = useWindowSize();
    const t = useTranslation();

    // <Link /> notes: turn off prefetch to avoid loading tons of pools and lagging the client, many pools will be in viewport. They will still be fetched on hover.
    // See : https://nextjs.org/docs/api-reference/next/link

    if (isMobile) {
      return (
        <Link href={`/pool/${poolId}`} passHref prefetch={false}>
          <a
            className={classNames(
              "w-full min-w-[360px] h-32 p-px rounded-lg shadow-elevation-08dp",
              {
                "bg-card": !isSuperfluid,
                "bg-superfluid": isSuperfluid,
              },
              className
            )}
          >
            <div className="flex items-center place-content-between w-full h-full p-8 bg-card rounded-lginset">
              <div className="flex flex-col place-items-start gap-3">
                <PoolAssetsIcon assets={poolAssets} size="sm" />

                <div className="flex flex-col gap-0.5">
                  <PoolAssetsName
                    className="whitespace-nowrap text-ellipsis overflow-hidden"
                    size="sm"
                    assetDenoms={poolAssets.map((asset) => asset.coinDenom)}
                  />
                  <span className="caption text-white-disabled">
                    {t("pools.poolId", { id: poolId })}
                  </span>
                </div>
              </div>
              <div className="flex flex-col h-full place-content-between text-right">
                {poolMetrics.map((metric, index) => (
                  <span
                    key={index}
                    className={classNames(
                      "flex items-center place-content-end",
                      index === 0 ? "subtitle2" : "caption text-white-disabled"
                    )}
                  >
                    {metric.value}{" "}
                    {(mobileShowFirstLabel || index !== 0) && metric.label}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </Link>
      );
    }

    return (
      <Link href={`/pool/${poolId}`} passHref prefetch={false}>
        <a
          className={classNames(
            "p-[2px] rounded-[28px] hover:bg-wosmongton-200 text-left",
            {
              "bg-card": !isSuperfluid,
              "bg-superfluid hover:bg-none": isSuperfluid,
            }
          )}
          onClick={() => {
            onClick?.();
          }}
        >
          <div className="flex flex-col gap-14 place-content-between w-full h-full px-[1.875rem] pt-7 pb-6 bg-card rounded-[27px] hover:bg-osmoverse-700 cursor-pointer">
            <div className="flex items-center place-content-between">
              <PoolAssetsIcon assets={poolAssets} />
              <div className="ml-5 flex flex-col">
                <PoolAssetsName
                  size="md"
                  assetDenoms={poolAssets.map((asset) => asset.coinDenom)}
                />
                <div className="subtitle1 text-white-mid">
                  {t("pools.poolId", { id: poolId })}
                </div>
              </div>
            </div>
            <div className="flex place-content-between">
              {poolMetrics.map((poolMetric, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <span className="subtitle1 whitespace-nowrap text-white-disabled">
                    {poolMetric.label}
                  </span>
                  {typeof poolMetric.value === "string" ? (
                    <h6 className="mt-0.5 text-white-high">
                      {poolMetric.value}
                    </h6>
                  ) : (
                    <>{poolMetric.value}</>
                  )}
                </div>
              ))}
            </div>
          </div>
        </a>
      </Link>
    );
  }
);
