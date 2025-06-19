import { Text, useMantineTheme } from '@mantine/core';
import { PieChart, Pie, Cell, Legend, PieLabelRenderProps } from 'recharts';
import { Title } from '@mantine/core';
import { useQuizStats } from '../hooks/useQuiz';

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value,
}: PieLabelRenderProps) => {
  const cxNum = Number(cx) || 0;
  const cyNum = Number(cy) || 0;
  const midAngleNum = Number(midAngle) || 0;
  const innerRadiusNum = Number(innerRadius) || 0;
  const outerRadiusNum = Number(outerRadius) || 0;

  const RADIAN = Math.PI / 180;
  const radius = innerRadiusNum + (outerRadiusNum - innerRadiusNum) / 2;
  const x = cxNum + radius * Math.cos(-midAngleNum * RADIAN);
  const y = cyNum + radius * Math.sin(-midAngleNum * RADIAN);

  return (
    <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central' fontSize={16}>
      {value}
    </text>
  );
};

export const StatsPage = () => {
  const theme = useMantineTheme();
  const { data: stats, isLoading, isError } = useQuizStats();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !stats) return <Text>Failed to load stats</Text>;

  const chartData = [
    { name: 'Completed', value: stats.completed, colorKey: 'teal.6' },
    { name: 'Failed', value: stats.failed, colorKey: 'red.6' },
    { name: 'Unattempted', value: stats.unattempted, colorKey: 'gray.6' },
  ];

  const resolvedData = chartData.map((entry) => {
    const [color, shade] = entry.colorKey.split('.');
    return {
      ...entry,
      color: theme.colors[color as keyof typeof theme.colors]?.[parseInt(shade)] ?? entry.colorKey,
    };
  });

  return (
    <div style={{ width: 400, height: 400 }}>
      <Title order={2}>Your Quiz Stats</Title>
      <PieChart width={400} height={400}>
        <Pie
          data={resolvedData}
          dataKey='value'
          cx='50%'
          cy='50%'
          outerRadius={120}
          innerRadius={70}
          label={renderLabel}
          labelLine={false}
        >
          {resolvedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' height={36} />
      </PieChart>
    </div>
  );
};

