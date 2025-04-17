import React, { useEffect, useState, useRef } from "react";
import Plot from "react-plotly.js";
import "./HourlyHeatmap.css";
import { BsClockHistory, BsX } from "react-icons/bs";
import ReactTooltip from "react-tooltip";

const HourlyHeatmap = ({ data }) => {
  const [viewMode, setViewMode] = useState("grid"); // grid or chart
  const [chartType, setChartType] = useState("heatmap");
  const [zoomed, setZoomed] = useState(false);

  const chartContainerRef = useRef(null); // Refs untuk kontainer grafik
  const [chartHeight, setChartHeight] = useState(250); // Tinggi default grafik

  const dates = Object.keys(data);
  const allHours = Array.from({ length: 24 }, (_, i) => i);

  // Responsif untuk zooming
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setZoomed(screenWidth <= 900);

      // Update tinggi grafik berdasarkan ukuran kontainer
      if (chartContainerRef.current) {
        const containerHeight = chartContainerRef.current.offsetHeight;
        setChartHeight(containerHeight * 0.4); // Ambil 40% dari tinggi kontainer
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getContributionLevel = (totalActivity) => {
    if (totalActivity === 0) return 0;
    if (totalActivity <= 5) return 1;
    if (totalActivity <= 10) return 2;
    return 3;
  };

  const getColor = (count) => {
    if (count === 0) return "rgba(0, 0, 0, 0.5)"; // Gelap transparan untuk tidak ada aktivitas
    if (count < 3) return "#0eff00"; // Hijau gelap untuk aktivitas rendah
    if (count < 6) return "#4caf50"; // Hijau lebih gelap untuk aktivitas sedang
    if (count < 10) return "#388e3c"; // Hijau yang lebih gelap untuk aktivitas tinggi
    return "#1b5e20"; // Hijau sangat gelap untuk aktivitas sangat tinggi
  };

  const getBorderColor = (count) => {
    if (count === 0) return "rgba(0, 0, 0, 0.2)"; // Gelap transparan untuk tidak ada aktivitas
    if (count < 3) return "#0eff00"; // Hijau gelap untuk aktivitas rendah
    if (count < 6) return "#4caf50"; // Hijau lebih gelap untuk aktivitas sedang
    if (count < 10) return "#388e3c"; // Hijau yang lebih gelap untuk aktivitas tinggi
    return "#1b5e20"; // Hijau sangat gelap untuk aktivitas sangat tinggi
  };

  const zData = dates.map((date) => {
    const dayData = data[date] || {};
    const hourlyData = allHours.map((hour) => dayData[hour] || 0);
    const totalActivity = hourlyData.reduce((acc, val) => acc + val, 0);
    const level = getContributionLevel(totalActivity);
    return allHours.map(() => level);
  });

  const chartConfig = {
    heatmap: {
      data: [
        {
          z: zData,
          x: allHours.map((h) => `${String(h).padStart(2, "0")}:00`),
          y: dates,
          type: "heatmap",
          colorscale: [
            [0, "#ebedf0"], // Warna awal (terang ke abu-abu)
            [0.2, "#c6e48b"], // Warna hijau cerah (lebih terang dari sebelumnya)
            [0.4, "#8dbd53"], // Warna hijau yang lebih mencolok
            [0.6, "#4caf50"], // Warna hijau yang lebih jelas dan mencolok
            [1, "#388e3c"], // Warna hijau yang lebih kuat dan cerah
          ],

          hoverongaps: false,
          colorbar: {
            title: "Activity Level",
            tickvals: [0, 1, 2, 3],
            ticktext: ["No Activity", "Low", "Medium", "High"],
          },
        },
      ],
      layout: {
        title: {
          text: "GitHub Activity Heatmap",
          font: { color: "#fff" }, // Warna judul
        },
        xaxis: {
          title: "Hour",
          tickangle: -45,
          tickvals: allHours,
          color: "#fff", // Warna label dan garis
          gridcolor: "rgba(255,255,255,0.1)", // Grid halus
        },
        yaxis: {
          title: "Date",
          color: "#fff",
          gridcolor: "rgba(255,255,255,0.1)",
        },
        dragmode: "zoom",
        showlegend: false,
        height: chartHeight,
        width: "100%",
        paper_bgcolor: "rgba(0, 0, 0, 0)", // Background luar
        plot_bgcolor: "rgba(0, 0, 0, 0)", // Background grafik
        font: {
          color: "#fff", // Warna teks default
        },
      },
    },
    bar: {
      data: [
        {
          x: dates,
          y: zData.map((day) => day[0]),
          type: "bar",
          marker: {
            color: zData.map(
              (day) => ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b"][day[0]]
            ),
          },
        },
      ],
      layout: {
        title: {
          text: "GitHub Activity by Day",
          font: { color: "#fff" },
        },
        xaxis: {
          title: {
            text: "Date",
            font: { color: "#fff" },
          },
          color: "#fff",
          gridcolor: "rgba(255,255,255,0.1)",
        },
        yaxis: {
          title: {
            text: "Activity Level",
            font: { color: "#fff" },
          },
          color: "#fff",
          gridcolor: "rgba(255,255,255,0.1)",
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "#fff" },
        height: chartHeight,
        width: "100%",
      },
    },
    line: {
      data: [
        {
          x: dates,
          y: zData.map((day) => day[0]),
          type: "scatter",
          mode: "lines",
          marker: {
            color: zData.map(
              (day) => ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b"][day[0]]
            ),
          },
        },
      ],
      layout: {
        title: {
          text: "GitHub Activity by Day",
          font: { color: "#fff" },
        },
        xaxis: {
          title: {
            text: "Date",
            font: { color: "#fff" },
          },
          color: "#fff",
          gridcolor: "rgba(255,255,255,0.1)",
        },
        yaxis: {
          title: {
            text: "Activity Level",
            font: { color: "#fff" },
          },
          color: "#fff",
          gridcolor: "rgba(255,255,255,0.1)",
        },
        paper_bgcolor: "rgba(0,0,0,0)",
        plot_bgcolor: "rgba(0,0,0,0)",
        font: { color: "#fff" },
        height: chartHeight,
        width: "100%",
      },
    },
  };

  const handleRelayout = (eventData) => {
    const xaxisRange = eventData?.xaxis?.range;
    if (xaxisRange) {
      const [min, max] = xaxisRange;
      const rangeDiff = max - min;
      setZoomed(rangeDiff < 6);
      chartConfig.heatmap.layout.xaxis.tickvals =
        rangeDiff < 6
          ? Array.from({ length: 24 }, (_, i) => i)
          : Array.from({ length: 8 }, (_, i) => i * 3);
    }
  };

  return (
    <div className="heatmap-wrapper" ref={chartContainerRef}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label m-0">Tampilan:</label>
          <select
            className="form-select form-select-sm"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="grid">Grid</option>
            <option value="heatmap">Heatmap</option>
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </select>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="heatmap-grid-wrapper">
          <div className="heatmap-grid">
            {/* Baris header kosong + jam */}
            <div className="cell label-cell empty" />
            {allHours.map((hour) => (
              <div key={`h-${hour}`} className="cell hour-label-cell">
                {String(hour).padStart(2, "0")}
              </div>
            ))}

            {/* Baris tanggal + kotak aktivitas */}
            {dates.map((date, rowIdx) => {
              const hourData = data[date] || {};
              const shortDate = new Date(date).toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit",
              });

              return (
                <React.Fragment key={rowIdx}>
                  <div className="cell date-label-cell">{shortDate}</div>
                  {allHours.map((hour) => {
                    const count = hourData[hour] || 0;
                    return (
                      <div
                        key={`${date}-${hour}`}
                        className="cell activity-cell"
                        style={{
                          backgroundColor: getColor(count),
                          border: `4px solid ${getBorderColor(count)}`,
                        }}
                        title={`${date} - ${hour}:00 → ${count} contrib`}
                      />
                    );
                  })}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      ) : (
        <Plot
          data={chartConfig[viewMode].data}
          layout={{
            ...chartConfig[viewMode].layout,
            height: zoomed ? 200 : 300, // Mengurangi tinggi untuk tampilan zoomed
            width: "100%", // Lebar otomatis mengikuti kontainer
            autosize: true, // Mengizinkan Plotly menyesuaikan ukuran
          }}
          config={{
            scrollZoom: true,
            responsive: true, // Menyesuaikan ukuran grafik responsif terhadap ukuran layar
          }}
          onRelayout={handleRelayout}
        />
      )}
    </div>
  );
};

export default HourlyHeatmap;
