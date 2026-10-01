import { ImageResponse } from "next/og";

export const alt = "ShopLayer — AI Commerce Data Operations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        padding: 76,
        alignItems: "center",
        justifyContent: "space-between",
        color: "#f8fbff",
        background: "linear-gradient(120deg, #091b46 0%, #10245e 68%, #1e40af 100%)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 660 }}>
        <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: 3, color: "#a7c8ff" }}>
          AI COMMERCE OPERATIONS
        </div>
        <div style={{ display: "flex", marginTop: 28, fontSize: 94, fontWeight: 800, letterSpacing: -4 }}>
          ShopLayer
        </div>
        <div style={{ display: "flex", marginTop: 20, fontSize: 31, lineHeight: 1.3, color: "#dae7ff" }}>
          Better product data for the next shopping experience.
        </div>
      </div>
      <div style={{ display: "flex", width: 320, height: 310, alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", position: "absolute", width: 270, height: 158, borderRadius: 26, transform: "rotate(-16deg) translateY(56px)", background: "#081738", boxShadow: "0 25px 30px #06122e" }} />
        <div style={{ display: "flex", position: "absolute", width: 250, height: 150, borderRadius: 26, transform: "rotate(-16deg) translateY(6px)", background: "#477be3" }} />
        <div style={{ display: "flex", position: "absolute", width: 230, height: 142, borderRadius: 26, transform: "rotate(-16deg) translateY(-44px)", background: "#eaf2ff" }} />
        <div style={{ display: "flex", position: "absolute", width: 210, height: 134, borderRadius: 26, transform: "rotate(-16deg) translateY(-94px)", background: "#d97706" }} />
      </div>
    </div>,
    size,
  );
}
