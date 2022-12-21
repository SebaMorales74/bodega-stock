import { List, Calendar, Card, Space } from 'antd';
import React, { useEffect, useState } from 'react';
const { Meta } = Card;

import './_historico.scss';

const App = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = dd + '-' + mm + '-' + yyyy;

    const [fecha, setFecha] = useState([formattedToday]);

    const onPanelChange = (value) => {
        setFecha(value.format('DD-MM-YYYY'));
    };

    const Logs = () => {
        const data = [
            {
                hora: '10:00',
                log: 'Se ha conectado el usuario',
                tipo: 'Conexión',
            },
            {
                hora: '10:10',
                log: 'Se ha desconectado el usuario',
                tipo: 'Desconexión',
            },
            {
                hora: '10:20',
                log: 'Se ha conectado el usuario',
                tipo: 'Conexión',
            },
            {
                hora: '10:30',
                log: 'Se ha desconectado el usuario',
                tipo: 'Desconexión',
            },
            {
                hora: '10:40',
                log: 'Se ha conectado el usuario',
                tipo: 'Conexión',
            },
            {
                hora: '10:50',
                log: 'Se ha desconectado el usuario',
                tipo: 'Desconexión',
            },
            {
                hora: '11:00',
                log: 'Se ha conectado el usuario',
                tipo: 'Conexión',
            },
            {
                hora: '11:10',
                log: 'Se ha desconectado el usuario',
                tipo: 'Desconexión',
            },
            {
                hora: '11:20',
                log: 'Se ha conectado el usuario',
                tipo: 'Conexión',
            },
            {
                hora: '11:30',
                log: 'Se ha desconectado el usuario',
                tipo: 'Desconexión',
            },
        ];


        return (
            <List
                size="large"
                header={<div>Actividad del día {fecha}</div>}
                dataSource={data}
                renderItem={(item) => <List.Item>{"Fecha: " + fecha + " Hora: " + item.hora + " - " + item.log + " - " + item.tipo}</List.Item>}
                style={{
                    width: '100%',
                }}
            />
        );
    };
    return (
        <div className="space-align-container">
            <div className="space-align-block">
                <Space align="center">
                    <Card
                        style={{
                            width: '100%',
                            margin: '10px 0px',
                        }}
                    >
                        <Meta
                            title={<></>}
                            description={
                                <div className="site-calendar-demo-card">
                                    <Calendar fullscreen={false} onChange={onPanelChange} />
                                </div>
                            }
                        />
                    </Card>

                </Space>
            </div>
            <div className="space-align-block" style={{ width: '660px' }}>
                <Card
                    style={{
                        width: '100%',
                        margin: '10px 0px',
                        height: '100%',
                    }}
                >
                    <Meta
                        title={<></>}
                        description={
                            <Logs />
                        }
                    />
                </Card>
            </div>
        </div>
    );
};
export default App;
