import "./Heatmap.css";

function Heatmap({ data }) {
  const year = new Date().getFullYear();

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  function getDaysInMonth(month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getColor(count) {
    if (!count) return "level-0";
    if (count === 1) return "level-1";
    if (count === 2) return "level-2";
    if (count >= 3) return "level-3";
  }

  return (
    <div>

      <div className="heatmap">
        {months.map((month, mIndex) => (
          <div key={month} className="month-column">
            <div className="month-label">{month}</div>

            <div className="days">
              {Array.from({ length: getDaysInMonth(mIndex) }).map((_, d) => {
                const day = d + 1;
                const dateKey = `${year}-${String(mIndex + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
                const count = data[dateKey] || 0;

                return (
                  <div
                    key={dateKey}
                    className={`day ${getColor(count)}`}
                    title={`${dateKey} → ${count} habits`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Heatmap;