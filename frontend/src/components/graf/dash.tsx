import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { Initiative } from '../../store/Initiatives/showInitiativesSlice';
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface MyBarChartProps {
    initiatives: Initiative[];
}

const DashBar: FC<MyBarChartProps> = ({ initiatives }) => {
    const navigate = useNavigate();

    return (
        <BarChart
            width={730}
            height={270}
            data={initiatives}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tokens" />
            <YAxis />
            <Tooltip />
            <Legend 
            layout="vertical" 
            align="left" 
            verticalAlign="middle" 
            />
            <Bar 
              dataKey="buy_price" 
              fill="#3A23ff" 
              name="Precio de compra" 
              onClick={(data, index) => navigate(`/initiative/${initiatives[index].id}`)} 
            />
            <Bar 
              dataKey="sell_price" 
              fill="#00B2ff" 
              name="Precio de venta" 
              onClick={(data, index) => navigate(`/initiative/${initiatives[index].id}`)} 
            />
        </BarChart>
    );
};

export default DashBar;
