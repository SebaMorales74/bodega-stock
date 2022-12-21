import { Table, Badge, Button, Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

const data = [
    {
        codigoProducto: 'CE005BE1',
        producto: 'Cafetera Express 1 Grupo Italiana',
        familiaProducto: 'Cafetería',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'CE011BE2',
        producto: 'Cafetera Express 2 Grupo Italiana',
        familiaProducto: 'Cafetería',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'CV218TO1',
        producto: 'Conservadora Horizontal 218 LTS.',
        familiaProducto: 'Refrigeración',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'FH065SCE',
        producto: 'Máquina de Hielo 60 KG/DIA BIN 22KG',
        familiaProducto: 'Refrigeración',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'DE0500000',
        producto: 'Desgrasador de 50 LTS.',
        familiaProducto: 'Lavado',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'DE1000000',
        producto: 'Desgrasador de 100 LTS.',
        familiaProducto: 'Lavado',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
    {
        codigoProducto: 'DE2000000',
        producto: 'Desgrasador de 200 LTS.',
        familiaProducto: 'Lavado',
        areaNegocio: 'Gastronomica',
        cantidad: '289',
        precio: '100.000',
    },
]

const columns = [
    {
        title: 'Codigo de Producto',
        dataIndex: 'codigoProducto',
        key: 'codigoProducto',
        sorter: (a, b) => a.codigoProducto - b.codigoProducto,
        render: (text) => <span>{text}</span>,
    },
    {
        title: 'Familia de Producto',
        dataIndex: 'familiaProducto',
        key: 'familiaProducto',
    },
    {
        title: 'Area de Negocio',
        dataIndex: 'areaNegocio',
        key: 'areaNegocio',
    },
    {
        title: 'Cantidad',
        key: 'cantidad',
        render: (_, { cantidad }) => {
            const color = (cantidad > 0) ? 'green' : 'red';
            return (
                <Badge color={color} text={cantidad} />
            );
        },
    },
    {
        title: 'Detalle',
        key: 'details',
        render: (_, { detalles }) => {
            return (
                <Button block>Ver Detalles</Button>
            );
        },
    }
];

const Productos = () => {
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', position: 'relative', marginBottom: '1%' }}>
                <Input style={{ width: '15%', marginRight: '1%' }} placeholder="Ingresar código de producto" />
                <Select
                    style={{ marginRight: '1%' }}
                    showSearch
                    placeholder="Familia de productos"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: 'coccion',
                            label: 'Cocción',
                        },
                        {
                            value: 'hornos',
                            label: 'Hornos',
                        },
                        {
                            value: 'refrigeracion',
                            label: 'Refrigeración',
                        },
                        {
                            value: 'autoservicio',
                            label: 'Autoservicio',
                        },
                        {
                            value: 'preparacion',
                            label: 'Preparación',
                        }
                    ]}
                />
                <Select
                    style={{ marginRight: '1%' }}
                    showSearch
                    placeholder="Area de negocio"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: 'clinica',
                            label: 'Clinica',
                        },
                        {
                            value: 'gastronomica',
                            label: 'Gastronomica',
                        }
                    ]}
                />
                <Button>Buscar <SearchOutlined /></Button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
                showSorterTooltip={false}
            />
        </>
    );
};
export default Productos;