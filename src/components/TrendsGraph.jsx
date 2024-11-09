import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const TrendsGraph = () => {
  const data = [
    { name: '12 AM', temp: 65 },
    { name: '3 AM', temp: 63 },
    { name: '6 AM', temp: 61 },
    { name: '9 AM', temp: 68 },
    { name: '12 PM', temp: 73 },
    { name: '3 PM', temp: 75 },
    { name: '6 PM', temp: 72 },
    { name: '9 PM', temp: 68 },
  ];

  return (
    <div className="bg-blue-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Temperature Trends</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={5}
              domain={[0, 80]}
            />
            <Line 
              type="monotone" 
              dataKey="temp" 
              stroke="#3B82F6" 
              strokeWidth={2}
              dot={{ fill: '#3B82F6', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendsGraph;