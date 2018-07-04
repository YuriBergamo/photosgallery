import React from 'react'
import PropTypes from 'prop-types'


import Site from './layout/Site'
import Header from './layout/Header'
import Content from './layout/Content'
import Footer from './layout/Footer'
import ContentRouter from './layout/Router'

const Layout = ({ children }) => (
    <Site style={{backgroundColor:"#e8e9e7"}}>
        <Header />
        <Content>
            <ContentRouter/>
        </Content>
        <Footer />
    </Site>
);

Layout.propTypes = {
    children: PropTypes.func,
}

export default Layout
