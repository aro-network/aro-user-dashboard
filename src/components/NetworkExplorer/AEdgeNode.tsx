import React, { useEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodataWorldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themesAnimated from "@amcharts/amcharts5/themes/Animated";

const WorldMapDots = () => {
  const [currentProcess, setProcess] = useState(10);

  useEffect(() => {
    am5.addLicense("AM5M-7163-0147-1745-7749");

    let root = am5.Root.new("chartdiv",);

    root.setThemes([am5themesAnimated.new(root)]);

    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "none",
        panY: "none",
        wheelX: "none",
        wheelY: "none",
        projection: am5map.geoNaturalEarth1(),
      })
    );

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodataWorldLow,
        exclude: ["AQ"]
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),

    });

    polygonSeries.mapPolygons.template.setAll({
      fill: am5.color('#969696'),
      stroke: am5.color('#969696'),
      strokeWidth: 0.5,

    });

    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));


    am5geodataWorldLow.features.forEach((feature) => {
      if (feature.geometry && feature.geometry.type === "Polygon") {
        let coords = feature.geometry.coordinates[0];
        let points = generateGridPoints(coords, 0.5);


        points.forEach(([lon, lat]) => {
          let point = pointSeries.pushDataItem({
            longitude: lon,
            latitude: lat
          });

        });
      }
    });

    function generateGridPoints(boundaryCoords: any[], step: number) {
      let points = [];
      let minLon = Math.min(...boundaryCoords.map(c => c[0]));
      let maxLon = Math.max(...boundaryCoords.map(c => c[0]));
      let minLat = Math.min(...boundaryCoords.map(c => c[1]));
      let maxLat = Math.max(...boundaryCoords.map(c => c[1]));

      for (let lon = minLon; lon <= maxLon; lon += step) {
        for (let lat = minLat; lat <= maxLat; lat += step) {
          points.push([lon, lat]);
        }
      }
      return points;
    }

    return () => {
      root.dispose();
    };
  }, []);

  return <div>
    <div id="chartdiv" style={{ width: "100%", }} />


    <div className=" fixed bottom-[50px] w-full left-0 px-[6.5rem]">
      <div className=" bg-[#404040] px-[50px] w-full py-[1.7813rem] justify-between relative bottom-0 rounded-[1.25rem] flex">
        <div>
          <div className="text-[#FFFFFF99] text-xs">Edge Nodes</div>
          <div className=" font-semibold text-3xl mt-[.625rem]" >125,389</div>
        </div>
        <div>
          <div className="text-[#FFFFFF99] text-xs">Online</div>
          <div className=" font-semibold text-3xl  mt-[.625rem]" >125,389</div>
        </div>
        <div className="">
          <div className="text-[#FFFFFF99] text-xs flex justify-start">Recent</div>
          <div className="w-[12.5rem]   h-[.625rem] mt-[.625rem] relative top-[.625rem] rounded-full overflow-hidden">
            <div className="loader" />
            <div className="left-0 top-0 h-full rounded-full absolute bg-primary" style={{ transition: "all ease 1s", width: `${currentProcess}%` }}></div>
          </div>
        </div>
        <div>
          <div className="text-[#FFFFFF99] text-xs">Total Bandwidth</div>
          <div className=" font-semibold text-3xl  mt-[.625rem]" >125,389Gbps</div>
        </div>
      </div>
    </div>
  </div>
};

export default WorldMapDots;
