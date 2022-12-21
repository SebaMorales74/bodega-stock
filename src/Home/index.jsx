import React from 'react';
import { Layout, Image, Col, Row, Card } from 'antd';
const { Content, Header, Footer } = Layout;
import './_home.scss';
import comprasSVG from '../assets/compras.svg';
import ventasSVG from '../assets/ventas.svg';
import inventarioSVG from '../assets/inventario.svg';
import historicoSVG from '../assets/historico.svg';

import Compras from '../components/Compras';
import Ventas from '../components/Ventas';
import Inventario from '../components/Inventario';
import Historico from '../components/Historico';

const Home = () => {
    const Items = [
        {
            title: 'Compras',
            icon: comprasSVG,
            url: '/compras'
        },
        {
            title: 'Ventas',
            icon: ventasSVG,
            url: '/ventas'
        },
        {
            title: 'Inventario',
            icon: inventarioSVG,
            url: '/inventario'
        },
        {
            title: 'Historico',
            icon: historicoSVG,
            url: '/historico'
        }
    ]

    return (
        <Row gutter={[16, 16]} className='menu'>
            {
                Items.map((item, index) => {
                    return (
                        <Col span={12} key={index}>
                            <Card bordered={false} className='menuItem' onClick={() => window.location.assign(item.url)} >
                                <Image src={item.icon
                                } preview={false} className='icono' />
                                <h2 className='descripcion'>{item.title}</h2>
                            </Card>
                        </Col>
                    )
                })
            }
        </Row>
    );
}

const DOM = () => {
    switch (window.location.pathname) {
        case '/compras':
            return <Compras />
        case '/ventas':
            return <Ventas />
        case '/inventario':
            return <Inventario />
        case '/historico':
            return <Historico />
        default:
            return <Home />
    }
}

export default function App() {
    return (
        <Layout
            style={{ minHeight: '100vh', maxHeight: '100%' }}
        >
            <Header style={{ padding: '0' }} className='loginHeader'>
            </Header>
            <Layout className="site-layout">
                <Content
                    className="site-layout-background loginbackground"
                    style={{
                        padding: 24
                    }}>
                        {DOM()}
                </Content>
            </Layout>
            <Footer className='footer'><span style={{ float: 'left' }}>© 2022 Te Llega Altiro SpA.</span></Footer>
        </Layout>
    )
}