// Calendar.tsx
import styled from "@emotion/styled";

interface CalendarProps {
  id: string;
  date: string; // YYYYMMDD
  color: string | undefined;
  fontColor?: string;
}

const Calendar = ({ date, color, fontColor }: CalendarProps) => {
  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1; // 0-index
  const day = Number(date.slice(6, 8));

  const targetDate = new Date(year, month, day);
  const firstDay = new Date(year, month, 1).getDay(); // 0(Sun) ~ 6(Sat)
  const lastDate = new Date(year, month + 1, 0).getDate();

  const cells: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(d);

  const monthLabel = `${year}.${String(month + 1).padStart(2, "0")}.${String(day).padStart(2, "0")} ${weekday(targetDate)}`;

  return (
    <Wrap color={color}>
      <DateTitle style={{ color: fontColor }}>{monthLabel}</DateTitle>

      <Grid>
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((w) => (
          <Week key={w} style={{ color: fontColor, opacity: 0.8 }}>{w}</Week>
        ))}

        {cells.map((d, idx) => (
          <Cell key={idx}>
            {d && (
              <Day active={d === day} fontColor={fontColor}>
                {d}
              </Day>
            )}
          </Cell>
        ))}
      </Grid>
    </Wrap>
  );
};

export default Calendar;

function weekday(date: Date) {
  return ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][date.getDay()];
}

const Wrap = styled.div<{color:string|undefined}>`
  padding: 40px 32px 44px;
  width: 100%;
  background: ${(props) => props.color};  
  text-align: center;
`;


const DateTitle = styled.div`
  font-family: 'SSFaithfulness';
  font-size: 22px;
  font-weight: 500;
  letter-spacing: 0.18em;     /* ✔ 매우 중요 */
  margin-bottom: 28px;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 22px;              /* ✔ 행 간격 큼 */
`;
const Week = styled.div`
  font-family: 'SSFaithfulness';
  font-size: 12px;
  letter-spacing: 0.15em;
`;
const Cell = styled.div`
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Day = styled.div<{ active: boolean; fontColor?: string }>`
  font-family: 'SSFaithfulness';
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 400;


  display: flex;              /* 추가 */
  align-items: center;        /* 추가 */
  justify-content: center;    /* 추가 */

  ${({ active, fontColor }) =>
    active
      ? `
        background: ${fontColor || "#111"};
        color: ${fontColor === "#fff" || fontColor === "white" ? "#000" : "#fff"};
      `
      : `
        color: ${fontColor || "#111"};
      `}
`;
