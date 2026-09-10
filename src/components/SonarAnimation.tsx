export default function SonarAnimation() {
  const dots = [
    { angle: 35, radius: 38, color: "#FF4D4D" },
    { angle: 120, radius: 55, color: "#FF4D4D" },
    { angle: 200, radius: 42, color: "#34D399" },
    { angle: 280, radius: 65, color: "#FF4D4D" },
    { angle: 310, radius: 30, color: "#FBBF24" },
    { angle: 75, radius: 70, color: "#34D399" },
    { angle: 165, radius: 25, color: "#FF4D4D" },
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full" style={{
        background: "radial-gradient(circle, rgba(34,211,238,0.04) 0%, transparent 70%)"
      }} />

      {/* Concentric rings */}
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: `${i * 20}%`,
            height: `${i * 20}%`,
            borderColor: `rgba(34, 211, 238, ${0.25 - i * 0.04})`,
          }}
        />
      ))}

      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <div
          key={`pulse-${i}`}
          className="absolute rounded-full border border-cyan-400"
          style={{
            width: "30%",
            height: "30%",
            opacity: 0,
            animation: `sonar-pulse 3s ease-out ${i * 1}s infinite`,
            borderColor: "rgba(34, 211, 238, 0.5)",
          }}
        />
      ))}

      {/* Radar sweep */}
      <div
        className="absolute"
        style={{
          width: "100%",
          height: "100%",
          animation: "sonar-sweep 5s linear infinite",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "50%",
            height: "2px",
            transformOrigin: "0 50%",
            background: "linear-gradient(90deg, rgba(34,211,238,0.7) 0%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: "50%",
            height: "50%",
            transformOrigin: "0% 0%",
            background: "conic-gradient(from 0deg, rgba(34,211,238,0.08), transparent 30deg)",
            borderRadius: "0 100% 0 0",
          }}
        />
      </div>

      {/* Center dot */}
      <div className="absolute w-3 h-3 rounded-full bg-cyan-400 animate-pulse-glow" />

      {/* Detected object dots */}
      {dots.map((dot, i) => {
        const rad = (dot.angle * Math.PI) / 180;
        const x = 50 + Math.cos(rad) * dot.radius * 0.5;
        const y = 50 + Math.sin(rad) * dot.radius * 0.5;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: dot.color,
              boxShadow: `0 0 6px 2px ${dot.color}66`,
              animation: `sonar-pulse ${2 + i * 0.3}s ease-out ${i * 0.4}s infinite`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
}
